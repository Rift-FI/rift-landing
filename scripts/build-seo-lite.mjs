#!/usr/bin/env node
/**
 * Vercel-safe SEO step. No browser, no spawned servers.
 * Just walks src/content/blog, writes sitemap.xml and feed.xml into dist/.
 * Exits 0 even on individual failures so the deploy never breaks.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const POSTS_DIR = path.join(ROOT, "src", "content", "blog");
const BASE_URL = "https://riftfi.com";
// Legal / compliance pages canonicalise to the Google Play developer domain.
const LEGAL_URL = "https://riftfi.com";

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      continue;
    }
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, content: m[2] };
}

async function loadPosts() {
  const files = await fs.readdir(POSTS_DIR).catch(() => []);
  const posts = [];
  for (const f of files) {
    if (!f.endsWith(".md")) continue;
    const raw = await fs.readFile(path.join(POSTS_DIR, f), "utf8");
    const { data } = parseFrontmatter(raw);
    posts.push({
      slug: f.replace(/\.md$/, ""),
      title: data.title || f,
      description: data.description || "",
      date: data.date || new Date().toISOString().slice(0, 10),
      author: data.author || "Rift Team",
      tags: data.tags || [],
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

async function writeSitemap(posts) {
  const urls = [
    // Institutional pitch is the primary landing after the 2026-08 pivot.
    { loc: `${BASE_URL}/`, priority: "1.0", changefreq: "weekly" },
    // Business-facing page (SME cross-border payments) — still ranks for
    // its own long-tail queries so it's kept indexable at 0.85.
    { loc: `${BASE_URL}/businesses`, priority: "0.85", changefreq: "monthly" },
    { loc: `${BASE_URL}/blog`, priority: "0.9", changefreq: "weekly" },
    { loc: `${BASE_URL}/terms`, priority: "0.3", changefreq: "yearly" },
    { loc: `${BASE_URL}/privacy`, priority: "0.3", changefreq: "yearly" },
    { loc: `${BASE_URL}/delete-account`, priority: "0.3", changefreq: "yearly" },
    ...posts.map((p) => ({
      loc: `${BASE_URL}/blog/${p.slug}`,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: p.date,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) =>
  `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");
  console.log(`[seo-lite] sitemap.xml — ${urls.length} URLs`);
}

async function writeRss(posts) {
  const items = posts.map((p) =>
    `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>noreply@riftfi.com (${escapeXml(p.author)})</author>
${(p.tags || []).map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rift Journal</title>
    <link>${BASE_URL}/blog</link>
    <description>Essays from the Rift team on stablecoins, emerging markets and the future of programmable money.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  await fs.writeFile(path.join(DIST, "feed.xml"), xml, "utf8");
  console.log(`[seo-lite] feed.xml — ${posts.length} items`);
}

async function main() {
  try {
    await fs.access(DIST);
  } catch {
    console.error("[seo-lite] dist/ not found, skipping");
    return;
  }
  const posts = await loadPosts();
  console.log(`[seo-lite] found ${posts.length} posts`);
  await writeSitemap(posts);
  await writeRss(posts);
  await prerenderRoutes(posts);
  console.log("[seo-lite] done");
}

// ── Per-route static head ────────────────────────────────────────────
// The app is a client-rendered SPA, so react-helmet only updates the head
// after JS runs. Social scrapers (Twitter/LinkedIn/WhatsApp/Slack) and
// non-JS crawlers never run it — they'd see the homepage title, description
// and canonical on EVERY url. We write a static copy of index.html per route
// with that route's head baked in, so the raw HTML already carries the right
// title, description, canonical and OpenGraph tags. React still hydrates the
// body normally. Meta here mirrors each page's <Helmet>.

const OG_IMAGE = `${BASE_URL}/og-image.png`;
const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replace a tag matched by `re` (or leave html unchanged if absent). */
function setTag(html, re, replacement) {
  return re.test(html) ? html.replace(re, () => replacement) : html;
}

function applyHead(template, m) {
  let h = template;
  h = setTag(h, /<title>[\s\S]*?<\/title>/i, `<title>${escHtml(m.title)}</title>`);
  h = setTag(h, /<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escAttr(m.description)}" />`);
  h = setTag(h, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escAttr(m.canonical)}" />`);
  h = setTag(h, /<meta\s+property=["']og:type["'][^>]*>/i, `<meta property="og:type" content="${escAttr(m.ogType || "website")}" />`);
  h = setTag(h, /<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escAttr(m.ogTitle || m.title)}" />`);
  h = setTag(h, /<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escAttr(m.ogDescription || m.description)}" />`);
  h = setTag(h, /<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${escAttr(m.canonical)}" />`);
  h = setTag(h, /<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escAttr(m.ogTitle || m.title)}" />`);
  h = setTag(h, /<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escAttr(m.ogDescription || m.description)}" />`);
  if (m.extraHead) h = h.replace(/<\/head>/i, `${m.extraHead}\n  </head>`);
  return h;
}

function postJsonLd(p) {
  const url = `${BASE_URL}/blog/${p.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Person", name: p.author || "Rift Team", url: `${BASE_URL}/blog` },
    publisher: { "@type": "Organization", name: "Rift Finance", url: `${BASE_URL}/`, logo: { "@type": "ImageObject", url: `${BASE_URL}/assets/rift-logo.png`, width: 512, height: 512 } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
    articleSection: (p.tags && p.tags[0]) || "Essay",
    keywords: (p.tags || []).join(", "),
  };
  const articleTags = [
    `<meta property="article:published_time" content="${escAttr(p.date)}" />`,
    `<meta property="article:modified_time" content="${escAttr(p.date)}" />`,
    p.author ? `<meta property="article:author" content="${escAttr(p.author)}" />` : "",
    ...(p.tags || []).map((t) => `<meta property="article:tag" content="${escAttr(t)}" />`),
  ].filter(Boolean).join("\n    ");
  return `    ${articleTags}\n    <script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}

function routeMetas(posts) {
  const routes = [
    { path: "businesses", title: "Pay across African borders in minutes, with Rift", description: "Move money across African borders in minutes, compliantly, and turn every payment into credit history your bank can see." },
    { path: "blog", title: "Rift Blog. Stablecoins, emerging markets, and fintech.", description: "Essays, deep dives and product updates from the Rift team on stablecoins, payments, emerging markets and what we're building.", ogTitle: "Rift Journal. Notes on money without borders.", ogDescription: "Essays from the Rift team on stablecoins, emerging markets and the future of programmable money." },
    { path: "terms", title: "Terms of Service. Rift, SPHERE-RAMP LTD.", description: "Rift Terms of Service. SPHERE-RAMP LTD, Nairobi, Kenya.", canonical: `${LEGAL_URL}/terms` },
    { path: "privacy", title: "Privacy Policy. Rift, SPHERE-RAMP LTD.", description: "Rift Privacy Policy. SPHERE-RAMP LTD, Nairobi, Kenya.", canonical: `${LEGAL_URL}/privacy` },
    { path: "delete-account", title: "Delete your Rift account. SPHERE-RAMP LTD.", description: "How to delete your Rift account and data. Operated by SPHERE-RAMP LTD, Nairobi, Kenya.", canonical: `${LEGAL_URL}/delete-account` },
  ].map((r) => ({ ...r, canonical: r.canonical || `${BASE_URL}/${r.path}` }));
  const postRoutes = posts.map((p) => ({
    path: `blog/${p.slug}`,
    canonical: `${BASE_URL}/blog/${p.slug}`,
    title: `${p.title}. Rift Blog.`,
    description: p.description,
    ogType: "article",
    ogTitle: p.title,
    ogDescription: p.description,
    extraHead: postJsonLd(p),
  }));
  return [...routes, ...postRoutes];
}

async function prerenderRoutes(posts) {
  let template;
  try {
    template = await fs.readFile(path.join(DIST, "index.html"), "utf8");
  } catch {
    console.error("[seo-lite] dist/index.html missing, skipping prerender");
    return;
  }
  let n = 0;
  for (const m of routeMetas(posts)) {
    const outDir = path.join(DIST, ...m.path.split("/"));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), applyHead(template, m), "utf8");
    n++;
  }
  console.log(`[seo-lite] prerendered ${n} route(s) with per-route head`);
}

main().catch((err) => {
  console.error("[seo-lite] warn:", err.message);
  process.exit(0);
});
