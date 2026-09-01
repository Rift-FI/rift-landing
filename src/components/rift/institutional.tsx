/**
 * Institutional home surfaces — the sections that compose the Home page
 * post-2026-08 pivot from business-first ("pay across African borders in
 * minutes") to institution-first ("settlement infrastructure for banks").
 *
 * Design rules (from the brief):
 *   - Ink on paper. No accent colour. No gradients. No videos.
 *   - Editorial. Generous whitespace. Anchor nav.
 *   - Every section scannable in ten seconds.
 *   - Six sections max on the page.
 *
 * Copy is the brief verbatim — do not paraphrase. It has been reviewed
 * for regulatory tone (avoids marketing claims about "crypto", never
 * says "web3", never uses "revolutionary", etc). Any wording change
 * needs sign-off.
 *
 * The current /businesses page keeps the older business-facing copy
 * unchanged; the two pages address separate audiences deliberately.
 */

import { Reveal } from "./Reveal";

// ── Hero ────────────────────────────────────────────────────────────────

/**
 * Institutional hero. Left-anchored H1, ink on paper, single kicker
 * word above, two CTAs stacked-then-inline on desktop. No product
 * screenshot — the visual weight comes from typography and whitespace,
 * exactly the "Modern Treasury / Mercury" reference the brief calls out.
 */
export const InstitutionalHero = () => (
  <header className="hero-i" id="top">
    <div className="wrap hero-i-in">
      <span className="hero-i-kicker">Rift · settlement infrastructure</span>
      <h1 className="hero-i-h1">
        Settlement infrastructure for African cross-border payments.
      </h1>
      <p className="hero-i-sub">
        Three products. Deployable on your own infrastructure. Built for
        institutions that cannot use foreign SaaS.
      </p>
      <div className="hero-i-cta">
        <a className="btn-i btn-i-primary" href="mailto:amschel@riftfi.com">
          Talk to us
        </a>
        <a
          className="btn-i btn-i-secondary"
          href="https://portal.riftfi.xyz/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </div>
    </div>
  </header>
);

// ── Products ────────────────────────────────────────────────────────────

interface Product {
  key: string;
  name: string;
  tag: string;
  lede: string;
  proof: string;
}

const PRODUCTS: Product[] = [
  {
    key: "wallet",
    name: "Rift Wallet",
    tag: "Non-custodial wallet infrastructure",
    lede: "White-label widget. Your users get ERC-4337 smart accounts.",
    proof:
      "Keys are generated inside AWS Nitro Enclaves and encrypted under a KMS key policy pinned to the enclave build measurement, so neither Rift nor AWS can extract them. Deployable on your own servers, in your own jurisdiction.",
  },
  {
    key: "ramps",
    name: "Rift Ramps",
    tag: "On- and off-ramp infrastructure",
    lede: "Connecting local currency to stablecoins.",
    proof:
      "Bank transfer, mobile money and card rails across Kenya, Tanzania, Ghana and Nigeria. One API, licensed partners on both ends.",
  },
  {
    key: "settlement",
    name: "Rift Settlement",
    tag: "Netting engine for cross-border corridors",
    lede: "Only the residual settles.",
    proof:
      "Instead of settling every payment individually through the dollar, offsetting obligations are matched on a shared ledger and only the residual settles. Compresses the dollar liquidity a corridor requires by 40 to 60 percent.",
  },
];

/**
 * Products. Three cards, equal weight. Each card is ruled — kicker on
 * top, name, lede, and then a "Technical" small-caps heading over the
 * multi-line proof paragraph. The card is not a shadowed panel; it's a
 * column of type separated from siblings by a single hairline rule.
 * That's what makes it read as a document, not a marketing tile.
 */
export const InstitutionalProducts = () => (
  <section className="i-section" id="products" aria-labelledby="products-h">
    <div className="wrap">
      <div className="i-section-head">
        <span className="i-kicker">Products</span>
        <h2 id="products-h" className="i-h2">
          Three products, deployed independently or as a stack.
        </h2>
      </div>

      <div className="i-products">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.key} className="i-product">
            <div className="i-product-num">{`0${i + 1}`}</div>
            <h3 className="i-product-name">{p.name}</h3>
            <p className="i-product-tag">{p.tag}</p>
            <p className="i-product-lede">{p.lede}</p>
            <div className="i-product-rule" aria-hidden="true" />
            <span className="i-product-tech-label">Technical</span>
            <p className="i-product-proof">{p.proof}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── Why self-hosted ─────────────────────────────────────────────────────

const SELF_HOSTED_POINTS = [
  {
    n: "01",
    title: "Data residency and operational sovereignty.",
    body: "Regulators increasingly require both. Payment data, key material, and audit logs stay inside your jurisdiction because they stay on your infrastructure.",
  },
  {
    n: "02",
    title: "Third-party risk that vendor committees will not approve.",
    body: "Foreign SaaS creates a dependency your bank's vendor risk committee will not sign off on. Rift is not a foreign SaaS; it's a deployment inside your perimeter.",
  },
  {
    n: "03",
    title: "Under your control.",
    body: "Rift deploys inside your VPC, on your KMS, behind your firewall. You own the keys, the logs, and the upgrade cadence. We ship the code.",
  },
];

/**
 * Why self-hosted. Numbered editorial points, two-column layout on
 * desktop (kicker + hed on the left, body on the right). Reads as a
 * memorandum, not a feature list.
 */
export const WhySelfHosted = () => (
  <section
    className="i-section i-section--tight"
    id="self-hosted"
    aria-labelledby="self-hosted-h"
  >
    <div className="wrap">
      <div className="i-section-head">
        <span className="i-kicker">Why self-hosted</span>
        <h2 id="self-hosted-h" className="i-h2">
          Foreign SaaS is not an option. That's the whole point.
        </h2>
      </div>

      <ol className="i-points">
        {SELF_HOSTED_POINTS.map((p) => (
          <li key={p.n} className="i-point">
            <span className="i-point-n" aria-hidden="true">
              {p.n}
            </span>
            <div className="i-point-body">
              <h3 className="i-point-t">{p.title}</h3>
              <p className="i-point-p">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ── Proof strip ─────────────────────────────────────────────────────────

const PROOFS = [
  { v: "4", label: "Live markets — Kenya, Tanzania, Ghana, Nigeria." },
  { v: "$10M+", label: "Processed to date across corridors." },
  {
    v: "Circle Alliance",
    label: "Member. USDC settlement rails integrated at the source.",
  },
  {
    v: "CBK · VASP",
    label:
      "Engaging with the Central Bank of Kenya under the Virtual Asset Service Providers Regulations 2026.",
  },
];

/**
 * Proof strip. Four items in one row on desktop, two-by-two on tablet,
 * stacked on mobile. Each is a large stat/label pair with a hairline
 * top rule. Restrained; no logos, no country flags — the copy carries
 * the credibility.
 */
export const InstitutionalProof = () => (
  <section className="i-section" id="proof" aria-labelledby="proof-h">
    <div className="wrap">
      <div className="i-section-head">
        <span className="i-kicker">Proof</span>
        <h2 id="proof-h" className="i-h2">
          Live infrastructure, licensed rails, regulator engagement.
        </h2>
      </div>

      <ul className="i-proofs">
        {PROOFS.map((p) => (
          <li key={p.v} className="i-proof">
            <span className="i-proof-v">{p.v}</span>
            <span className="i-proof-label">{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ── Contact ─────────────────────────────────────────────────────────────

/**
 * Contact. Inverted panel (paper on ink) — the one place the layout
 * flips its palette, so the eye lands here at the end of the page.
 * Email + a plain mailto that pre-fills the subject. No form; forms
 * cost trust from a compliance officer's perspective (they wonder
 * where the data goes). A direct address is more legible.
 */
export const InstitutionalContact = () => (
  <section className="i-contact" id="contact" aria-labelledby="contact-h">
    <div className="wrap i-contact-in">
      <div className="i-contact-l">
        <span className="i-kicker i-kicker--inv">Contact</span>
        <h2 id="contact-h" className="i-h2 i-h2--inv">
          Talk to a founder.
        </h2>
        <p className="i-contact-lead">
          For architecture, procurement, or regulatory questions. We reply
          from the same day and can share deployment references from
          existing bank and PSP integrations.
        </p>
      </div>
      <div className="i-contact-r">
        <a
          className="i-contact-mail"
          href="mailto:amschel@riftfi.com?subject=Rift%20-%20infrastructure%20enquiry"
        >
          amschel@riftfi.com
        </a>
        <a
          className="btn-i btn-i-primary btn-i-primary--inv"
          href="mailto:amschel@riftfi.com?subject=Rift%20-%20infrastructure%20enquiry"
        >
          Send an email
        </a>
        <a
          className="btn-i btn-i-secondary btn-i-secondary--inv"
          href="https://portal.riftfi.xyz/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the documentation
        </a>
      </div>
    </div>
  </section>
);

// ── Footer strip ───────────────────────────────────────────────────────

/**
 * A single-line footer that carries jurisdiction + entity, so a
 * compliance reviewer sees what they need without scrolling into a
 * link farm. The Nav handles navigation; this only handles legal
 * facts. Links go to the existing legal pages.
 */
export const InstitutionalFooter = () => (
  <footer className="i-footer">
    <div className="wrap i-footer-in">
      <span className="i-footer-legal">
        © {new Date().getFullYear()} Rift Finance. Nairobi, Kenya.
      </span>
      <div className="i-footer-links">
        <a href="/blog">Journal</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/businesses">For businesses</a>
      </div>
    </div>
  </footer>
);
