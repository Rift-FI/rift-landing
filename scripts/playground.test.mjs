/**
 * What the playground must get right.
 *
 * It is the one place a reader can hit a real endpoint with a real key, so
 * two things matter more than anything else: it must never offer an internal
 * operation, and it must agree with the reference. A playground that lists
 * something the docs do not — or calls a path the docs spell differently —
 * teaches the wrong API.
 *
 * Run: node scripts/build-playground-spec.mjs && node scripts/playground.test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(fs.readFileSync(path.resolve(here, "../public/docs/playground/spec.json"), "utf8"));
const tiersDir = path.resolve(here, "../../walletos-docs/openapi/tiers");
const playgroundJs = fs.readFileSync(path.resolve(here, "../public/docs/playground/playground.js"), "utf8");

let passed = 0;
const failures = [];
const test = (name, fn) => {
  try {
    fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (e) {
    failures.push(`${name}: ${e.message.split("\n")[0]}`);
    console.error(`  FAIL ${name}\n       ${e.message.split("\n")[0]}`);
  }
};

const ops = spec.operations;
const TIERS = ["public", "own-wallet", "rift-wallet"];

console.log("playground catalogue");

test("every operation declares one of the three audiences", () => {
  for (const o of ops) assert.ok(TIERS.includes(o.tier), `${o.method} ${o.path} has tier "${o.tier}"`);
});

test("all three audiences are represented", () => {
  for (const t of TIERS) {
    assert.ok(ops.some((o) => o.tier === t), `no operations for tier ${t}`);
  }
});

test("no admin or internal operation is offered", () => {
  for (const o of ops) {
    assert.notEqual(o.auth, "admin", `${o.method} ${o.path} is admin-authed`);
    assert.ok(!/^\/v1\/admin|^\/admin|^\/cronjobs/.test(o.path), `${o.method} ${o.path} is an ops route`);
  }
});

test("no settlement provider is named", () => {
  const banned = /\b(paycrest|pretium|centiiv|sumsub|smile\s?-?id|pimlico|privy|twilio)\b|\bacross\s+protocol\b|\(across\)/i;
  const hit = JSON.stringify(spec).match(banned);
  assert.ok(!hit, `names a provider: ${hit?.[0]}`);
});

console.log("\nagreement with the reference");

test("every playground operation exists in its tier's spec", () => {
  const missing = [];
  for (const tier of TIERS) {
    const s = JSON.parse(fs.readFileSync(path.join(tiersDir, `${tier}.json`), "utf8"));
    for (const o of ops.filter((x) => x.tier === tier)) {
      const item = s.paths[o.path];
      if (!item || !item[o.method.toLowerCase()]) missing.push(`${tier}: ${o.method} ${o.path}`);
    }
  }
  assert.equal(missing.length, 0, `offered but not documented:\n  ${missing.join("\n  ")}`);
});

test("the own-wallet fiat rails are callable", () => {
  // The whole reason this tier existed without documentation: these fifteen
  // operations were in neither the reference nor the playground.
  const want = [
    ["POST", "/v1/accounts"],
    ["POST", "/v1/accounts/{id}/collections"],
    ["POST", "/v1/accounts/{id}/disbursements"],
    ["GET", "/v1/accounts/{id}/statement"],
    ["POST", "/v1/ramps/offramp/quotes"],
    ["POST", "/v1/ramps/offramp/quotes/{quoteId}/submit"],
    ["POST", "/v1/ramps/onramp"],
    ["GET", "/v1/ramps/orders/{id}"],
  ];
  for (const [m, p] of want) {
    assert.ok(ops.some((o) => o.method === m && o.path === p), `playground cannot call ${m} ${p}`);
  }
});

test("each operation links to a reference page that actually exists", () => {
  /**
   * Checking the PREFIX is not enough: it passed while 19 links pointed at
   * pages that were never built, because the slug was derived instead of
   * taken from operationId. So this resolves the file.
   */
  const docsRoot = path.resolve(here, "../public/docs");
  const broken = [];
  for (const o of ops) {
    assert.ok(o.ref.startsWith(`/docs/api/${o.tier}/operations/`), `${o.method} ${o.path} links to ${o.ref}`);
    const file = path.join(docsRoot, o.ref.replace(/^\/docs/, ""), "index.html");
    if (!fs.existsSync(file)) broken.push(`${o.method} ${o.path} -> ${o.ref}`);
  }
  assert.equal(broken.length, 0, "reference page missing for: " + broken.join(" | "));
});

console.log("\nenvironment and keys");

test("sandbox and production are both reachable, sandbox by default", () => {
  assert.match(playgroundJs, /sandbox:\s*"https:\/\/sandbox\.riftfi\.com"/);
  assert.match(playgroundJs, /production:\s*"https:\/\/api\.riftfi\.com"/);
  assert.match(playgroundJs, /var env = "sandbox"/, "sandbox must be the default");
});

test("production mutations need an explicit confirmation", () => {
  // The one guard that stops a curious reader moving real money by accident.
  assert.match(playgroundJs, /env === "production" && mutating\(\)/);
  assert.match(playgroundJs, /confirm/);
});

test("all three key types can be supplied", () => {
  assert.match(playgroundJs, /X-API-Key/);
  assert.match(playgroundJs, /Authorization: Bearer/);
  assert.match(playgroundJs, /psk_/);
});

test("the listing is grouped by audience, in order", () => {
  assert.match(playgroundJs, /TIER_LABEL/);
  assert.match(playgroundJs, /1\. Public/);
  assert.match(playgroundJs, /2\. Your own wallets/);
  assert.match(playgroundJs, /3\. Rift wallets/);
});

test("no key is persisted anywhere", () => {
  // Typing a production key into a web page is risk enough without it being
  // written to disk.
  const code = playgroundJs.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
  for (const api of ["localStorage", "sessionStorage", "indexedDB", "document.cookie"]) {
    assert.ok(!code.includes(api), `playground uses ${api}`);
  }
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
