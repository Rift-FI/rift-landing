/**
 * Institutional home surfaces. Light ground, dark slabs.
 *
 * The visual system is ported from liquidroyalty.com (the chosen
 * reference): centred hero, badge pill above the headline, one accent
 * word in the H1, a product frame bleeding off the bottom of the hero
 * with a floating proof card, then alternating light sections and
 * near-black 32px-radius slabs. Measured values live in the header of
 * institutional.scss, read that before changing type or spacing.
 *
 * Copy rules:
 *   - Plain language. No jargon in the first line of any card.
 *   - No em dashes anywhere. Use commas or full stops.
 *   - Stablecoin infrastructure is the category. Say it out loud.
 *   - Cover both hosted API and self-host, equal weight.
 *   - No kicker labels above section H2s. The section IS its heading.
 *
 * Claims discipline: the four proof-bar figures are real. Everything
 * inside the hero product frame is ILLUSTRATIVE and must never be
 * presented as reported volume. Rift Credit is not live, its card says
 * so in its own words.
 *
 * The /businesses page keeps the older business-facing copy unchanged.
 */

import { Reveal } from "./Reveal";

const Arrow = () => (
  <span className="i-ar" aria-hidden="true">
    →
  </span>
);

const MAILTO = "mailto:amschel@riftfi.com?subject=Rift%20infrastructure%20enquiry";
const DOCS = "https://portal.riftfi.xyz/docs";

// ── Hero ────────────────────────────────────────────────────────────────

export const InstitutionalHero = () => (
  <header className="hero-i" id="top">
    <div className="hero-i-in">
      <h1 className="i-h1 hero-i-h1">
        Settlement infrastructure for <em>African</em> financial institutions.
      </h1>

      <p className="i-lead hero-i-sub">
        Wallets, ramps and netting on stablecoin rails. Payments that waited
        days on correspondent banking settle in seconds, for less.
      </p>

      <div className="hero-i-cta">
        <a className="i-btn i-btn-1" href={MAILTO}>
          Talk to sales <Arrow />
        </a>
        <a
          className="i-btn i-btn-2"
          href={DOCS}
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </div>
    </div>

    <PortalMock />
  </header>
);

/**
 * The hero centrepiece: a browser frame containing a drawn Rift portal.
 * Pure markup, no screenshot, so it stays sharp and never goes stale.
 *
 * EVERY FIGURE HERE IS ILLUSTRATIVE. It is a product visual, not a
 * statement of volume. Real numbers live in the proof bar below.
 */
const PortalMock = () => (
  <div className="mock-stage">
    <div className="mock" role="img" aria-label="The Rift portal: balances, live corridors and recent settlements. Sample data.">
      <div className="mock-bar" aria-hidden="true">
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-url">portal.riftfi.xyz</span>
      </div>

      <div className="mock-body" aria-hidden="true">
        <aside className="mock-side">
          <div className="mock-brand">
            <img src="/assets/rift-logo.png" alt="" />
            Rift
          </div>
          <nav className="mock-nav">
            <span className="on">Overview</span>
            <span>Wallets</span>
            <span>Corridors</span>
            <span>Settlement</span>
            <span>Ramps</span>
          </nav>
        </aside>

        <div className="mock-main">
          <div>
            <div className="mock-lbl">Treasury</div>
            <div className="mock-row">
              <div className="mock-card">
                <b>1,240,800</b>
                <i>USDC, Base</i>
              </div>
              <div className="mock-card">
                <b>96,340,000</b>
                <i>KES, local stablecoin</i>
              </div>
            </div>
          </div>

          <div className="mock-row">
            <div>
              <div className="mock-lbl">Corridors</div>
              <div className="mock-list">
                <div className="mock-li">
                  <span className="mock-pip" /> Kenya to Tanzania
                  <span className="amt">live</span>
                </div>
                <div className="mock-li">
                  <span className="mock-pip" /> Kenya to Ghana
                  <span className="amt">live</span>
                </div>
                <div className="mock-li">
                  <span className="mock-pip" /> Kenya to Nigeria
                  <span className="amt">live</span>
                </div>
                <div className="mock-li">
                  <span className="mock-pip mock-pip--q" /> Ghana to Nigeria
                  <span className="amt">queued</span>
                </div>
              </div>
            </div>

            <div>
              <div className="mock-lbl">Recent settlements</div>
              <div className="mock-list">
                <div className="mock-li">
                  <span className="mock-tag">6s</span> Payout, M-Pesa
                  <span className="amt">840,000</span>
                </div>
                <div className="mock-li">
                  <span className="mock-tag">4s</span> Netted residual
                  <span className="amt">12,400</span>
                </div>
                <div className="mock-li">
                  <span className="mock-tag">9s</span> Collection, link
                  <span className="amt">31,900</span>
                </div>
                <div className="mock-li">
                  <span className="mock-tag">7s</span> Payout, bank
                  <span className="amt">204,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mock-float" aria-hidden="true">
      <b>
        <span className="mock-pip" />
        KES 2.4M
      </b>
      <span>Settled in 6 seconds</span>
    </div>
  </div>
);

// ── Proof bar ───────────────────────────────────────────────────────────

/** These four are real and defensible. Do not add a figure here that isn't. */
const PROOFS: { v: string; label: string }[] = [
  { v: "4", label: "Live markets. Kenya, Tanzania, Ghana, Nigeria." },
  { v: "$10M+", label: "Processed to date across corridors." },
  { v: "Seconds", label: "To settle, where correspondent banking takes days." },
  { v: "40 to 60%", label: "Less dollar float required per corridor." },
];

export const InstitutionalProof = () => (
  <section className="i-proofbar" aria-label="Where we are today">
    <div className="i-wrap">
      <ul className="i-proofs">
        {PROOFS.map((p) => (
          <li key={p.v} className="i-proof">
            <b>{p.v}</b>
            <span>{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ── How it settles (dark slab) ──────────────────────────────────────────

const STEPS: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Money comes in",
    d: "Your customer pays in their own currency, by bank transfer, mobile money or card, or in stablecoins from a payment link.",
  },
  {
    n: "02",
    t: "Converted at the edge",
    d: "Licensed partners turn local currency into stablecoins on the way in. One API covers all four markets.",
  },
  {
    n: "03",
    t: "Netted, then settled",
    d: "Offsetting flow between markets cancels out on a shared ledger. Only the residual settles on chain, so the corridor holds far less float.",
  },
  {
    n: "04",
    t: "Paid out locally",
    d: "Local stablecoins and tokenized deposits land in seconds. Where the last mile is a bank or a mobile wallet, it lands in minutes.",
  },
];

export const HowItSettles = () => (
  <div className="i-slab-outer">
    <section className="i-slab" id="how" aria-labelledby="how-h">
      <div className="i-wrap">
        <div className="i-head-c">
          <h2 id="how-h" className="i-h2 i-h2--inv">
            From payment to settled, in seconds.
          </h2>
          <p className="i-lead i-lead--inv">
            Stablecoins move in seconds and cost a fraction of correspondent
            banking. That is the whole reason this works.
          </p>
        </div>

        <ol className="i-steps">
          {STEPS.map((s) => (
            <li key={s.n} className="i-step">
              <span className="i-step-n">{s.n}</span>
              <h3 className="i-step-t">{s.t}</h3>
              <p className="i-step-d">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </div>
);

// ── Products ────────────────────────────────────────────────────────────

interface Product {
  key: string;
  name: string;
  category: string;
  body: string;
  icon: React.ReactNode;
}

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
      "Turn shillings, cedis, and naira into stablecoins and back through licensed partners on both ends. USD stablecoins, local stables, or whichever peg your corridor prefers. Bank transfer, mobile money, and card across four markets. New corridors add without an API change.",
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
  {
    key: "payments",
    name: "Rift Payments",
    category: "Payments Infrastructure",
    body:
      "Pay anyone in Kenya straight to their M‑Pesa number or bank account, and take payment from anywhere in the world. A client abroad pays a link in stablecoins, your supplier or your staff are paid in shillings, in minutes rather than the days a correspondent bank takes.",
    icon: <PaymentsIcon />,
  },
  {
    key: "treasury",
    name: "Rift Treasury",
    category: "Treasury Infrastructure",
    body:
      "Hold working capital in stablecoins and move it with code. Sweep balances between wallets, fund payouts as they are approved, convert into local currency on a schedule your own system decides. Every movement is signed inside the enclave and written to an audit log.",
    icon: <TreasuryIcon />,
  },
  {
    key: "credit",
    name: "Rift Credit",
    category: "Credit Infrastructure",
    body:
      "An invoice settles in 30 to 90 days, but the supplier needs the cash now. Every payment that moves through Rift leaves verified history a lender can actually underwrite, so a receivable can be advanced against and repaid automatically when the payment lands. Building now with lending partners.",
    icon: <CreditIcon />,
  },
];

export const InstitutionalProducts = () => (
  <section className="i-section i-section--white" id="products" aria-labelledby="products-h">
    <div className="i-wrap">
      <div className="i-head-c">
        <h2 id="products-h" className="i-h2">
          The stack.
        </h2>
        <p className="i-lead">
          Six pieces. Take the one you need or the whole rail.
        </p>
      </div>

      <div className="i-products">
        {PRODUCTS.map((p) => (
          <Reveal key={p.key} className="i-product">
            <div className="i-product-icon" aria-hidden="true">
              {p.icon}
            </div>
            <h3 className="i-product-name">{p.name}</h3>
            <span className="i-product-cat">{p.category}</span>
            <p className="i-product-body">{p.body}</p>
            <a className="i-product-link" href={MAILTO}>
              {/* the visible label repeats by design; the a11y name does not */}
              <span aria-hidden="true">Talk to sales</span>
              <span className="sr-only">Talk to sales about {p.name}</span>
              <Arrow />
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
  <section className="i-section i-section--wash" id="deployment" aria-labelledby="deployment-h">
    <div className="i-wrap">
      <div className="i-head-c">
        <h2 id="deployment-h" className="i-h2">
          Deployment.
        </h2>
        <p className="i-lead">
          The same API surface either way, so the choice is not permanent.
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

// ── Partners ────────────────────────────────────────────────────────────

/**
 * Circle is an ALLIANCE MEMBERSHIP, not a partnership. BlockFinaX is a
 * partner. Each row states its own relationship rather than letting one
 * section heading imply the same thing about both.
 *
 * circle-mark.png is the ring only, extracted to transparency from the
 * supplied circle.png (which had a black background baked in and a
 * near-black wordmark, so it was invisible on a light ground).
 */
export const InstitutionalPartners = () => (
  <section className="i-section i-section--tight i-section--white" id="partners" aria-labelledby="partners-h">
    <div className="i-wrap">
      <div className="i-head-c i-head-c--tight">
        <h2 id="partners-h" className="i-h2 i-h2--sm">
          Memberships and partners.
        </h2>
      </div>

      <div className="i-partners">
        <a
          className="i-partner"
          href="https://www.circle.com/alliance-program"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="i-partner-icon" src="/partners/circle-mark.png" alt="" />
          <span className="i-partner-txt">
            <b>Circle</b>
            <em>Alliance member</em>
          </span>
        </a>
        <a
          className="i-partner"
          href="https://www.blockfinax.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="i-partner-icon" src="/partners/blockfinax.png" alt="" />
          <span className="i-partner-txt">
            <b>BlockFinaX</b>
            <em>Partner</em>
          </span>
        </a>
      </div>
    </div>
  </section>
);

// ── Contact (dark slab) ─────────────────────────────────────────────────

export const InstitutionalContact = () => (
  <div className="i-slab-outer" style={{ paddingBottom: 20 }}>
    <section className="i-slab" id="contact" aria-labelledby="contact-h">
      <div className="i-wrap i-contact-in">
        <div>
          <h2 id="contact-h" className="i-h2 i-h2--inv">
            Talk to sales.
          </h2>
          <p className="i-lead i-lead--inv">
            For architecture, procurement, or regulatory questions. We reply
            the same day and can share references from banks and PSPs we
            already work with.
          </p>
        </div>
        <div>
          <a className="i-contact-mail" href={MAILTO}>
            amschel@riftfi.com
          </a>
          <div className="i-contact-btns">
            <a className="i-btn i-btn-1--inv" href={MAILTO}>
              Send an email <Arrow />
            </a>
            <a
              className="i-btn i-btn-2--inv"
              href={DOCS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ── Footer ─────────────────────────────────────────────────────────────

export const InstitutionalFooter = () => (
  <footer className="i-footer">
    <div className="i-footer-in">
      {/* One legal entity, matching Terms and Privacy, which name
          Sphere Ramp Ltd as the filer and Rift as the product. */}
      <span className="i-footer-legal">
        © {new Date().getFullYear()} Rift, a product of Sphere Ramp Ltd. Nairobi, Kenya.
      </span>
      <div className="i-footer-links">
        <a href="/blog">Journal</a>
        <a href="/businesses">For businesses</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="https://x.com/tryrift" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://t.me/+B8abU5EjpTsyMWE8" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
    </div>
  </footer>
);

// ── Icons ──────────────────────────────────────────────────────────────
//
// Stroked line icons for the product cards. `currentColor` so they pick
// up whatever colour the card tile assigns them.

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

function PaymentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h14" />
      <path d="M14 5l3 3 -3 3" />
      <path d="M21 16H7" />
      <path d="M10 13l-3 3 3 3" />
    </svg>
  );
}

function TreasuryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="15" rx="2.5" />
      <circle cx="12" cy="12.5" r="3.2" />
      <path d="M12 9.3v-1.4" />
      <path d="M12 17.1v-1.4" />
      <path d="M15.2 12.5h1.4" />
      <path d="M7.4 12.5h1.4" />
    </svg>
  );
}

function CreditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 16.5l2.2 -2.6 1.8 1.6 2.2 -3" />
    </svg>
  );
}
