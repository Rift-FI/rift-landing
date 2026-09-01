/**
 * Institutional home surfaces — the sections that compose the Home page
 * post-2026-08 pivot from business-first ("pay across African borders in
 * minutes") to institution-first ("infrastructure for banks and PSPs").
 *
 * Design rules:
 *   - Ink on paper. Restrained. No decorative gradients or floating
 *     imagery.
 *   - Product copy is plain-language, not technical spec. A CTO, head of
 *     digital or compliance officer will read this — they know what
 *     "smart account" or "KMS" means, but leading with jargon puts them
 *     on the wrong footing about what this company is.
 *   - Positioning covers BOTH hosted API and self-host. Do not lean on
 *     "self-hosted" as the only story — many partners will pick hosted.
 *   - Six sections max on the page (per brief).
 *
 * The current /businesses page keeps the older business-facing copy
 * unchanged; the two pages address separate audiences deliberately.
 */

import { Reveal } from "./Reveal";

// ── Hero ────────────────────────────────────────────────────────────────

/**
 * Institutional hero. Left-anchored H1, ink on paper, two CTAs. No
 * kicker line — earlier version had "Rift · settlement infrastructure"
 * above the H1 which read as a duplicate of the H1 itself. The nav
 * already carries the brand.
 */
export const InstitutionalHero = () => (
  <header className="hero-i" id="top">
    <div className="wrap hero-i-in">
      <h1 className="hero-i-h1">
        Wallet and liquidity infrastructure for African financial services.
      </h1>
      <p className="hero-i-sub">
        One stack for banks, PSPs, fintechs, stablecoin issuers, and
        neobanks moving money across African markets. Use our hosted API to
        get started, or deploy the same stack on your own infrastructure.
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
  body: string;
}

/**
 * Product cards. Plain-language description in one flow. Earlier version
 * split each card into "lede" + "Technical" heading + tech proof, which
 * read as a spec sheet. Merged into a single paragraph — same substance,
 * softer edges.
 */
const PRODUCTS: Product[] = [
  {
    key: "wallet",
    name: "Rift Wallet",
    tag: "White-label wallet infrastructure",
    body:
      "A wallet you drop into your app. Users hold their own funds and sign their own payments — your treasury never custodies. Ships as a widget you brand, backed by hardware-isolated key storage so nobody at Rift and nobody at your cloud provider can move a user's money.",
  },
  {
    key: "ramps",
    name: "Rift Ramps",
    tag: "Local currency in, local currency out",
    body:
      "Turn shillings, cedis, naira into dollars — and back — through licensed partners on both ends. Bank transfer, mobile money, card. One API for four markets: Kenya, Tanzania, Ghana, Nigeria. New corridors add without an API change.",
  },
  {
    key: "settlement",
    name: "Rift Settlement",
    tag: "Netting engine for cross-border corridors",
    body:
      "Most cross-border flow between African markets cancels out. Rift matches offsetting payments on a shared ledger before they touch the dollar — only the residual settles. Corridors that use it move the same volume with 40 to 60 percent less dollar float.",
  },
];

export const InstitutionalProducts = () => (
  <section className="i-section i-section--soft" id="products" aria-labelledby="products-h">
    <div className="wrap">
      <div className="i-section-head">
        <span className="i-kicker">Products</span>
        <h2 id="products-h" className="i-h2">
          Three products. Take one, take all three.
        </h2>
        <p className="i-section-sub">
          Wallets, ramps, and settlement — each one useful on its own,
          each one better with the others.
        </p>
      </div>

      <div className="i-products">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.key} className="i-product">
            <div className="i-product-num">{`0${i + 1}`}</div>
            <h3 className="i-product-name">{p.name}</h3>
            <p className="i-product-tag">{p.tag}</p>
            <p className="i-product-body">{p.body}</p>
            <a
              className="i-product-link"
              href="mailto:amschel@riftfi.com?subject=Rift%20-%20{p.name}"
            >
              Talk to us →
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── Deployment ──────────────────────────────────────────────────────────

interface DeployMode {
  n: string;
  title: string;
  label: string;
  body: string;
  fit: string;
}

const DEPLOY_MODES: DeployMode[] = [
  {
    n: "01",
    title: "Hosted API",
    label: "Fastest to start",
    body:
      "Rift runs the stack, you make API calls. Test keys the same day, production keys once your compliance review is done. We handle uptime, upgrades, and security patches.",
    fit: "Best for fintechs, PSPs, and partners already comfortable with third-party rails.",
  },
  {
    n: "02",
    title: "Self-hosted",
    label: "Deployed inside your perimeter",
    body:
      "The same stack, running on your infrastructure. Your VPC, your KMS keys, your audit logs. Rift ships the binary and supports it — you own the deployment. For institutions where data residency, sovereignty, or vendor-committee sign-off make foreign SaaS a non-starter.",
    fit: "Best for banks and licensed VASPs subject to central-bank oversight.",
  },
];

/**
 * Deployment section. Two modes side by side. Previously this was
 * titled "Why self-hosted" with three points explaining why SaaS
 * doesn't work — that framing missed the (larger) set of partners
 * who will happily use the hosted API. Two lanes, equal weight, pick
 * one; the copy on each lane names its ideal buyer.
 */
export const Deployment = () => (
  <section
    className="i-section"
    id="deployment"
    aria-labelledby="deployment-h"
  >
    <div className="wrap">
      <div className="i-section-head">
        <span className="i-kicker">Deployment</span>
        <h2 id="deployment-h" className="i-h2">
          Two ways to run it. Same product either way.
        </h2>
        <p className="i-section-sub">
          Move from one to the other later — the API surface is identical.
        </p>
      </div>

      <div className="i-deploy">
        {DEPLOY_MODES.map((m) => (
          <div key={m.n} className="i-deploy-mode">
            <div className="i-deploy-head">
              <span className="i-deploy-n">{m.n}</span>
              <span className="i-deploy-label">{m.label}</span>
            </div>
            <h3 className="i-deploy-title">{m.title}</h3>
            <p className="i-deploy-body">{m.body}</p>
            <p className="i-deploy-fit">{m.fit}</p>
          </div>
        ))}
      </div>
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

export const InstitutionalProof = () => (
  <section
    className="i-section i-section--soft"
    id="proof"
    aria-labelledby="proof-h"
  >
    <div className="wrap">
      <div className="i-section-head">
        <span className="i-kicker">Proof</span>
        <h2 id="proof-h" className="i-h2">
          Live rails, licensed partners, regulator engagement.
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
 * Contact. Always-dark panel — colours hardcoded (not theme-linked)
 * because the earlier variable-based inversion broke in dark mode:
 * with --ink flipped to light gray, the panel background became light
 * and the "always white" text turned invisible. This section is the
 * one deliberate always-inverted block on the page, so it doesn't need
 * the theme flip.
 */
export const InstitutionalContact = () => (
  <section className="i-contact" id="contact" aria-labelledby="contact-h">
    <div className="wrap i-contact-in">
      <div className="i-contact-l">
        <span className="i-contact-kicker">Contact</span>
        <h2 id="contact-h" className="i-contact-h2">
          Talk to a founder.
        </h2>
        <p className="i-contact-lead">
          For architecture, procurement or regulatory questions. We reply
          the same day and can share references from banks and PSPs we
          already work with.
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
