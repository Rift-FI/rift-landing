/* Generate public/rift-terms.pdf from the same content as src/pages/Terms.tsx.
   Run: node scripts/build-terms-pdf.mjs                                    */

import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT = resolve(__dirname, "..", "public", "rift-terms.pdf");
mkdirSync(dirname(OUT), { recursive: true });

const LAST_UPDATED = "04/07/2026";

const SECTIONS = [
  {
    n: "1",
    title: "Who we are",
    blocks: [
      { kind: "p", text: 'Rift is a product of Sphere Ramp Ltd, a company incorporated in the Republic of Kenya (registration number PVT-9WYFD5, registered office at Enkang, Ngong Road) ("Sphere Ramp", "Rift", "we", "us", "our"). These Terms of Service ("Terms") govern your access to and use of the website at riftfi.com, our applications, APIs, wallet infrastructure, and related services (together, the "Services").' },
      { kind: "p", text: 'By creating an account, accessing, or using the Services, you agree to these Terms. If you are using the Services on behalf of a business or institution, you confirm that you are authorised to bind that entity, and "you" refers to that entity.' },
    ],
  },
  {
    n: "2",
    title: "What the Services are",
    blocks: [
      { kind: "p", text: "Rift provides wallet and payments infrastructure that enables verified businesses and institutions to hold digital representations of value and to make and receive payments, including across borders. Depending on your agreement with us, the Services may include:" },
      { kind: "ul", items: [
        "Wallet creation, authentication, and transaction signing infrastructure;",
        "Onboarding and verification (KYC/KYB) tooling;",
        "Fiat on-ramp and off-ramp functionality provided through licensed partners;",
        "Movement of value between supported currencies and networks;",
        "Reporting, transaction history, and, with your consent, sharing of verified transaction history with financial institutions you designate.",
      ] },
      { kind: "h3", text: "Non-custodial architecture" },
      { kind: "p", text: "Rift's wallet infrastructure is designed so that cryptographic keys are generated and used inside secure hardware environments and are not accessible to us. We cannot unilaterally move funds held in wallets created through the Services. Where any part of a Service involves the holding of fiat currency or other assets, that holding is performed by licensed partner institutions identified to you, not by Sphere Ramp Ltd." },
      { kind: "h3", text: "We are not a bank" },
      { kind: "p", text: "Sphere Ramp Ltd is not a bank and does not accept deposits. Balances shown in the Services represent value held or recorded as described in the applicable product terms, not deposits with Sphere Ramp Ltd." },
    ],
  },
  {
    n: "3",
    title: "Eligibility",
    blocks: [
      { kind: "p", text: "To use the Services you must:" },
      { kind: "ul", items: [
        "Be at least 18 years old;",
        "Use the Services for business purposes on behalf of a duly registered business or institution, unless we expressly agree otherwise;",
        "Complete our onboarding and verification process and keep your information accurate and current;",
        "Not be located in, or acting on behalf of a person in, a jurisdiction subject to comprehensive sanctions, and not appear on any applicable sanctions list.",
      ] },
      { kind: "p", text: "We may decline, suspend, or close any account at our discretion where required for legal, regulatory, or risk reasons." },
    ],
  },
  {
    n: "4",
    title: "Verification, AML and compliance",
    blocks: [
      { kind: "p", text: "The Services are regulated-market infrastructure. You agree that:" },
      { kind: "ul", items: [
        "We may require identity, business, ownership, and source-of-funds information before and during your use of the Services, and may refuse or limit Services until verification is complete;",
        "We may screen you and your transactions against sanctions and other watchlists on an ongoing basis;",
        "We may monitor transactions, and may block, delay, or report transactions where we reasonably believe this is required by law, regulation, court order, or the rules of our partners;",
        "We may be required to report information about you and your transactions to regulators or law enforcement, including under Kenya's Proceeds of Crime and Anti-Money Laundering Act and related laws, without notice to you where the law requires or permits.",
      ] },
    ],
  },
  {
    n: "5",
    title: "Your account and security",
    blocks: [
      { kind: "p", text: "You are responsible for maintaining the confidentiality and security of your credentials, passkeys, linked authentication methods, and devices. You must notify us immediately at admin@riftfi.com of any suspected unauthorised access. Because of the non-custodial design of the wallet infrastructure, loss of your authentication factors may result in loss of access that we cannot restore; any available recovery mechanisms will be described in the product documentation and may require identity verification and waiting periods." },
    ],
  },
  {
    n: "6",
    title: "Payments and transactions",
    blocks: [
      { kind: "h3", text: "Instructions" },
      { kind: "p", text: "A transaction submitted through your account with valid authentication is deemed authorised by you. Confirmed transactions on distributed networks are generally irreversible; we cannot recall or reverse them." },
      { kind: "h3", text: "Timing and availability" },
      { kind: "p", text: "We aim to process transactions quickly, but timing depends on networks, partners, corridors, and compliance checks. Estimated speeds are not guarantees." },
      { kind: "h3", text: "Exchange rates and fees" },
      { kind: "p", text: "Applicable fees and any exchange rates or spreads will be disclosed to you before you confirm a transaction or in your commercial agreement with us. Rates may change between quotation and execution where stated." },
      { kind: "h3", text: "Corridor availability" },
      { kind: "p", text: "Supported currencies, countries, and corridors may change, including at short notice for regulatory or liquidity reasons." },
      { kind: "h3", text: "Errors" },
      { kind: "p", text: "If value is credited to you in error, you must promptly return it, and you authorise us and our partners to take reasonable steps to recover it." },
    ],
  },
  {
    n: "7",
    title: "Consent-based data sharing (credit history)",
    blocks: [
      { kind: "p", text: "Where the Services allow you to share your verified transaction history with a bank or other financial institution, such sharing occurs only at your direction and with your consent, as described in our Privacy Policy. You may withdraw consent to future sharing at any time; withdrawal does not affect information already shared." },
    ],
  },
  {
    n: "8",
    title: "Prohibited use",
    blocks: [
      { kind: "p", text: "You must not use the Services to:" },
      { kind: "ul", items: [
        "Break any law or regulation, including AML, CTF, sanctions, tax, or foreign-exchange laws;",
        "Send or receive value connected to fraud, ransomware, darknet markets, terrorism, human trafficking, child exploitation, or the proceeds of crime;",
        "Misrepresent your identity, ownership, or the purpose of transactions;",
        "Interfere with, reverse engineer, or attempt to extract keys or non-public data from the Services, except to the extent such restriction is prohibited by law;",
        "Use the Services for personal consumer purposes where your agreement with us is limited to business use;",
        "Resell or provide the Services to third parties except as expressly permitted in a written agreement with us.",
      ] },
      { kind: "p", text: "We may suspend or terminate access, freeze activity within our control, and notify authorities where we reasonably suspect prohibited use." },
    ],
  },
  {
    n: "9",
    title: "Fees",
    blocks: [
      { kind: "p", text: "Fees for the Services are set out in your commercial agreement with us. We may update fees with reasonable prior notice. Taxes, network fees, and partner charges may apply in addition and will be disclosed where practicable." },
    ],
  },
  {
    n: "10",
    title: "Intellectual property",
    blocks: [
      { kind: "p", text: "The Services, including software, APIs, designs, documentation, and the Rift name and marks, are owned by Sphere Ramp Ltd or its licensors. We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Services as intended. No other rights are granted. Feedback you provide may be used by us without restriction or obligation." },
    ],
  },
  {
    n: "11",
    title: "Third parties",
    blocks: [
      { kind: "p", text: "Parts of the Services rely on third parties, including banks, licensed payment and virtual-asset partners, cloud providers, and blockchain networks. We are not responsible for the acts, omissions, or availability of third parties, or for the operation of public networks. Your use of a partner's service may be subject to that partner's terms, which will be made available to you where applicable." },
    ],
  },
  {
    n: "12",
    title: "Service changes, suspension, and termination",
    blocks: [
      { kind: "p", text: "We may modify, suspend, or discontinue any part of the Services, and may suspend or terminate your access, where reasonably necessary for legal, regulatory, security, or operational reasons. You may stop using the Services and close your account at any time, subject to completing pending transactions and to record-keeping required by law. Sections that by their nature should survive termination (including fees owed, IP, liability, disputes) survive." },
    ],
  },
  {
    n: "13",
    title: "Disclaimers",
    blocks: [
      { kind: "p", text: 'The Services are provided "as is" and "as available". To the maximum extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or secure, or that digital assets or currencies will hold any particular value. Nothing in the Services is investment, legal, or tax advice. Nothing in these Terms excludes liability that cannot be excluded under Kenyan law, including under the Consumer Protection Act where it applies.' },
    ],
  },
  {
    n: "14",
    title: "Limitation of liability",
    blocks: [
      { kind: "p", text: "To the maximum extent permitted by law: (a) neither party is liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, revenue, data, or goodwill; and (b) our total aggregate liability arising out of or relating to the Services in any 12-month period will not exceed the greater of (i) the total fees you paid to us for the Services in that period, or (ii) the amount specified in your commercial agreement with us. These limits do not apply to liability for fraud, wilful misconduct, or death or personal injury caused by negligence, or to any liability that cannot lawfully be limited." },
    ],
  },
  {
    n: "15",
    title: "Indemnity",
    blocks: [
      { kind: "p", text: "You will indemnify and hold harmless Sphere Ramp Ltd and its officers, employees, and partners from claims, losses, and expenses (including reasonable legal fees) arising from your breach of these Terms, your violation of law, or your misuse of the Services, except to the extent caused by our own breach or misconduct." },
    ],
  },
  {
    n: "16",
    title: "Governing law and disputes",
    blocks: [
      { kind: "p", text: "These Terms are governed by the laws of the Republic of Kenya. The parties will first attempt to resolve any dispute amicably within 30 days of written notice. Failing that, the dispute shall be referred to arbitration in Nairobi under the rules of the Nairobi Centre for International Arbitration, by a single arbitrator, conducted in English. Either party may seek urgent injunctive relief in the courts of Kenya." },
    ],
  },
  {
    n: "17",
    title: "General",
    blocks: [
      { kind: "h3", text: "Notices" },
      { kind: "p", text: "We may notify you via the email associated with your account or in-product. Legal notices to us go to admin@riftfi.com and to the registered office." },
      { kind: "h3", text: "Assignment" },
      { kind: "p", text: "You may not assign these Terms without our consent. We may assign to an affiliate or in connection with a merger, acquisition, or sale of assets." },
      { kind: "h3", text: "Entire agreement" },
      { kind: "p", text: "These Terms, the Privacy Policy, and any commercial agreement between you and us form the entire agreement. If there is a conflict, a signed commercial agreement prevails." },
      { kind: "h3", text: "Severability and waiver" },
      { kind: "p", text: "If any provision is unenforceable, the remainder stays in effect. A failure to enforce is not a waiver." },
      { kind: "h3", text: "Changes to these Terms" },
      { kind: "p", text: "We may update these Terms. For material changes we will give reasonable prior notice. Continued use after the effective date constitutes acceptance." },
    ],
  },
  {
    n: "18",
    title: "Contact",
    blocks: [
      { kind: "p", text: "Sphere Ramp Ltd (Rift), Enkang, Ngong Road, Nairobi, Kenya." },
      { kind: "p", text: "sales@riftfi.com · admin@riftfi.com · admin@riftfi.xyz" },
    ],
  },
];

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

const INK = "#111111";
const MUTED = "#555555";
const HAIR = "#dddddd";

/* Header */
doc
  .fillColor(MUTED).fontSize(9).font("Helvetica")
  .text("LEGAL", { characterSpacing: 2 })
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
        .text(b.text, { align: "justify", paragraphGap: 8, lineGap: 2 });
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
