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
const BASE_URL = "https://riftfi.xyz";

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
    { loc: `${BASE_URL}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${BASE_URL}/blog`, priority: "0.9", changefreq: "weekly" },
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
      <author>noreply@riftfi.xyz (${escapeXml(p.author)})</author>
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
  console.log("[seo-lite] done");
}

main().catch((err) => {
  console.error("[seo-lite] warn:", err.message);
  process.exit(0);
});
