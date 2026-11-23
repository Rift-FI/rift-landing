// Builds the docs additions that live in rift-landing (not in the walletos-docs Starlight source):
//   1. New pages from docs-src/*.md  ->  public/docs/<slug>/index.html
//   2. Patches the already-built Starlight HTML in public/docs (sidebar entry, home cards, fact fixes,
//      third-party names removed). Idempotent: safe to re-run after every re-copy of the Starlight build.
//   3. public/llms.txt and public/llms-full.txt
// Run: node scripts/build-playground-spec.mjs && node scripts/build-docs-extras.mjs
// Reads (never writes) ../walletos-docs. Contains no secrets.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { spawnSync } from "node:child_process";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const docsOut = path.join(root, "public/docs");
const srcDir = path.join(root, "docs-src");
const wos = path.resolve(root, "../walletos-docs");
const SITE = "https://riftfi.com";

const BANNED = /(paycrest|pretium|centiiv|sumsub|smile\s?-?id|pimlico|privy|twilio|Resend-|across protocol|\(across\))/i;

/* ---------- shared sanitising (applies to HTML, MDX-derived text and spec text) ---------- */
const TEXT_FIXES = [
  [/\(SmileID or Sumsub depending on country\)/g, "(the flow depends on the customer's country)"],
  [/SmileID: KE\/NG\/UG\/GH\/ZA\/ZM\.\s*Sumsub: everywhere else\./g, "Rift selects the verification flow by the customer's country."],
  [/SmileID: \{ token, provider, expires_at \} \| Sumsub: \{ verificationUrl, provider, linkDelivered, deliveryMethod \}/g,
    "{ token, provider, expires_at } for an in-app flow, or { verificationUrl, provider, linkDelivered, deliveryMethod } for a hosted link"],
  [/verified SmileID KYC session/g, "verified KYC session"],
  [/\(through Rift and Pimlico\)/g, "(through Rift)"],
  [/\*\*Bundler and paymaster\*\* \(Pimlico\)/g, "**Bundler and paymaster**"],
  [/\(Pimlico\)/g, ""],
  [/Pimlico\. Gas sponsored/g, "Gas sponsored"],
  [/Rift's sponsoring paymaster \(Pimlico\)/g, "Rift's sponsoring paymaster"],
  [/ and Pimlico\b/g, ""],
  [/via Across Protocol/g, "via Rift's bridge"],
  [/ \(Across\)/g, ""],
  [/builds Across `approve` \+ `depositV3` calls/g, "builds the bridge calls"],
  [/ \(Twilio Verify\)/g, ""],
  [/ \(Resend, Redis-backed\)/g, ""],
  [/Resend-backed, branded/g, "Branded"],
  [/\bsphere accounts\b/g, "Rift accounts"],
  [/\bsphere account\b/g, "Rift account"],
  [/Bridges \(Across\)/g, "Bridges"],
  [/## Bridges \(Across\)/g, "## Bridges"],
  [/with Across,/g, "between chains,"],
  [/through Across/g, "through Rift's bridge"],
  [/Across relayers/g, "bridge relayers"],
  [/fresh Across/g, "fresh bridge"],
  [/KYC and sanctions requirements for your licence are configured/g, "KYC and sanctions requirements for your jurisdiction and use case are configured"],
  [/https:\/\/api\.riftfi\.com/g, "https://api.riftfi.com"],
  [/\bapi\.riftfi\.com/g, "api.riftfi.com"],
];
const fixText = (s) => TEXT_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s);

/* ---------- page shell for new pages ---------- */
const NAV = [
  ["/docs/getting-started/", "Getting started"],
  ["/docs/authentication/", "Authentication"],
  ["/docs/integrate/", "Integrate"],
  ["/docs/capabilities/", "Capabilities"],
  ["/docs/rate-limits/", "Rate limits"],
  ["/docs/playground/", "API playground"],
];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function frontMatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (m) for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return { meta, body: m ? src.slice(m[0].length) : src };
}

function slugify(t) { return t.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

function renderMd(body) {
  const r = new marked.Renderer();
  r.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const id = slugify(text);
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  return marked.parse(body, { renderer: r, gfm: true });
}

function pageHtml({ title, description, slug, bodyHtml }) {
  const nav = NAV.map(([h, t]) => `<a href="${h}"${h === `/docs/${slug}/` ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  return `<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | Rift</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}/docs/${slug}/">
<link rel="shortcut icon" href="/docs/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/docs/playground/playground.css">
<link rel="stylesheet" href="/docs/playground/article.css">
</head><body>
<header class="top"><a class="brand" href="/docs/">Rift docs</a><nav>${nav}<a href="/docs/api/">API reference</a><a href="/llms.txt">llms.txt</a></nav></header>
<main class="article"><h1>${esc(title)}</h1><p class="lede">${esc(description)}</p>${bodyHtml}
<p class="foot">Part of the <a href="/docs/">Rift developer documentation</a>. Machine-readable version: <a href="/llms-full.txt">llms-full.txt</a>.</p></main>
</body></html>`;
}

const pages = [];
for (const f of fs.readdirSync(srcDir).filter((f) => f.endsWith(".md"))) {
  const { meta, body } = frontMatter(fs.readFileSync(path.join(srcDir, f), "utf8").split(String.fromCharCode(13)).join(""));
  const slug = f.replace(/\.md$/, "");
  const clean = fixText(body);
  pages.push({ slug, meta, body: clean });
  const dir = path.join(docsOut, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml({ title: meta.title.replace(/^Integrate: .*/, "Integrate"), description: meta.description, slug, bodyHtml: renderMd(clean) }));
}

/* ---------- patch built Starlight HTML ---------- */
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["pagefind", "_astro", "playground"].includes(e.name)) walk(p, acc); }
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const NEW_SLUGS = new Set(pages.map((p) => p.slug));

const sidebarBlock =
  `<li data-rift-extras="1" class="astro-rmhv4bp6"><div style="margin:0 0 .5rem;padding:.25rem 0 .75rem;border-bottom:1px solid var(--sl-color-hairline)">` +
  `<div style="font-size:var(--sl-text-xs);text-transform:uppercase;letter-spacing:.06em;color:var(--sl-color-gray-3);margin-bottom:.35rem">Start here</div>` +
  [...NAV, ["/llms.txt", "llms.txt (for AI agents)"]]
    .map(([h, t]) => `<a href="${h}" style="display:block;padding:.2rem 0;text-decoration:none;color:var(--sl-color-white);font-size:var(--sl-text-sm)">${t}</a>`).join("") +
  `</div></li>`;

const cardsBlock = `<a class="rift-card" data-rift-extras="1" href="/docs/getting-started/"><span class="rift-card__title">Getting started</span><span class="rift-card__body">First call in the free sandbox, then production at a flat $88 per month.</span></a>` +
  `<a class="rift-card" data-rift-extras="1" href="/docs/playground/"><span class="rift-card__title">API playground</span><span class="rift-card__body">Run live requests against sandbox or production with your own key. The key is never stored.</span></a>` +
  `<a class="rift-card" data-rift-extras="1" href="/docs/authentication/"><span class="rift-card__title">Authentication</span><span class="rift-card__body">Project keys, public <code>pk_</code> keys, platform keys, customer tokens and headers.</span></a>` +
  `<a class="rift-card" data-rift-extras="1" href="/docs/integrate/"><span class="rift-card__title">Integrate</span><span class="rift-card__body">Widget, React, TypeScript SDK or plain REST, with working code.</span></a>` +
  `<a class="rift-card" data-rift-extras="1" href="/docs/capabilities/"><span class="rift-card__title">Capabilities</span><span class="rift-card__body">Every capability group and its endpoints in one table.</span></a>` +
  `<a class="rift-card" data-rift-extras="1" href="/llms.txt"><span class="rift-card__title">For AI agents</span><span class="rift-card__body"><code>llms.txt</code> and <code>llms-full.txt</code>: the whole integration, self-contained.</span></a>`;

const callout = (html) => `<aside data-rift-extras="1" style="margin:0 0 1.25rem;padding:.75rem 1rem;border:1px solid var(--sl-color-accent);border-radius:.5rem">${html}</aside>`;
const CALLOUTS = {
  "api/index.html": callout(`<strong>Try it live.</strong> Every endpoint can be run from the <a href="/docs/playground/">API playground</a> against sandbox (free) or production with your own key. Public frontend keys prefixed <code>pk_</code> are being introduced; existing <code>sk_</code> keys keep working. See <a href="/docs/authentication/">Authentication</a> and <a href="/docs/rate-limits/">Rate limits</a>.`),
  "guides/sandbox-vs-production/index.html": callout(`<strong>Sandbox is free.</strong> Production API access is a flat <strong>$88 per month</strong> subscription. Production base URL: <code>https://api.riftfi.com</code>. See <a href="/docs/getting-started/">Getting started</a>.`),
};
const PRICING_HTML = `<div data-rift-extras="1"><h2>Sandbox is free</h2><p>The sandbox at <code>https://sandbox.riftfi.com</code> is free and needs no payment. Build and test every integration there.</p>
<h2>Production: $88 per month</h2><p>Production API access (<code>https://api.riftfi.com</code>) is one flat subscription of <strong>$88 per month</strong>. There are no usage tiers. New projects start with a short trial. Billing details are returned by <code>GET /v1/billing/plans</code> and <code>GET /v1/billing/payment-info</code>. Fees for payouts, onramp, bridges and transfers are priced per corridor and shown in each quote.</p>
<p>For volume terms, a security pack or help with your launch plan, email <a href="mailto:admin@riftfi.xyz">admin@riftfi.xyz</a> with your countries, expected monthly active customers and the rails you need.</p></div>`;

let patched = 0;
for (const file of walk(docsOut)) {
  const rel = path.relative(docsOut, file).split(path.sep).join("/");
  if (NEW_SLUGS.has(rel.split("/")[0]) && rel.endsWith("index.html") && rel.split("/").length === 2) continue; // our own pages
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = fixText(html);
  if (!html.includes('data-rift-extras="1" class="astro-rmhv4bp6"')) {
    html = html.replace(/(<ul class="top-level astro-rmhv4bp6">)/, `$1${sidebarBlock}`);
  }
  if (rel === "index.html" && !html.includes('<a class="rift-card" data-rift-extras')) {
    html = html.replace('<div class="rift-cards not-content">', `<div class="rift-cards not-content">${cardsBlock}`);
  }
  if (rel === "pricing/index.html" && !html.includes("data-rift-extras=\"1\"><h2")) {
    html = html.replace(/(<div class="sl-markdown-content">)[\s\S]*?(<\/div>\s*<\/main>|<\/div><footer|<\/div><\/div><\/div>)/, (m, a, b) => a + PRICING_HTML + b);
  }
  if (CALLOUTS[rel] && !html.includes("<aside data-rift-extras")) {
    html = html.replace('<div class="sl-markdown-content">', `<div class="sl-markdown-content">${CALLOUTS[rel]}`);
  }
  if (html !== before) { fs.writeFileSync(file, html); patched++; }
}
console.log(`patched ${patched} built pages, wrote ${pages.length} new pages`);

/* ---------- prune the API reference to the CUSTOMER set (scripts/endpoint-classification.json) ----------
   CUSTOMER: kept. APP: page kept but moved out of the sidebar/index into "Used by the Rift widget and app".
   INTERNAL / DEAD (and anything unclassified): page directory deleted and every link to it removed.
   Needs scripts/_classified-ops.json, written by build-playground-spec.mjs (run that first). Idempotent. */
const clsFile = path.join(here, "_classified-ops.json");
if (!fs.existsSync(clsFile)) throw new Error("Run scripts/build-playground-spec.mjs first (writes _classified-ops.json)");
const classified = JSON.parse(fs.readFileSync(clsFile, "utf8"));
const clsById = new Map(classified.map((o) => [`${o.group}/${o.id}`.toLowerCase(), o]));
const opDirRe = /\/docs\/api\/(core|platform)\/operations\/([^/"]+)\//;
const verdict = (group, id) => { if (id === "tags") return "CUSTOMER"; const o = clsById.get(`${group}/${id}`.toLowerCase()); return o ? o.cls : "REMOVE"; };
const dropped = [];
for (const group of ["core", "platform"]) {
  const base = path.join(docsOut, "api", group, "operations");
  if (!fs.existsSync(base)) continue;
  for (const id of fs.readdirSync(base)) {
    const v = verdict(group, id);
    if (v === "INTERNAL" || v === "DEAD" || v === "REMOVE") { fs.rmSync(path.join(base, id), { recursive: true, force: true }); dropped.push(`${group}/${id}`); }
  }
}
const appOps = classified.filter((o) => o.cls === "APP" && o.group === "core");
const APP_BANNER = callout(`<strong>Used by the Rift widget and app.</strong> This call belongs to the signed-in end user's own flow (customer access token, often a passkey signature). The Rift widget, React components and SDK make it for you; it is not part of the per-project API you call with your key. See <a href="/docs/api/core/#used-by-the-rift-widget-and-app">the list</a>.`);
const appSection = () => `<div data-rift-extras="1"><div class="sl-heading-wrapper level-h2"><h2 id="used-by-the-rift-widget-and-app" class="sl-openapi-heading">Used by the Rift widget and app</h2></div>` +
  `<p>These operations are the end user's own flows. They are authenticated with the customer's access token (not your project key) and are run for you by the widget, the React components and the SDK. You normally do not call them yourself. They are not part of the per-project API above.</p><ul>` +
  appOps.map((o) => `<li><code>${o.method} ${esc(o.path)}</code> <a href="/docs/api/core/operations/${o.id}/">${esc(o.summary || o.id)}</a></li>`).join("") + `</ul></div>`;
const TIER_NOTE = callout(`<strong>What is in this reference.</strong> Endpoints you call with your <strong>project API key</strong> or a <strong>project id</strong> you own, the server-only <strong>platform tier</strong> (<code>psk_</code> key), and public reference data. End-user flows that the Rift widget, React components and SDK run for you are collected under <a href="/docs/api/core/#used-by-the-rift-widget-and-app">Used by the Rift widget and app</a>.`);
let pruned = 0;
const emptyGroupRe = /<li class="astro-rmhv4bp6"><details[^>]*><summary[\s\S]*?<\/summary><sl-sidebar-restore[^>]*><\/sl-sidebar-restore><ul class="astro-rmhv4bp6"><\/ul><\/details><\/li>/g;
for (const file of walk(docsOut)) {
  const rel = path.relative(docsOut, file).split(path.sep).join("/");
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const gone = (h) => { const m = h.match(opDirRe); return m && verdict(m[1], m[2]) !== "CUSTOMER"; };
  // sidebar entries
  html = html.replace(/<li class="astro-rmhv4bp6"><a href="[^"]*\/docs\/api\/[^"]*"[^>]*>[\s\S]*?<\/a><\/li>/g, (m) => (gone(m) ? "" : m));
  // overview list on /docs/api/core/ and /docs/api/platform/
  html = html.replace(/<div class="sl-openapi-overview-navigation-link astro-niinzq53">[\s\S]*?<\/svg><\/div>/g, (m) => (gone(m) ? "" : m));
  // previous/next pager (its neighbours may be gone)
  if (/^api\/(core|platform)\//.test(rel)) html = html.replace(/<div class="pagination-links[^"]*" dir="ltr">[\s\S]*?<\/a><\/div>/, "");
  for (let i = 0; i < 4; i++) html = html.replace(emptyGroupRe, "");
  const mOp = rel.match(/^api\/(core|platform)\/operations\/([^/]+)\/index\.html$/);
  if (mOp && verdict(mOp[1], mOp[2]) === "APP" && !html.includes("Used by the Rift widget and app.")) html = html.replace('<div class="sl-markdown-content">', `<div class="sl-markdown-content">${APP_BANNER}`);
  if (rel === "api/core/index.html" && !html.includes('id="used-by-the-rift-widget-and-app"')) {
    html = html.replace(/(<div class="sl-heading-wrapper level-h2"><h2 id="authentication")/, `${appSection()}$1`);
  }
  if ((rel === "api/core/index.html" || rel === "api/platform/index.html") && !html.includes("What is in this reference.")) html = html.replace('<div class="sl-markdown-content">', `<div class="sl-markdown-content">${TIER_NOTE}`);
  if (rel === "api/index.html") {
    html = html.replace(/Auth, wallet &amp; passkeys[^<]*/, "Per-project endpoints: sign-in, customer administration, invoices, your project and keys, billing and public reference data.")
      .replace(/Auth, wallet & passkeys[^<]*/, "Per-project endpoints: sign-in, customer administration, invoices, your project and keys, billing and public reference data.");
  }
  if (html !== before) { fs.writeFileSync(file, html); pruned++; }
}
// sitemap + broken-link check for removed pages
const dropRe = dropped.map((d) => `/docs/api/${d.split("/")[0]}/operations/${d.split("/")[1]}/`);
const smP = path.join(docsOut, "sitemap-0.xml");
if (fs.existsSync(smP)) {
  let sm = fs.readFileSync(smP, "utf8");
  sm = sm.replace(/<url><loc>[^<]*\/docs\/api\/(core|platform)\/operations\/([^/<]+)\/<\/loc>[\s\S]*?<\/url>/g, (m, g, id) => (verdict(g, id) === "CUSTOMER" || verdict(g, id) === "APP" ? m : ""));
  fs.writeFileSync(smP, sm);
}
const broken = [];
for (const file of walk(docsOut)) {
  const t = fs.readFileSync(file, "utf8");
  for (const m of t.matchAll(/href="(\/docs\/api\/(?:core|platform)\/operations\/([^/"]+)\/)/g)) {
    const grp = m[1].includes("/platform/") ? "platform" : "core";
    if (!fs.existsSync(path.join(docsOut, "api", grp, "operations", m[2]))) broken.push(`${path.relative(docsOut, file)} -> ${m[1]}`);
  }
}
console.log(`API reference pruned: ${dropped.length} pages deleted, ${appOps.length} app operations moved aside, ${pruned} files rewritten, ${broken.length} dangling operation links`);
if (broken.length) console.warn(broken.slice(0, 15).join("\n"));
// Rebuild the search index so deleted pages stop appearing in search (needs walletos-docs/node_modules/.bin/pagefind).
{
  const pf = path.join(wos, "node_modules/.bin", process.platform === "win32" ? "pagefind.cmd" : "pagefind");
  if (fs.existsSync(pf) && process.env.SKIP_PAGEFIND !== "1") {
    const r = spawnSync(pf, ["--site", docsOut], { encoding: "utf8", shell: process.platform === "win32" });
    console.log(r.status === 0 ? "pagefind index rebuilt" : "pagefind failed: " + (r.stderr || r.stdout || "").slice(0, 300));
  } else console.warn("pagefind not run: search may still list removed pages");
}

// sitemap
const smPath = path.join(docsOut, "sitemap-0.xml");
if (fs.existsSync(smPath)) {
  let sm = fs.readFileSync(smPath, "utf8");
  for (const slug of [...NEW_SLUGS, "playground"]) {
    const loc = `${SITE}/docs/${slug}/`;
    if (!sm.includes(`<loc>${loc}</loc>`) && slug !== "playground") sm = sm.replace("</urlset>", `<url><loc>${loc}</loc></url></urlset>`);
  }
  fs.writeFileSync(smPath, sm);
}

/* ---------- llms.txt + llms-full.txt ---------- */
const classifiedAll = JSON.parse(fs.readFileSync(path.join(here, "_classified-ops.json"), "utf8"));
const spec = JSON.parse(fs.readFileSync(path.join(docsOut, "playground/spec.json"), "utf8"));

function mdxToMd(src, file) {
  let s = src.replace(/^---\n[\s\S]*?\n---\n/, "");
  const imports = {};
  s = s.replace(/^import\s+(\w+)\s+from\s+"([^"]+\?raw)";?\s*$/gm, (_, name, p) => { imports[name] = p.replace("?raw", ""); return ""; });
  s = s.replace(/^import .*$/gm, "");
  s = s.replace(/<Code\s+code=\{(\w+)\}\s+lang="(\w+)"[^>]*\/>/g, (_, name, lang) => {
    const rel = imports[name];
    if (!rel) return "";
    const p = path.resolve(path.dirname(file), rel);
    try { return "```" + lang + "\n" + fs.readFileSync(p, "utf8").trimEnd() + "\n```"; } catch { return ""; }
  });
  s = s.replace(/<\/?(Tabs|Steps|CardGrid)>/g, "").replace(/<TabItem label="([^"]+)">/g, "\n**$1**\n").replace(/<\/TabItem>/g, "");
  s = s.replace(/<LinkCard[^>]*title="([^"]+)"[^>]*href="([^"]+)"[^>]*description="([^"]*)"[^>]*\/>/g, "- [$1]($2): $3");
  s = s.replace(/<Status kind="beta"\s*\/>/g, "> Beta: this feature is rolling out and may change.\n");
  s = s.replace(/<Status kind="beta">([\s\S]*?)<\/Status>/g, (_, t) => "> Beta: " + t.trim().replace(/\n/g, " ") + "\n");
  s = s.replace(/<Status kind="unverified">([\s\S]*?)<\/Status>/g, (_, t) => "> Not yet verified end to end: " + t.trim().replace(/\n/g, " ") + "\n");
  s = s.replace(/<div class="rift-cards[\s\S]*?<\/div>\s*(?=\n##|\n*$)/g, "");
  s = s.replace(/<\/?a[^>]*>|<\/?span[^>]*>/g, "");
  s = s.replace(/^:::(\w+)(?:\[([^\]]*)\])?\s*$/gm, (_, k, t) => `> **${t || k}**`).replace(/^:::\s*$/gm, "");
  s = s.replace(/\]\(\/docs\/([^)]*)\)/g, (_, p) => `](${SITE}/docs/${p})`);
  return fixText(s).replace(/\n{3,}/g, "\n\n").trim();
}

const docRoot = path.join(wos, "src/content/docs");
const order = [
  ["Overview", ["overview/what-is-walletos", "overview/architecture", "overview/security", "overview/chains-and-tokens"]],
  ["Quickstarts", ["quickstarts/react", "quickstarts/server", "quickstarts/widget", "quickstarts/platform", "quickstarts/mcp"]],
  ["Guides: wallets and signing", ["guides/passkeys-and-recovery", "guides/two-phase-signing", "guides/approvals", "guides/device-binding", "guides/gas-sponsorship"]],
  ["Guides: money movement", ["guides/payment-corridors", "guides/offramp", "guides/onramp", "guides/accounts", "guides/own-wallet-ramps", "guides/liquidity-providers", "guides/swaps-and-bridges", "guides/walletconnect"]],
  ["Guides: data and events", ["guides/ledger-and-statements", "guides/customer-history-credit", "guides/webhooks"]],
  ["Guides: operating", ["guides/errors", "guides/sandbox-vs-production", "guides/going-live"]],
  ["SDK reference", ["sdk/wallet", "sdk/react", "sdk/widget", "sdk/mcp"]],
];
let guideText = "";
const missing = [];
for (const [group, slugs] of order) {
  guideText += `\n\n# ${group}\n`;
  for (const slug of slugs) {
    const f = path.join(docRoot, slug + ".mdx");
    if (!fs.existsSync(f)) { missing.push(slug); continue; }
    const raw = fs.readFileSync(f, "utf8");
    const title = (raw.match(/^title:\s*"?(.*?)"?\s*$/m) || [])[1] || slug;
    guideText += `\n\n## ${title}\n\nSource: ${SITE}/docs/${slug}/\n\n` + mdxToMd(raw, f).replace(/^(#{1,4}) /gm, "#$1 ");
  }
}

const tierNote = { key: "per-project", platform: "platform tier", reference: "public reference data" };
const authMap = { none: "none", customer: "customer token", key: "project key", "customer+key": "customer token + project key", platform: "platform key (psk_)", admin: "internal" };
function epLine(o) {
  const ps = o.params.map((p) => `${p.name}${p.required ? "*" : ""}(${p.in})`).join(", ");
  let line = `- ${o.method} ${o.path} [${authMap[o.auth] || o.auth}]${o.group === "platform" ? " (Platform, Beta)" : ""} (${tierNote[o.tier] || "per-project"}) ${o.summary}`;
  if (ps) line += ` | params: ${ps}`;
  if (o.body !== undefined && o.method !== "GET") {
    let b = JSON.stringify(o.body);
    if (b.length > 500) b = b.slice(0, 500) + "...";
    line += ` | body: ${b}`;
  }
  return line;
}
const byTag = {};
for (const o of spec.operations) if (o.auth !== "admin") (byTag[(o.group === "platform" ? "Platform: " : "") + o.tag] ||= []).push(o);
const endpointText = Object.keys(byTag).sort().map((t) => `\n### ${t}\n\n` + byTag[t].map(epLine).join("\n")).join("\n");

const intro = fs.readFileSync(path.join(srcDir, "_llms-intro.txt"), "utf8");
const own = pages.map((p) => `\n\n# ${p.meta.title}\n\nSource: ${SITE}/docs/${p.slug}/\n\n${p.body.trim()}`).join("");

const appList = classifiedAll.filter((o) => o.cls === "APP" && o.group === "core").map((o) => `- ${o.method} ${o.path} ${o.summary}`).join(String.fromCharCode(10));
let full = `${intro.trim()}\n${own}${guideText}\n\n# Endpoint catalogue\n\nThe per-project API: every operation you call with your project API key or a project id you own (tier "per-project"), the server-only platform tier (psk_ key) and public reference data. End-user flows that the Rift widget, React components and SDK run for you are listed after the catalogue and are not an integration surface. Notation: METHOD path [auth] summary | params (* = required, in parentheses where it goes) | example JSON body. "customer token" = Authorization: Bearer; "project key" = X-API-Key. Full per-endpoint detail: ${SITE}/docs/api/core/ and ${SITE}/docs/api/platform/. Try any of them live: ${SITE}/docs/playground/\n${endpointText}\n\n# Used by the Rift widget and app (not an integration surface)\n\nEnd-user flows authenticated with the customer access token, often needing a passkey signature on the customer device. The widget, React components and SDK call them for you; do not build against them directly.\n\n${appList}\n`;

const inv = path.resolve(root, "../reports/backend-api-inventory.md");
const invNote = fs.existsSync(inv) ? "present" : "absent";
full = fixText(full);
if (BANNED.test(full)) throw new Error("Banned third-party name in llms-full: " + full.match(BANNED)[0]);

const llms = `# Rift

> Rift is wallet and payments infrastructure for products in Africa: passkey-owned (non-custodial) smart-account wallets, gasless transactions, stablecoin payouts to mobile money, bank, till and paybill, onramp, swaps and bridges, a customer ledger, webhooks, an embeddable widget and TypeScript SDKs. Everything is one REST API. Sandbox (https://sandbox.riftfi.com) is free; production (https://api.riftfi.com) is a flat $88 per month. Fund-moving calls start on your server but are approved by the customer's passkey.

Important rules for agents integrating Rift:
- Start in the sandbox. Use a sandbox project key against https://sandbox.riftfi.com.
- Never put an \`sk_\` or \`psk_\` key in client-side code or commit it. Public \`pk_\` keys are being introduced for frontends; existing keys keep working.
- Never retry a fund-moving request automatically. Look up its status first.
- A server-initiated payment returns 202 APPROVAL_REQUIRED; the customer approves it with a passkey.

## Start here

- [Getting started](${SITE}/docs/getting-started/): environments, keys, first call, going to production
- [Authentication](${SITE}/docs/authentication/): keys, tokens, headers, CORS
- [Integrate](${SITE}/docs/integrate/): widget, React, TypeScript SDK and REST code
- [Capabilities](${SITE}/docs/capabilities/): every capability group and its endpoints
- [Rate limits](${SITE}/docs/rate-limits/): limits, 429 handling

## Full text for LLMs

- [llms-full.txt](${SITE}/llms-full.txt): the entire documentation, self-contained: auth, every guide, error codes, webhooks, SDK, widget, and a catalogue of every endpoint with parameters and example bodies

## Reference

- [API reference (Core)](${SITE}/docs/api/core/): the per-project API (your API key or project id) with schemas, plus a clearly separated list of the end-user flows the widget and SDK run for you
- [API reference (Platform, Beta)](${SITE}/docs/api/platform/): server-only institution endpoints
- [API playground](${SITE}/docs/playground/): run live requests against sandbox or production with your own key; the key is kept in memory only
- [Errors and retries](${SITE}/docs/guides/errors/)
- [Webhooks](${SITE}/docs/guides/webhooks/)
- [Sandbox vs production](${SITE}/docs/guides/sandbox-vs-production/)
- [Going-live checklist](${SITE}/docs/guides/going-live/)

## Guides

- [Payment corridors and limits](${SITE}/docs/guides/payment-corridors/)
- [Payouts (offramp) and refunds](${SITE}/docs/guides/offramp/)
- [Onramp](${SITE}/docs/guides/onramp/)
- [Approvals](${SITE}/docs/guides/approvals/)
- [Two-phase signing](${SITE}/docs/guides/two-phase-signing/)
- [Passkeys and recovery](${SITE}/docs/guides/passkeys-and-recovery/)
- [Gas sponsorship](${SITE}/docs/guides/gas-sponsorship/)
- [Ledger and statements](${SITE}/docs/guides/ledger-and-statements/)

## SDKs and widget

- [@rift-finance/wallet](${SITE}/docs/sdk/wallet/): TypeScript SDK for servers
- [@rift-finance/react](${SITE}/docs/sdk/react/): React components
- [Widget (embed.js)](${SITE}/docs/sdk/widget/): embed sign-in, passkey setup and approvals in any page
- [MCP server](${SITE}/docs/sdk/mcp/): tools for AI agents

## Optional

- [Security model](${SITE}/docs/overview/security/)
- [Architecture](${SITE}/docs/overview/architecture/)
- [Pricing](${SITE}/docs/pricing/)
`;
if (BANNED.test(llms)) throw new Error("Banned name in llms.txt");
fs.writeFileSync(path.join(root, "public/llms.txt"), llms);
fs.writeFileSync(path.join(root, "public/llms-full.txt"), full);
console.log(`llms.txt ${llms.length} bytes, llms-full.txt ${(full.length / 1024).toFixed(0)} KB; missing source pages: ${missing.join(",") || "none"}; backend inventory ${invNote}`);

/* ---------- final guard over everything we publish ---------- */
const bad = [];
for (const file of [...walk(docsOut), path.join(root, "public/llms.txt"), path.join(root, "public/llms-full.txt")]) {
  const t = fs.readFileSync(file, "utf8");
  const m = t.match(BANNED);
  if (m) bad.push(`${path.relative(root, file)}: ${m[0]}`);
}
if (bad.length) { console.error("BANNED NAMES REMAIN:\n" + bad.slice(0, 20).join("\n")); process.exitCode = 1; }
else console.log("no third-party provider names in published docs, llms.txt or llms-full.txt");
