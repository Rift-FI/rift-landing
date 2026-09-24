import { readFileSync, createWriteStream } from "node:fs";
import PDFDocument from "pdfkit";
const policy = JSON.parse(readFileSync(new URL("../src/content/terms.json", import.meta.url), "utf8"));
const SECTIONS = policy.sections;
const LAST_UPDATED = policy.updated;
const OUT = new URL("../public/rift-terms.pdf", import.meta.url);
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 56, bottom: 56, left: 56, right: 56 },
  info: {
    Title: "Rift Terms of Service",
    Author: "Sphere Ramp Ltd",
    Subject: "Terms of Service",
    Keywords: "rift, terms, sphere ramp",
  },
});
doc.pipe(createWriteStream(OUT));

const INK = "#192535";
const MUTED = "#526171";
const HAIR = "#dddddd";

/* Header */
doc
  .fillColor(MUTED).fontSize(9).font("Helvetica")
  .text("Rift", { characterSpacing: 0 })
  .moveDown(0.3);
doc
  .fillColor(INK).fontSize(28).font("Helvetica-Bold")
  .text("Terms of Service")
  .moveDown(0.35);
doc
  .fillColor(MUTED).fontSize(10).font("Helvetica")
  .text("Rift (riftfi.com) · Sphere Ramp Ltd")
  .text(`Last updated: ${LAST_UPDATED}`)
  .moveDown(0.6);

/* Rule */
const ruleY = doc.y;
doc.moveTo(56, ruleY).lineTo(539, ruleY).lineWidth(0.5).strokeColor(HAIR).stroke();
doc.moveDown(1);

/* Sections */
for (const s of SECTIONS) {
  if (doc.y > 720) doc.addPage();
  doc
    .fillColor(INK).fontSize(14).font("Helvetica-Bold")
    .text(`${s.n}. ${s.title}`, { paragraphGap: 8 });

  for (const b of s.blocks) {
    if (b.kind === "p") {
      doc
        .fillColor(INK).fontSize(10.5).font("Helvetica")
        .text(b.text, { align: "left", paragraphGap: 8, lineGap: 2 });
    } else if (b.kind === "h3") {
      doc
        .moveDown(0.2)
        .fillColor(INK).fontSize(11).font("Helvetica-Bold")
        .text(b.text, { paragraphGap: 4 });
    } else if (b.kind === "ul") {
      for (const item of b.items) {
        doc
          .fillColor(INK).fontSize(10.5).font("Helvetica")
          .text(`•  ${item}`, {
            indent: 14,
            paragraphGap: 4,
            lineGap: 2,
          });
      }
      doc.moveDown(0.2);
    }
  }
  doc.moveDown(0.6);
}

/* Footer on last page */
doc.moveDown(1);
doc
  .fillColor(MUTED).fontSize(9).font("Helvetica")
  .text(`© ${new Date().getUTCFullYear()} Sphere Ramp Ltd. All rights reserved.`, {
    align: "center",
  });

doc.end();

doc.on("finish", () => {
  console.log(`Wrote ${OUT}`);
});
