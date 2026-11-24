// Builds public/docs/playground/spec.json: a compact, provider-name-free catalogue of
// every public operation, for the live API playground.
// Source: ../walletos-docs/openapi/{openapi,platform}.json (read only). Run: node scripts/build-playground-spec.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
/**
 * The playground reads the SAME tier specs the reference renders from, so the
 * two cannot drift. Before this it read the raw upstream specs, which meant
 * an operation could be in one and not the other, and nobody would notice
 * until someone tried to call it.
 */
const srcDir = path.resolve(here, "../../walletos-docs/openapi/tiers");
const out = path.resolve(here, "../public/docs/playground/spec.json");

// Classification: scripts/endpoint-classification.json (CUSTOMER / APP / INTERNAL / DEAD; see reports/endpoint-classification.md).
// The playground and the public reference only carry CUSTOMER operations. Every spec operation MUST be classified.
const classes = JSON.parse(fs.readFileSync(path.resolve(here, "endpoint-classification.json"), "utf8"));
/** starlight-openapi's page slug: method + path, non-alphanumerics folded. */
const slugOf = (method, p) =>
  `${method}_${p}`.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

const normKey = (m, p) => m + " " + p.replace(/:[A-Za-z]+/g, "{}").replace(/[{][^}]+[}]/g, "{}");
// The spec describes the shadowed per-user "sphere account" handlers under /v1/accounts, which are unreachable.
// The reachable /v1/accounts routes (Rift Accounts, platform tier) are not in the OpenAPI source yet, so drop them here.
/**
 * Was: drop every /v1/accounts path, because the raw spec described the
 * unreachable per-user "sphere account" handlers.
 *
 * The tier specs now carry the REAL Rift Accounts surface — virtual collect
 * and disburse — and exclude the shadowed one, so dropping this prefix would
 * hide the most useful half of the own-wallet tier.
 */
const SPEC_DROP = () => false;

const BANNED = /(paycrest|pretium|centiiv|sumsub|smile\s?-?id|pimlico|privy|twilio|Resend-|across protocol|\(across\))/i;

// Sentence-level rewrites for the few places the upstream spec names a vendor.
function clean(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/via Across Protocol/gi, "via Rift's bridge")
    .replace(/ \(Across\)/g, "")
    .replace(/builds Across `approve` \+ `depositV3` calls/g, "builds the bridge calls")
    .replace(/ \(Twilio Verify\)/g, "")
    .replace(/ \(Resend, Redis-backed\)/g, "")
    .replace(/Resend-backed, branded/g, "Branded")
    .replace(/sphere accounts?/gi, (m) => (m.endsWith("s") ? "Rift accounts" : "Rift account"))
    .replace(/\(SmileID or Sumsub depending on country\)/gi, "(Rift picks the verification flow by country)")
    .replace(/SmileID:\s*KE\/NG\/UG\/GH\/ZA\/ZM\.\s*Sumsub:\s*everywhere else\./gi, "Rift picks the verification flow by the customer's country.")
    .replace(/SmileID:\s*\{[^}]*\}\s*\|\s*Sumsub:\s*\{[^}]*\}/gi, "Returns either an in-app verification token or a hosted verification link, depending on the country.")
    .replace(/Smile\s?ID|SmileID|Sumsub|Pimlico|Paycrest|Pretium|Centiiv|Privy/gi, "Rift");
}
function deepClean(v) {
  if (Array.isArray(v)) return v.map(deepClean);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [clean(k), deepClean(x)]));
  return clean(v);
}

const load = (f) => deepClean(JSON.parse(fs.readFileSync(path.join(srcDir, f), "utf8")));

function resolve(spec, node, depth = 0) {
  if (!node || depth > 8) return node;
  if (node.$ref) {
    const parts = node.$ref.replace(/^#\//, "").split("/");
    let cur = spec;
    for (const p of parts) cur = cur?.[p];
    return resolve(spec, cur, depth + 1);
  }
  return node;
}

function example(spec, schema, depth = 0) {
  schema = resolve(spec, schema);
  if (!schema || depth > 5) return null;
  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined) return schema.default;
  if (schema.enum) return schema.enum[0];
  if (schema.oneOf || schema.anyOf) return example(spec, (schema.oneOf || schema.anyOf)[0], depth + 1);
  if (schema.allOf) return Object.assign({}, ...schema.allOf.map((s) => example(spec, s, depth + 1) || {}));
  switch (schema.type) {
    case "object": {
      const o = {};
      const req = new Set(schema.required || []);
      for (const [k, v] of Object.entries(schema.properties || {})) {
        if (req.has(k) || Object.keys(schema.properties).length <= 6) o[k] = example(spec, v, depth + 1);
      }
      return o;
    }
    case "array": return [example(spec, schema.items, depth + 1)];
    case "integer": case "number": return schema.minimum ?? 1;
    case "boolean": return false;
    case "string": return schema.format === "date-time" ? "2026-01-01T00:00:00Z" : "string";
    default: return null;
  }
}

function authOf(op, spec) {
  const sec = op.security;
  if (sec && sec.length === 0) return "none";
  const names = new Set((sec || spec.security || []).flatMap((s) => Object.keys(s)));
  if (names.has("platformKeyAuth")) return "platform";
  if (names.has("adminKeyAuth") && names.size === 1) return "admin";
  const b = names.has("bearerAuth"), k = names.has("apiKeyAuth");
  if (b && k) return "customer+key";
  if (b) return "customer";
  if (k) return "key";
  return "none";
}

const ops = [];
const classified = [];
const unclassified = [];
// Audience order: public, your own wallets, Rift wallets — the order someone
// meets them in, and the order the sidebar uses.
for (const [file, group] of [
  ["public.json", "public"],
  ["own-wallet.json", "own-wallet"],
  ["rift-wallet.json", "rift-wallet"],
]) {
  const spec = load(file);
  for (const [p, item] of Object.entries(spec.paths)) {
    for (const m of ["get", "post", "put", "patch", "delete"]) {
      const op = item[m];
      if (!op) continue;
      const params = [...(item.parameters || []), ...(op.parameters || [])]
        .map((x) => resolve(spec, x))
        .filter((x) => x && (x.in === "path" || x.in === "query"))
        .map((x) => ({
          name: x.name, in: x.in, required: !!x.required,
          description: (x.description || "").slice(0, 240),
          example: x.example ?? x.schema?.example ?? x.schema?.default ?? (x.schema?.enum ? x.schema.enum[0] : undefined),
          enum: x.schema?.enum,
        }));
      const rb = resolve(spec, op.requestBody);
      const json = rb?.content?.["application/json"];
      const body = json ? example(spec, json.schema) : undefined;
      const tag = (op.tags && op.tags[0]) || "Other";
      const ck = normKey(m.toUpperCase(), p);
      const cl = classes[ck];
      const entry = { id: op.operationId || `${m}_${p}`, method: m.toUpperCase(), path: p, group, tag: (op.tags && op.tags[0]) || "Other", summary: op.summary || "", cls: cl ? cl.cls : "CUSTOMER", tier: group };
      classified.push(entry);
      if (!cl) unclassified.push(ck);
      /**
       * The tier specs have already dropped Rift Ops and everything excluded
       * by scripts/tiers.config.json, so anything still here is published.
       * An operation with no entry in endpoint-classification.json is
       * therefore NEW, not suspicious — the hand-written own-wallet rails are
       * exactly that — and hiding it would leave the playground unable to
       * call something the docs document.
       */
      /**
       * Hide only what cannot usefully be called, NOT what needs a user
       * token.
       *
       * The old rule kept CUSTOMER and dropped everything else, including
       * all 153 operations classified APP — a class whose own definition is
       * "User JWT only (no project-key path): the signed-in end user's own
       * wallet flow". That is the definition of the Rift-wallet tier, so the
       * rule hid the tier from its own playground: no WalletConnect, no
       * bridge transfer, no send, no balances, no offramp, no KYC. The
       * classification predates the three-tier split and was answering a
       * question nobody asks any more.
       *
       * The tier specs have already removed Rift Ops and the excluded
       * products, so what is left to exclude is only: routes that no longer
       * exist, Rift-internal test endpoints, and routes on their way out.
       */
      const HIDE = new Set(["DEAD", "INTERNAL", "REMOVE"]);
      if (cl && HIDE.has(cl.cls)) continue;
      ops.push({ tier: group,
        id: op.operationId || `${m}_${p}`,
        method: m.toUpperCase(),
        path: p,
        group,
        tag,
        summary: op.summary || "",
        description: (op.description || "").slice(0, 900),
        auth: authOf(op, spec),
        deprecated: !!op.deprecated,
        params,
        body,
        bodyRequired: !!rb?.required,
        /**
         * The reference page is named after the operationId VERBATIM —
         * hyphens and all — so `get_v1_billing_payment-info` is a page and
         * `get_v1_billing_payment_info` is a 404. Deriving the slug instead
         * of using the id silently broke 19 links.
         */
        ref: `/docs/api/${group}/operations/${op.operationId || slugOf(m, p)}/`,
      });
    }
  }
}

// Not a warning any more: an operation with no classification entry is new,
// and new operations are published. Printed so the list stays visible.
if (unclassified.length) console.log("new since the last classification pass (included): " + [...new Set(unclassified)].join(", "));
fs.writeFileSync(path.resolve(here, "_classified-ops.json"), JSON.stringify(classified, null, 1));
const json = JSON.stringify({ generatedFrom: "walletos-docs/openapi/tiers (public, own-wallet, rift-wallet)", count: ops.length, operations: ops });
if (BANNED.test(json)) throw new Error("Banned third-party name in spec: " + json.match(BANNED)[0]);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, json);
console.log(`wrote ${ops.length} operations -> ${out} (${(json.length / 1024).toFixed(0)} KB)`);
