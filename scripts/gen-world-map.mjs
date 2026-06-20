#!/usr/bin/env node
/**
 * Generate a dotted world map SVG into public/assets/world-map-dots.svg.
 * Coarse rasterization of hand-authored continent polygons (a 2000x1000
 * equirectangular viewBox). Decorative only — not real geography.
 *
 * Run: node scripts/gen-world-map.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const W = 2000;
const H = 1000;
const STEP = 13;           // dot spacing — smaller = denser
const RADIUS = 3.6;        // dot radius
const COLOR = "#0a6e85";
const OPACITY = 0.55;
const OUT = path.join(process.cwd(), "public", "assets", "world-map-dots.svg");

/* Continents as filled polygons. Each entry is one or more polygons whose
 * union forms a recognizable silhouette. Coordinates are deliberately
 * generous so the dotted halftone still reads as a land mass. */
const CONTINENTS = {
  northAmerica: [
    // Main body (Canada through US to N. Mexico)
    [
      [100, 245], [180, 215], [260, 200], [340, 200], [430, 205],
      [510, 215], [580, 240], [630, 275], [625, 320], [605, 350],
      [600, 390], [620, 425], [625, 455], [600, 470], [560, 465],
      [510, 450], [470, 425], [440, 390], [430, 350], [420, 310],
      [395, 285], [360, 280], [320, 285], [280, 290], [235, 295],
      [185, 295], [135, 285], [100, 270],
    ],
    // Greenland
    [
      [700, 130], [765, 130], [800, 155], [810, 200], [790, 240],
      [750, 250], [710, 235], [690, 200], [690, 160],
    ],
    // Central America strip
    [
      [580, 470], [620, 480], [650, 500], [680, 525], [710, 545],
      [690, 555], [665, 545], [635, 525], [605, 505], [580, 490],
    ],
  ],
  southAmerica: [
    [
      [660, 555], [710, 555], [755, 570], [785, 600], [795, 640],
      [790, 680], [775, 720], [755, 760], [735, 800], [715, 825],
      [695, 830], [685, 815], [675, 780], [665, 740], [655, 700],
      [650, 660], [650, 620], [655, 585],
    ],
  ],
  europe: [
    // Mainland (incl. Iberia, France, Italy, Balkans, eastern Europe)
    [
      [945, 170], [990, 165], [1040, 165], [1090, 170], [1135, 180],
      [1170, 195], [1180, 215], [1170, 240], [1145, 260], [1110, 275],
      [1070, 285], [1030, 285], [990, 280], [960, 270], [945, 250],
      [945, 215],
    ],
    // British Isles
    [
      [925, 195], [955, 195], [965, 225], [955, 250], [930, 245],
      [918, 225], [918, 205],
    ],
    // Scandinavia
    [
      [1040, 120], [1085, 115], [1115, 130], [1115, 165], [1095, 180],
      [1065, 175], [1045, 160], [1040, 135],
    ],
    // Iceland
    [
      [880, 175], [905, 175], [915, 195], [905, 210], [885, 205], [875, 190],
    ],
  ],
  africa: [
    [
      [945, 320], [1000, 305], [1060, 300], [1120, 305], [1170, 320],
      [1200, 350], [1215, 390], [1230, 430], [1240, 475], [1235, 520],
      [1215, 565], [1190, 605], [1160, 640], [1125, 665], [1085, 680],
      [1045, 680], [1010, 660], [985, 625], [965, 585], [950, 540],
      [940, 495], [935, 450], [930, 405], [930, 360],
    ],
    // Madagascar
    [
      [1265, 605], [1290, 610], [1300, 645], [1290, 680], [1270, 685],
      [1260, 660], [1258, 625],
    ],
  ],
  middleEast: [
    [
      [1180, 320], [1230, 315], [1275, 320], [1305, 345], [1310, 385],
      [1295, 420], [1265, 435], [1230, 435], [1200, 420], [1180, 395],
      [1175, 360],
    ],
  ],
  asia: [
    // Vast central / northern Asia (Russia, Central Asia, China NW)
    [
      [1115, 175], [1200, 155], [1300, 150], [1400, 150], [1500, 155],
      [1600, 165], [1700, 180], [1780, 200], [1830, 225], [1840, 260],
      [1815, 290], [1770, 315], [1715, 335], [1655, 350], [1590, 360],
      [1525, 365], [1460, 365], [1395, 360], [1335, 350], [1280, 335],
      [1230, 315], [1195, 285], [1175, 245], [1155, 215],
    ],
    // India
    [
      [1410, 380], [1465, 385], [1510, 410], [1520, 455], [1500, 500],
      [1475, 525], [1450, 530], [1430, 510], [1415, 470], [1408, 425],
    ],
    // SE Asia / Indochina
    [
      [1570, 380], [1620, 385], [1650, 410], [1660, 455], [1640, 500],
      [1610, 520], [1585, 510], [1570, 470], [1565, 425],
    ],
    // Korean Peninsula + Manchuria
    [
      [1760, 320], [1790, 325], [1800, 355], [1785, 380], [1765, 380],
      [1755, 350],
    ],
    // Japan (chain of islands)
    [
      [1825, 290], [1850, 295], [1870, 320], [1865, 350], [1845, 365],
      [1820, 360], [1810, 335], [1815, 305],
    ],
    // Indonesia (long strip + Borneo + Sumatra + Java)
    [
      [1580, 540], [1640, 535], [1700, 545], [1745, 560], [1770, 580],
      [1755, 600], [1715, 610], [1665, 610], [1615, 600], [1585, 580],
    ],
    [
      [1690, 510], [1730, 515], [1745, 540], [1720, 555], [1690, 545],
    ],
    // Philippines (small cluster)
    [
      [1755, 480], [1775, 485], [1780, 510], [1765, 525], [1750, 515], [1745, 495],
    ],
  ],
  australia: [
    [
      [1735, 680], [1790, 670], [1850, 670], [1900, 685], [1935, 710],
      [1940, 745], [1915, 775], [1870, 790], [1815, 790], [1770, 775],
      [1740, 750], [1730, 720],
    ],
    // Tasmania
    [
      [1845, 810], [1870, 810], [1880, 835], [1865, 845], [1845, 840], [1840, 820],
    ],
    // New Zealand (two islands)
    [
      [1940, 795], [1960, 800], [1970, 835], [1955, 850], [1940, 840], [1935, 815],
    ],
    [
      [1955, 855], [1975, 860], [1980, 880], [1965, 890], [1955, 880],
    ],
  ],
};

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInAny(x, y, polys) {
  for (const p of polys) if (pointInPolygon(x, y, p)) return true;
  return false;
}

function build() {
  const all = Object.values(CONTINENTS).flat();
  const circles = [];
  for (let y = STEP / 2; y < H; y += STEP) {
    for (let x = STEP / 2; x < W; x += STEP) {
      if (pointInAny(x, y, all)) {
        circles.push(`<circle cx="${x}" cy="${y}" r="${RADIUS}"/>`);
      }
    }
  }
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <g fill="${COLOR}" fill-opacity="${OPACITY}">
${circles.map((c) => "    " + c).join("\n")}
  </g>
</svg>
`;
  return { svg, count: circles.length };
}

const { svg, count } = build();
await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, svg, "utf8");
console.log(`[world-map] ${count} dots → ${path.relative(process.cwd(), OUT)}`);
