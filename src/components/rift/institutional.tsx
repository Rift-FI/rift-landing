/**
 * Institutional home surfaces. Post-2026-08 pivot: from business-first
 * ("pay across African borders in minutes") to institution-first
 * ("stablecoin wallet and liquidity infrastructure").
 *
 * Copy rules:
 *   - Plain language. No jargon in the first line of any card.
 *   - No em dashes anywhere. Use commas or full stops.
 *   - Stablecoin infrastructure is the category. Say it out loud.
 *   - Cover both hosted API and self-host, equal weight.
 *
 * Design rules:
 *   - Restrained but with real surface polish (filled cards with icons,
 *     hover states, section rhythm). Not a memo, not a pitch deck.
 *   - No kicker labels above section H2s, no marketing sub-lines below
 *     them. The section IS its heading; extra words are noise.
 *
 * The /businesses page keeps the older business-facing copy unchanged.
 */

import { Reveal } from "./Reveal";

// ── Hero ────────────────────────────────────────────────────────────────

export const InstitutionalHero = () => (
  <header className="hero-i" id="top">
    <div className="wrap hero-i-in">
      <h1 className="hero-i-h1">
        Settlement infrastructure for African financial institutions.
      </h1>
      <p className="hero-i-sub">
        Wallets, ramps and netting on stablecoin rails. Deployable inside
        your own infrastructure.
      </p>
      <div className="hero-i-cta">
        <a className="btn-i btn-i-primary" href="mailto:sales@riftfi.com">
          Talk to sales
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
  category: string;
  body: string;
  icon: React.ReactNode;
}

/**
 * Product cards. Circle-inspired layout: icon top-left, product name,
 * small category label, body copy, "Learn more" link at bottom. Filled
 * background so each card reads as an object, not a doc column.
 */
const PRODUCTS: Product[] = [
  {
    key: "wallet",
    name: "Rift Wallet",
    category: "Wallet Infrastructure",
    body:
      "A wallet you drop into your app. Users hold their own stablecoins and sign their own payments, so your treasury never custodies. Ships as a white-label widget backed by hardware-isolated key storage, so nobody at Rift and nobody at your cloud provider can move a user's money.",
    icon: <WalletIcon />,
  },
  {
    key: "ramps",
    name: "Rift Ramps",
    category: "Liquidity Infrastructure",
    body:
      "Turn shillings, cedis, and naira into stablecoins and back through licensed partners on both ends. USD stablecoins (USDC, USDT), local stables, or whichever peg your corridor prefers. Bank transfer, mobile money, and card, across Kenya, Tanzania, Ghana, and Nigeria. One API for all four markets. New corridors add without an API change.",
    icon: <RampsIcon />,
  },
  {
    key: "settlement",
    name: "Rift Settlement",
    category: "Settlement Infrastructure",
    body:
      "Most cross-border flow between African markets cancels out. Rift matches offsetting payments on a shared ledger before they touch the dollar, so only the residual settles on chain. Corridors that use it move the same volume with 40 to 60 percent less dollar float.",
    icon: <SettlementIcon />,
  },
];

export const InstitutionalProducts = () => (
  <section className="i-section i-section--soft" id="products" aria-labelledby="products-h">
    <div className="wrap">
      <h2 id="products-h" className="i-h2 i-section-h2-only">
        The stack.
      </h2>

      <div className="i-products">
        {PRODUCTS.map((p) => (
          <Reveal key={p.key} className="i-product">
            <div className="i-product-icon" aria-hidden="true">
              {p.icon}
            </div>
            <h3 className="i-product-name">{p.name}</h3>
            <span className="i-product-cat">{p.category}</span>
            <p className="i-product-body">{p.body}</p>
            <a
              className="i-product-link"
              href="mailto:sales@riftfi.com"
            >
              Talk to sales <span aria-hidden="true">→</span>
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
    label: "Runs in your perimeter",
    body:
      "The same stack, running on your infrastructure. Your VPC, your KMS keys, your audit logs. Rift ships the binary and supports it, you own the deployment. For institutions where data residency, sovereignty, or vendor-committee sign-off make foreign SaaS a non-starter.",
    fit: "Best for banks and licensed VASPs subject to central-bank oversight.",
  },
];

export const Deployment = () => (
  <section className="i-section" id="deployment" aria-labelledby="deployment-h">
    <div className="wrap">
      <h2 id="deployment-h" className="i-h2 i-section-h2-only">
        Deployment.
      </h2>

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

// ── Partners ────────────────────────────────────────────────────────────

/**
 * Partners strip. Brand logos served as static SVG assets from
 * /public/partners so we can drop in the licensed brand-team files
 * without touching this component. Current assets are in-house
 * approximations sized to the strip and coloured in each brand's own
 * navy — they read on the light section background, and the CSS class
 * .i-partner-img boosts them in dark theme via a filter (see .scss).
 *
 * When we add more partners, keep the strip to at most six, sorted by
 * recency of announcement.
 */
export const InstitutionalPartners = () => (
  <section className="i-section i-section--tight" id="partners" aria-labelledby="partners-h">
    <div className="wrap">
      <h2 id="partners-h" className="i-h2 i-section-h2-only">
        Partners.
      </h2>

      <div className="i-partners">
        <a
          className="i-partner"
          href="https://www.circle.com/alliance-program"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Circle Alliance Program"
        >
          <img
            className="i-partner-img"
            src="/partners/circle.png"
            alt="Circle"
            width="112"
            height="34"
          />
        </a>
        <a
          className="i-partner"
          href="https://www.blockfinax.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="BlockFinaX"
        >
          <img
            className="i-partner-img i-partner-icon"
            src="/partners/blockfinax.png"
            alt=""
            width="40"
            height="40"
          />
          <span className="i-partner-name">BlockFinaX</span>
        </a>
      </div>
    </div>
  </section>
);

// ── Proof strip ─────────────────────────────────────────────────────────

type ProofItem =
  | { kind: "stat"; v: string; label: string }
  | { kind: "logo"; src: string; alt: string; label: string };

/**
 * Two proof-cell shapes: bare stats (a number + descriptor) and logo
 * cells (a partner or regulator mark + descriptor). Using logos where
 * the entity has one carries more weight than the entity's name in
 * bold typography.
 */
const PROOFS: ProofItem[] = [
  { kind: "stat", v: "4", label: "Live markets. Kenya, Tanzania, Ghana, Nigeria." },
  { kind: "stat", v: "$10M+", label: "Processed to date across corridors." },
  {
    kind: "logo",
    src: "/partners/circle.svg",
    alt: "Circle Alliance",
    label: "Member. Stablecoin settlement rails integrated at the source.",
  },
  {
    kind: "logo",
    src: "/partners/cbk.svg",
    alt: "Central Bank of Kenya",
    label: "Engaging under the Virtual Asset Service Providers Regulations 2026.",
  },
];

export const InstitutionalProof = () => (
  <section className="i-section i-section--soft" id="proof" aria-labelledby="proof-h">
    <div className="wrap">
      <h2 id="proof-h" className="i-h2 i-section-h2-only">
        Where we are today.
      </h2>

      <ul className="i-proofs">
        {PROOFS.map((p, i) => (
          <li key={i} className="i-proof">
            {p.kind === "stat" ? (
              <span className="i-proof-v">{p.v}</span>
            ) : (
              <span className="i-proof-logo">
                <img src={p.src} alt={p.alt} height="34" />
              </span>
            )}
            <span className="i-proof-label">{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ── Contact ─────────────────────────────────────────────────────────────

/**
 * Always-dark panel. Colours hardcoded (not variable-linked) so it
 * doesn't invert with the theme, which broke visibility in dark mode
 * on the earlier version.
 */
export const InstitutionalContact = () => (
  <section className="i-contact" id="contact" aria-labelledby="contact-h">
    <div className="wrap i-contact-in">
      <div className="i-contact-l">
        <h2 id="contact-h" className="i-contact-h2">
          Talk to sales.
        </h2>
        <p className="i-contact-lead">
          For architecture, procurement, or regulatory questions. We reply
          the same day and can share references from banks and PSPs we
          already work with.
        </p>
      </div>
      <div className="i-contact-r">
        <a
          className="i-contact-mail"
          href="mailto:sales@riftfi.com?subject=Rift%20infrastructure%20enquiry"
        >
          sales@riftfi.com
        </a>
        <a
          className="btn-i btn-i-primary btn-i-primary--inv"
          href="mailto:sales@riftfi.com?subject=Rift%20infrastructure%20enquiry"
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

// ── Footer ─────────────────────────────────────────────────────────────

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

// ── Icons ──────────────────────────────────────────────────────────────
//
// Small stroked line icons for product cards. `currentColor` so they
// pick up whichever colour the card assigns them (dark-on-light in the
// light theme, light-on-dark in the dark theme).

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RampsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v14" />
      <path d="M3 7l3 -3 3 3" />
      <path d="M18 20v-14" />
      <path d="M21 17l-3 3 -3 -3" />
    </svg>
  );
}

function SettlementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M6.6 7.2l4 3.6" />
      <path d="M17.4 7.2l-4 3.6" />
      <path d="M6.6 16.8l4 -3.6" />
      <path d="M17.4 16.8l-4 -3.6" />
    </svg>
  );
}

// Partner logos live at /public/partners/{circle,blockfinax}.svg so they
// can be swapped for licensed brand assets without touching this file.
