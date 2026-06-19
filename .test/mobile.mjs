import { chromium } from "playwright";
import fs from "node:fs/promises";

const BASE = "http://localhost:5175";
const OUT = "c:/Users/ADMIN/rift/rift-landing/.test";
await fs.mkdir(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "390", w: 390, h: 844 },   // iPhone 14/15
  { name: "360", w: 360, h: 800 },   // small Android
  { name: "768", w: 768, h: 1024 },  // iPad
];

const PAGES = [
  ["/", "home"],
  ["/blog/black-market-is-a-price", "post"],
];

const browser = await chromium.launch({ headless: true });

const findings = [];

for (const vp of VIEWPORTS) {
  for (const [path, name] of PAGES) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 2,
      isMobile: vp.w < 768,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    // scroll through to trigger reveals
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight;
      const step = Math.min(window.innerHeight * 0.4, 300);
      for (let y = 0; y < total; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 200));
    });

    // horizontal overflow check
    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      const has = root.scrollWidth > root.clientWidth;
      // find offending elements
      const culprits = [];
      const all = document.querySelectorAll("*");
      const vw = root.clientWidth;
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 8) {
          culprits.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && typeof el.className === "string" ? el.className : "") .slice(0, 60),
            id: el.id || "",
            right: Math.round(r.right),
            width: Math.round(r.width),
          });
        }
      }
      culprits.sort((a, b) => b.right - a.right);
      return { hasOverflow: has, vw, scrollW: root.scrollWidth, culprits: culprits.slice(0, 10) };
    });

    if (overflow.hasOverflow) {
      findings.push(`[${vp.name}px ${name}] horizontal overflow (scrollW ${overflow.scrollW} vs vw ${overflow.vw})`);
      overflow.culprits.forEach(c => findings.push(`  ${c.tag}.${c.cls}#${c.id} → right ${c.right}px width ${c.width}px`));
    }

    // tap-target audit: any clickable < 32px is a flag
    if (path === "/") {
      const small = await page.evaluate(() => {
        const targets = document.querySelectorAll("a, button");
        const small = [];
        for (const el of targets) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && (r.height < 32 || r.width < 32)) {
            small.push({
              tag: el.tagName.toLowerCase(),
              text: (el.textContent || "").trim().slice(0, 40),
              w: Math.round(r.width),
              h: Math.round(r.height),
            });
          }
        }
        return small.slice(0, 10);
      });
      if (small.length) {
        findings.push(`[${vp.name}px ${name}] small tap targets (<32px):`);
        small.forEach(s => findings.push(`  ${s.tag} "${s.text}" ${s.w}×${s.h}`));
      }
    }

    // full page screenshot
    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.png`, fullPage: true });

    // also test burger on home at narrow viewports
    if (path === "/" && vp.w < 920) {
      try {
        const burger = page.locator(".nav-burger");
        if (await burger.count()) {
          await burger.click();
          await page.waitForTimeout(400);
          await page.screenshot({ path: `${OUT}/${vp.name}-${name}-menu.png` });
          await burger.click({ force: true });
          await page.waitForTimeout(200);
        } else {
          findings.push(`[${vp.name}px ${name}] burger NOT visible`);
        }
      } catch (e) {
        findings.push(`[${vp.name}px ${name}] burger interaction error: ${e.message.split("\n")[0]}`);
      }
    }

    await ctx.close();
  }
}

console.log("\n=== mobile audit findings ===");
console.log(findings.length ? findings.join("\n") : "no issues");

await browser.close();
