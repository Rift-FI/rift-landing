#!/usr/bin/env node
/**
 * Post-build SEO step.
 *  - reads blog posts from src/content/blog
 *  - prerenders each route via Playwright against a temp vite preview server
 *  - writes per-route static HTML files into dist/
 *  - regenerates sitemap.xml and feed.xml
 *  - renders an og-image.png from an HTML template
 *
 * Runs after `vite build`. Exits 0 even if individual steps fail so the
 * primary build doesn't break — SEO is additive.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import net from "node:net";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const POSTS_DIR = path.join(ROOT, "src", "content", "blog");
const BASE_URL = "https://riftfi.xyz";
const PORT = 4173;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForPort(port, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await new Promise((resolve, reject) => {
        const sock = net.createConnection({ port, host: "127.0.0.1" });
        sock.once("connect", () => {
          sock.end();
          resolve();
        });
        sock.once("error", reject);
        sock.setTimeout(1000, () => {
          sock.destroy();
          reject(new Error("timeout"));
        });
      });
      return true;
    } catch {
      await sleep(250);
    }
  }
  return false;
}

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
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
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
    const { data, content } = parseFrontmatter(raw);
    const slug = f.replace(/\.md$/, "");
    posts.push({
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || new Date().toISOString().slice(0, 10),
      author: data.author || "Rift Team",
      tags: data.tags || [],
      content,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
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
${urls
  .map(
    (u) =>
      `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");
  console.log(`[seo] sitemap.xml — ${urls.length} URLs`);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function writeRss(posts) {
  const items = posts
    .map(
      (p) =>
        `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>noreply@riftfi.xyz (${escapeXml(p.author)})</author>
${(p.tags || []).map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rift Journal</title>
    <link>${BASE_URL}/blog</link>
    <description>Essays from the Rift team on stablecoins, emerging markets and the future of programmable money.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  await fs.writeFile(path.join(DIST, "feed.xml"), xml, "utf8");
  console.log(`[seo] feed.xml — ${posts.length} items`);
}

async function renderOgImage(page) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1200px; height: 630px; font-family: "Archivo", "Helvetica Neue", Arial, sans-serif; background: #000; color: #fff; position: relative; overflow: hidden; }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(circle at 70% 40%, #000 30%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle at 70% 40%, #000 30%, transparent 80%);
  }
  .aurora { position: absolute; top: -10%; right: -10%; width: 70%; height: 120%;
    background:
      radial-gradient(40% 50% at 60% 30%, #6fe6da 0%, transparent 60%),
      radial-gradient(50% 60% at 80% 50%, #19c2d4 0%, transparent 60%),
      radial-gradient(50% 60% at 60% 70%, #0093b2 0%, transparent 60%);
    filter: blur(40px); opacity: .85;
  }
  .wrap { position: absolute; left: 80px; top: 80px; right: 80px; bottom: 80px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 14px; font-weight: 800; font-size: 28px; letter-spacing: .04em; text-transform: uppercase; }
  .brand .dot { width: 14px; height: 14px; border-radius: 50%; background: #2fe6a6; }
  h1 { font-size: 76px; font-weight: 800; line-height: 1.04; letter-spacing: -.03em; max-width: 18ch; }
  .accent { color: #6fe6da; }
  .foot { display: flex; align-items: center; justify-content: space-between; font-size: 18px; opacity: .8; }
  .url { font-family: "JetBrains Mono", ui-monospace, monospace; letter-spacing: .04em; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="aurora"></div>
  <div class="wrap">
    <div class="brand"><span class="dot"></span> Rift</div>
    <h1>Compliant stablecoin infrastructure<br/>for <span class="accent">institutions.</span></h1>
    <div class="foot">
      <span>Wallets · ramps · settlement · one API</span>
      <span class="url">riftfi.xyz</span>
    </div>
  </div>
</body></html>`;
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(DIST, "og-image.png"),
    type: "png",
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  // also copy to public so dev mode serves it
  await fs.copyFile(
    path.join(DIST, "og-image.png"),
    path.join(ROOT, "public", "og-image.png")
  ).catch(() => {});
  console.log("[seo] og-image.png generated");
}

async function prerenderRoutes(page, routes) {
  for (const route of routes) {
    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      // give Helmet a beat to apply
      await sleep(400);
      const html = await page.content();
      const outPath =
        route === "/"
          ? path.join(DIST, "index.html")
          : path.join(DIST, route.replace(/^\//, ""), "index.html");
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, html, "utf8");
      console.log(`[seo] prerendered ${route}`);
    } catch (err) {
      console.warn(`[seo] failed to prerender ${route}: ${err.message}`);
    }
  }
}

async function main() {
  await fs.access(DIST).catch(() => {
    console.error("[seo] dist/ not found — did vite build run?");
    process.exit(1);
  });

  const posts = await loadPosts();
  console.log(`[seo] found ${posts.length} blog posts`);

  await writeSitemap(posts);
  await writeRss(posts);

  // start preview server — direct node invocation of vite's JS entry,
  // no npx, no shell. Bind explicitly to 127.0.0.1 so waitForPort matches.
  const viteEntry = path.join(ROOT, "node_modules", "vite", "bin", "vite.js");
  const preview = spawn(
    process.execPath,
    [viteEntry, "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"],
    {
      stdio: ["ignore", "pipe", "pipe"],
      cwd: ROOT,
      windowsHide: true,
    }
  );
  const logs = [];
  preview.stdout.on("data", (d) => logs.push(`[preview] ${d}`));
  preview.stderr.on("data", (d) => logs.push(`[preview!] ${d}`));

  const ready = await waitForPort(PORT, 20000);
  if (!ready) {
    console.error("[seo] preview server failed to start; skipping prerender");
    console.error(logs.join("").slice(-1500));
    preview.kill("SIGTERM");
    return;
  }
  console.log(`[seo] preview server up on 127.0.0.1:${PORT}`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: "RiftPrerender/1.0 (+https://riftfi.xyz)",
    });
    const page = await ctx.newPage();

    await renderOgImage(page);

    const routes = ["/", "/blog", ...posts.map((p) => `/blog/${p.slug}`)];
    await prerenderRoutes(page, routes);
  } catch (err) {
    console.error("[seo] prerender step failed:", err.message);
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }

  console.log("[seo] done");
}

main().catch((err) => {
  console.error("[seo] fatal:", err);
  process.exit(0); // never fail the build
});
