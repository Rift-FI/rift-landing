import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../rift/useInView";
import {
  APP_URL,
  CONTACT_EMAIL,
  CONTACT_HREF,
  DOCS_URL,
  PARTNERS,
  WAITLIST_HREF,
} from "../../lib/links";

/**
 * Landing page, 2026-11 redesign.
 *
 * Copy rule: every sentence has to be true today. Yield is not live, so it
 * is only ever described in the future tense with no rate attached. Rails
 * are only named for the countries where we know them (Kenya, Nigeria).
 */

const Arrow = () => (
  <svg className="rl-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* ── HERO ──────────────────────────────────────────────────────────── */

const WalletShot = () => (
  <div className="rl-shot" aria-hidden="true">
    <div className="rl-phone">
      <div className="rl-phone-top">
        <span className="rl-phone-back">
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </span>
        <span className="rl-phone-title">Send</span>
        <span className="rl-phone-step">1 / 2</span>
      </div>

      <div className="rl-amount">
        <span className="rl-label">You send</span>
        <div className="rl-amount-v">
          250.00 <span>USDC</span>
        </div>
      </div>

      <div className="rl-field">
        <span className="rl-label">To</span>
        <div className="rl-country">
          <span className="rl-cc">KE</span> Kenya <span className="rl-cur">KES</span>
        </div>
        <div className="rl-tabs">
          <span className="is-on">M-Pesa</span>
          <span>Bank</span>
          <span>Till</span>
          <span>Paybill</span>
        </div>
      </div>

      <div className="rl-field">
        <span className="rl-label">Phone number</span>
        <div className="rl-input">+254 712 ••• 418</div>
      </div>

      <div className="rl-phone-btn">Review transfer</div>
    </div>

    <div className="rl-toast">
      <span className="rl-toast-dot" />
      <span>
        <strong>Paid out</strong> to M-Pesa
      </span>
    </div>
  </div>
);

const Hero = () => (
  <header className="rl-hero" id="top">
    <div className="rl-wrap rl-hero-grid">
      <div className="rl-hero-copy">
        <h1 className="rl-h1 rl-rise" style={{ ["--d" as string]: "40ms" }}>
          Send money across Africa <span className="rl-muted">and the world.</span>
        </h1>
        <p className="rl-lede rl-rise" style={{ ["--d" as string]: "120ms" }}>
          Pay M-Pesa and bank accounts from one wallet, live in seven African
          countries. Buy and sell USDC with local money.
        </p>
        <div className="rl-ctas rl-rise" style={{ ["--d" as string]: "200ms" }}>
          <a className="rl-btn rl-btn-1" href={APP_URL}>
            Open app <Arrow />
          </a>
          <a className="rl-btn rl-btn-ghost" href="#walletos">
            For institutions
          </a>
        </div>
      </div>
      <div className="rl-rise" style={{ ["--d" as string]: "260ms" }}>
        <WalletShot />
      </div>
    </div>

    <div className="rl-wrap">
      <div className="rl-strip">
        <span className="rl-strip-k">Pays out to</span>
        <ul className="rl-strip-list">
          <li>M-Pesa</li>
          <li>Bank accounts</li>
          <li>Till numbers</li>
          <li>Paybills</li>
        </ul>
        <span className="rl-strip-k">Holds</span>
        <ul className="rl-strip-list">
          <li>
            <img src="/assets/logos/usdc.svg" alt="" width="18" height="18" /> USDC
          </li>
          <li>
            <img src="/assets/logos/usdt.svg" alt="" width="18" height="18" /> USDT
          </li>
        </ul>
      </div>

      {PARTNERS.length > 0 && (
        <ul className="rl-partners" aria-label="Partners">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <img src={p.src} alt={p.name} width={p.width} loading="lazy" />
            </li>
          ))}
        </ul>
      )}
    </div>
  </header>
);

/* ── CORRIDORS ─────────────────────────────────────────────────────── */

type Corridor = { cc: string; name: string; cur: string; rails?: string[] };

const CORRIDORS: Corridor[] = [
  { cc: "KE", name: "Kenya", cur: "KES", rails: ["M-Pesa", "Bank", "Till", "Paybill"] },
  { cc: "NG", name: "Nigeria", cur: "NGN", rails: ["Bank"] },
  { cc: "TZ", name: "Tanzania", cur: "TZS" },
  { cc: "UG", name: "Uganda", cur: "UGX" },
  { cc: "MW", name: "Malawi", cur: "MWK" },
  { cc: "CD", name: "DR Congo", cur: "CDF" },
  { cc: "GH", name: "Ghana", cur: "GHS" },
];

const ROW = 56;
const ROUTES_H = CORRIDORS.length * ROW;

const Corridors = () => {
  const [ref, inView] = useInView<HTMLDivElement>();
  // The SVG's viewBox tracks its rendered width so the curves are drawn
  // at 1:1 and the stroke never stretches.
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [w, setW] = useState(240);
  useEffect(() => {
    const el = svgRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => {
      const next = Math.round(e.contentRect.width);
      if (next > 0) setW(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <section className="rl-sec" id="payments" aria-labelledby="payments-h">
      <div className="rl-wrap">
        <div className="rl-head">
          <p className="rl-eyebrow">Payments</p>
          <h2 className="rl-h2" id="payments-h">
            Seven countries, one balance.
          </h2>
          <p className="rl-sub">
            Top up with local money, hold USDC, and cash out to the accounts
            people already use.
          </p>
        </div>

        <div className={"rl-routes" + (inView ? " is-in" : "")} ref={ref}>
          <div className="rl-origin">
            <span className="rl-label">Your wallet</span>
            <span className="rl-origin-v">
              <img src="/assets/logos/usdc.svg" alt="" width="22" height="22" /> USDC
            </span>
            <span className="rl-origin-s">Buy and sell with local money</span>
          </div>

          <svg
            className="rl-lines"
            ref={svgRef}
            viewBox={`0 0 ${w} ${ROUTES_H}`}
            aria-hidden="true"
          >
            {CORRIDORS.map((c, i) => {
              const y = ROW / 2 + i * ROW;
              const d = `M0 ${ROUTES_H / 2} C ${w * 0.55} ${ROUTES_H / 2}, ${w * 0.45} ${y}, ${w} ${y}`;
              return (
                <g key={c.cc} style={{ ["--i" as string]: i }}>
                  <path className="rl-line" d={d} pathLength={1} />
                  <path className="rl-flow" d={d} pathLength={1} />
                </g>
              );
            })}
          </svg>

          <ul className="rl-dest">
            {CORRIDORS.map((c, i) => (
              <li key={c.cc} style={{ ["--i" as string]: i }}>
                <span className="rl-cc">{c.cc}</span>
                <span className="rl-dest-n">{c.name}</span>
                <span className="rl-dest-r">
                  {c.rails?.map((r) => (
                    <span className="rl-chip" key={r}>{r}</span>
                  ))}
                  <span className="rl-cur">{c.cur}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rl-sec-cta">
          <a className="rl-tlink" href={APP_URL}>
            Send a payment <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ── WALLETOS ──────────────────────────────────────────────────────── */

const APPROVALS = [
  { what: "Payout batch", detail: "120 recipients · M-Pesa", amt: "KES 4,820,000", got: 1, need: 2 },
  { what: "Treasury transfer", detail: "To settlement wallet", amt: "USDC 50,000.00", got: 0, need: 3 },
  { what: "Supplier payment", detail: "Bank · Nigeria", amt: "NGN 12,400,000", got: 1, need: 2 },
];

const DashboardShot = () => (
  <div className="rl-dash" aria-hidden="true">
    <div className="rl-dash-bar">
      <span className="rl-dash-url">dashboard · WalletOS</span>
    </div>
    <div className="rl-dash-body">
      <aside className="rl-dash-side">
        <span className="rl-dash-org">Your institution</span>
        <span>Overview</span>
        <span>Wallets</span>
        <span>Payments</span>
        <span className="is-on">
          Approvals <b>3</b>
        </span>
        <span>Developers</span>
      </aside>
      <div className="rl-dash-main">
        <div className="rl-dash-h">
          <span>Approvals</span>
          <span className="rl-dash-hs">Waiting on you</span>
        </div>
        <div className="rl-dash-rows">
          {APPROVALS.map((a) => (
            <div className="rl-dash-row" key={a.what}>
              <div className="rl-dash-what">
                <span>{a.what}</span>
                <span className="rl-dash-detail">{a.detail}</span>
              </div>
              <span className="rl-dash-amt">{a.amt}</span>
              <span className="rl-dash-sig">
                <span className="rl-dots">
                  {Array.from({ length: a.need }, (_, k) => (
                    <i key={k} className={k < a.got ? "on" : ""} />
                  ))}
                </span>
                {a.got} of {a.need}
              </span>
              <span className="rl-dash-act">Approve</span>
            </div>
          ))}
        </div>
        <div className="rl-dash-foot">
          <span className="rl-key" /> Signed with a passkey on this device
        </div>
      </div>
    </div>
  </div>
);

const OS_PARTS = [
  { h: "Wallets", p: "Smart wallets secured by passkeys. No seed phrases, and Rift never holds the keys." },
  { h: "Payments APIs", p: "Send, receive and convert between local money and USDC from your own product." },
  { h: "Approvals", p: "Decide who signs off on what, before any money moves." },
  { h: "Dashboard", p: "Every wallet, payment and approval in one view." },
];

const WalletOS = () => (
  <section className="rl-sec rl-ink" id="walletos" aria-labelledby="walletos-h">
    <div className="rl-wrap">
      <div className="rl-os-grid">
        <div className="rl-head rl-head-left">
          <p className="rl-eyebrow">WalletOS · for institutions</p>
          <h2 className="rl-h2" id="walletos-h">
            Plug anyone into the global economy.
          </h2>
          <p className="rl-sub">
            Wallet infrastructure for banks and fintechs. Give your customers
            dollar wallets they own, inside your app.
          </p>
          <div className="rl-ctas">
            <a className="rl-btn rl-btn-1" href={CONTACT_HREF}>
              Talk to us <Arrow />
            </a>
            <a className="rl-btn rl-btn-ghost" href={DOCS_URL}>
              Read the docs
            </a>
          </div>
        </div>
        <DashboardShot />
      </div>

      <dl className="rl-parts">
        {OS_PARTS.map((x) => (
          <div key={x.h}>
            <dt>{x.h}</dt>
            <dd>{x.p}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

/* ── STOCKS + YIELD ────────────────────────────────────────────────── */

const More = () => (
  <section className="rl-sec rl-more" aria-label="Stocks and yield">
    <div className="rl-wrap">
      <div className="rl-more-grid">
      <article className="rl-panel" id="stocks">
        <p className="rl-eyebrow">Stocks</p>
        <h2 className="rl-h3">Own global stocks from the same wallet.</h2>
        <p className="rl-sub">
          Tokenized equities sit next to your dollars. No brokerage account
          abroad.
        </p>
        <div className="rl-switch" aria-hidden="true">
          <span>Dollars</span>
          <span className="is-on">Stocks</span>
        </div>
        <a className="rl-tlink" href={APP_URL}>
          Open app <Arrow />
        </a>
      </article>

      <article className="rl-panel" id="yield">
        <p className="rl-eyebrow">
          Yield <span className="rl-soon">Coming soon</span>
        </p>
        <h2 className="rl-h3">Earn in dollars.</h2>
        <p className="rl-sub">
          Liquidity providers will earn on USDC and USDT. Join the list and we
          will write when it opens.
        </p>
        <div className="rl-switch rl-switch-off" aria-hidden="true">
          <span>USDC</span>
          <span>USDT</span>
        </div>
        <a className="rl-tlink" href={WAITLIST_HREF}>
          Join the waitlist <Arrow />
        </a>
      </article>
      </div>
    </div>
  </section>
);

/* ── CLOSE + FOOTER ────────────────────────────────────────────────── */

const Close = () => (
  <section className="rl-close" aria-labelledby="close-h">
    <div className="rl-wrap">
      <h2 className="rl-h2" id="close-h">
        Start with one transfer.
      </h2>
      <div className="rl-ctas rl-ctas-c">
        <a className="rl-btn rl-btn-1" href={APP_URL}>
          Open app <Arrow />
        </a>
        <a className="rl-btn rl-btn-ghost" href={CONTACT_HREF}>
          Talk to us
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="rl-foot">
    <div className="rl-wrap">
      <div className="rl-foot-grid">
        <div className="rl-foot-brand">
          <img src="/assets/rift-logo.png" alt="" width="24" height="24" />
          <span>Rift</span>
        </div>
        <nav className="rl-foot-col" aria-label="Product">
          <span>Product</span>
          <a href="#payments">Payments</a>
          <a href="#walletos">WalletOS</a>
          <a href="#stocks">Stocks</a>
          <a href="#yield">Yield</a>
        </nav>
        <nav className="rl-foot-col" aria-label="Developers">
          <span>Developers</span>
          <a href={DOCS_URL}>Docs</a>
          <a href={APP_URL}>Open app</a>
        </nav>
        <nav className="rl-foot-col" aria-label="Company">
          <span>Company</span>
          <Link to="/blog">Journal</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </div>
      <p className="rl-foot-legal">
        © {new Date().getFullYear()} Rift, a product of Sphere Ramp Ltd. Nairobi, Kenya.
      </p>
    </div>
  </footer>
);

export const Landing = () => (
  <div className="rl">
    <Hero />
    <Corridors />
    <WalletOS />
    <More />
    <Close />
    <Footer />
  </div>
);
