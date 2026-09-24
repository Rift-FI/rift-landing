import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
const server = await createServer({ server: { middlewareMode: true }, appType: "custom", ssr: { resolve: { conditions: ["module-sync", "module", "node"] }, noExternal: ["react-router-dom", "react-router", "react-helmet-async"] }, logLevel: "error" });
try {
  const template = await readFile("dist/index.html", "utf8");
  if (!template.includes("<!--route-head-->")) throw new Error("Run vite build before prerendering; the template has already been rendered.");
  const { render, routes } = await server.ssrLoadModule("/src/entry-server.tsx");
  for (const route of routes) {
    const { html } = render(route);
    if (!html.includes('<main')) throw new Error(`Missing rendered content: ${route}`);
    // React 19 hoists native metadata in the server output. Move it into the document head.
    const metadata = /<title[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g;
    const head = (html.match(metadata) || []).map(tag => tag.replace(/^<(\w+)/, '<$1 data-rift-ssr="true"')).join("");
    if (!head.includes('rel="canonical"')) throw new Error(`Missing canonical: ${route}`);
    const body = html.replace(metadata, "");
    const document = template.replace('<!--route-head-->', head).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const destination = route === "/" ? "dist/index.html" : `dist${route}.html`;
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, document, "utf8");
  }
  console.log(`[prerender] ${routes.length} pages rendered with content and metadata`);
} finally { await server.close(); }
