import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { I, MARKS, FLAGS } from "../../lib/rift-data";

/* ============ Motion band (flow always moving) ============ */
export const MotionBand = () => (
  <section className="motion" aria-label="Money is already moving">
    <video
      className="motion-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/traffic-poster.jpg"
      aria-hidden="true"
    >
      <source src="/traffic.mp4" type="video/mp4" />
    </video>
    <div className="motion-overlay" aria-hidden="true" />
    <div className="wrap motion-in">
      <h2>African business, in motion.</h2>
    </div>
  </section>
);

/* ============ Flow visuals (where money actually moves) ============ */
const FLOW_MEDIA: { src: string; poster: string; k: string; d: string }[] = [
  {
    src: "/crossborder.mp4",
    poster: "/crossborder-poster.jpg",
    k: "Across borders",
    d: "Nairobi to Lagos, minutes.",
  },
  {
    src: "/commerce.mp4",
    poster: "/commerce-poster.jpg",
    k: "In everyday commerce",
    d: "Payroll, suppliers, checkout.",
  },
];

export const FlowVisuals = () => (
  <section className="band band--tight" aria-label="Where money moves">
    <div className="wrap">
      <div className="cmedia">
        {FLOW_MEDIA.map((c) => (
          <Reveal
            key={c.k}
            className="cmedia-card"
            style={{ backgroundImage: `url(${c.poster})` }}
          >
            <video
              className="cmedia-video"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={c.poster}
              aria-hidden="true"
            >
              <source src={c.src} type="video/mp4" />
            </video>
            <div className="cmedia-scrim" aria-hidden="true" />
            <div className="cmedia-cap">
              <span className="cm-k">{c.k}</span>
              <span className="cm-d">{c.d}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Business benefits (short, tile-based) ============ */
const BIZ_BENEFITS: { n: string; h: string; d: string }[] = [
  { n: "01", h: "Minutes, not days", d: "Suppliers paid before end of day." },
  { n: "02", h: "Local currency, both sides", d: "Send and receive in what your business runs on." },
  { n: "03", h: "Regulated rails", d: "Safe. Defensible. Compliant." },
  { n: "04", h: "Real credit history", d: "Every payment, verifiable to your bank." },
];

export const BusinessBenefits = () => (
  <section className="band" id="business">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">For businesses</span>
          <h2 style={{ marginTop: 18 }}>Faster payments.<br />Real credit history.</h2>
        </div>
        <p className="lead measure">
          Pay across borders in minutes. Build a payment history your bank can lend against.
        </p>
      </div>
      <div className="segs" style={{ marginTop: 40 }}>
        {BIZ_BENEFITS.map((b) => (
          <Reveal key={b.n} className="seg">
            <div className="seg-name">{b.n}</div>
            <div className="seg-d">
              <strong
                style={{
                  color: "var(--ink)",
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 700,
                }}
              >
                {b.h}.
              </strong>{" "}
              {b.d}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Bankable credit (volume becomes credit) ============ */
export const BankableCredit = () => (
  <section className="band" id="bankable">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">Your volume, made bankable</span>
          <h2 style={{ marginTop: 18 }}>
            Every payment counts.<br />
            <span style={{ color: "var(--muted)" }}>Toward the credit you need.</span>
          </h2>
        </div>
        <p className="lead measure">
          Cross-border payments on Rift build a verified track record. Your bank
          sees the volume, the consistency, and the repayment. That becomes credit
          you can actually draw on.
        </p>
      </div>
      <div className="bankable-shot" style={{ marginTop: 40 }}>
        <img
          className="bankable-shot-img"
          src="/bankable.jpeg"
          alt="Your cross-border volume becomes bankable credit — a credit score of 782, a $250,000 credit limit, driven by $1.25M of cross-border volume."
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

/* ============ Institution reveal (click to expand bank pitch) ============ */

const INST_BENEFITS: { h: string; d: string }[] = [
  { h: "Move money in minutes", d: "For clients you serve today." },
  { h: "Earn on flow that leaves you", d: "New fees on cross-border payments." },
  { h: "Free the cash you park abroad", d: "No more pre-funded overseas balances." },
  { h: "Lend to customers you couldn't", d: "Real payment history, in real time." },
];

export const InstitutionReveal = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [open]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#institutions") {
        setOpen(true);
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section ref={sectionRef} className="band" id="institutions">
      <div className="wrap">
        <div className="head-2col">
          <div>
            <span className="kicker">For fintechs</span>
            <h2 style={{ marginTop: 18 }}>
              The money is already moving.<br />We make sure it moves through you.
            </h2>
          </div>
          {open && (
            <p className="lead measure">
              Billions moving across African borders in stablecoins. Rift plugs
              your institution in.
            </p>
          )}
        </div>

        {!open ? (
          <button
            type="button"
            className="inst-shot"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="inst-panel"
          >
            <img
              className="inst-shot-img"
              src="/moneymoves.jpeg"
              alt="Stablecoin flows from around the world funnel through Rift into your institution."
            />
            <span className="inst-shot-cta">
              See the offer {I.arrow}
            </span>
          </button>
        ) : (
          <div id="inst-panel" ref={panelRef} className="inst-panel">
            <div className="segs" style={{ marginTop: 40 }}>
              {INST_BENEFITS.map((b, i) => (
                <Reveal key={b.h} className="seg">
                  <div className="seg-name">{`0${i + 1}`}</div>
                  <div className="seg-d">
                    <strong
                      style={{
                        color: "var(--ink)",
                        fontFamily: "Archivo, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {b.h}.
                    </strong>{" "}
                    {b.d}
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="hero-cta" style={{ marginTop: 40, justifyContent: "center" }}>
              <a className="btn btn-primary btn-lg" href="mailto:admin@riftfi.xyz">
                Book a call {I.arrow}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ============ What you can do with Rift ============ */

const OFFERS: string[] = [
  "Pay a supplier in another country in minutes",
  "Get paid in local currency from anywhere",
  "Hold and spend without touching dollars",
  "Cash in and cash out with mobile money",
  "Send at the terminal, at the counter, at the checkout",
  "Build a payment history your bank can lend against",
];

export const OneStack = () => (
  <section className="band" id="stack">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">What you can do</span>
          <h2 style={{ marginTop: 18 }}>Move money the way<br />business actually moves.</h2>
        </div>
        <p className="lead measure">
          One place. One wallet. One API.
        </p>
      </div>
      <div className="list-grid" style={{ marginTop: 40 }}>
        {OFFERS.map((c, i) => (
          <Reveal key={c} className="list-row">
            <span className="lr-n">{`0${i + 1}`}</span>
            <div><div className="lr-h">{c}</div></div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Video cards: what you do with Rift ============ */

const SEC_ITEMS: { n: string; h: string; d: string; src: string; poster: string }[] = [
  { n: "01", h: "Send across borders", d: "Nairobi to Lagos. Kampala to Accra. Minutes.", src: "/crossborder.mp4", poster: "/crossborder-poster.jpg" },
  { n: "02", h: "Onboard in seconds", d: "Google, phone, or email. No paperwork.", src: "/identity.mp4", poster: "/identity-poster.jpg" },
  { n: "03", h: "Money that stays yours", d: "Only you can move it. Nobody else.", src: "/key.mp4", poster: "/key-poster.jpg" },
  { n: "04", h: "Proof for your bank", d: "Every payment, a receipt they can lend against.", src: "/audit.mp4", poster: "/audit-poster.jpg" },
];

export const SecurityCards = () => (
  <section className="band" id="what-you-do">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">The offer</span>
          <h2 style={{ marginTop: 18 }}>Fast, safe, and<br />yours.</h2>
        </div>
        <p className="lead measure">
          Money that moves at the speed of the internet, on rails that are safe to use.
        </p>
      </div>
      <div className="sec-grid">
        {SEC_ITEMS.map((r) => (
          <Reveal key={r.n} className="sec-card">
            <div className="sec-card-media">
              <video
                className="sec-card-video"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={r.poster}
                aria-hidden="true"
              >
                <source src={r.src} type="video/mp4" />
              </video>
            </div>
            <div className="sec-card-body">
              <span className="sec-card-n mono">{r.n}</span>
              <div className="sec-card-h">{r.h}</div>
              <div className="sec-card-d">{r.d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Coverage: currencies + chains ============ */
export const Coverage = () => (
  <section className="band" id="coverage">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">Coverage</span>
          <h2 style={{ marginTop: 18 }}>Currencies and chains<br />money already moves on.</h2>
        </div>
        <p className="lead measure" />
      </div>
      <div className="cov-grid" style={{ marginTop: 56 }}>
        <div>
          <h3 style={{ marginBottom: 18 }}>Local currencies</h3>
          <div className="cov-flags">
            {FLAGS.map(([code, name]) => (
              <span className="cf" key={code}>
                <img src={`https://flagcdn.com/${code}.svg`} alt="" />
                {name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 18 }}>Chains and assets</h3>
          <div className="logo-wall">
            {MARKS.map((m) => (
              <div className="lw" key={m.n}>
                <img src={m.img} alt={m.n} />
                <span>{m.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============ Design partners ============ */
const DESIGN_PARTNERS: string[] = ["Peoples Markets", "Blockfinax"];

export const DesignPartners = () => (
  <section className="partners" aria-label="Design partners">
    <div className="wrap">
      <p className="partners-label">Design partners</p>
      <div
        className="partners-row"
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {DESIGN_PARTNERS.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "var(--muted)",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Wallet ============ */
export const Wallet = () => (
  <section className="band">
    <div className="wrap">
      <div className="prose-grid">
        <div>
          <span className="kicker">Proof</span>
          <h2 style={{ marginTop: 18 }}>The rails, live today.</h2>
        </div>
        <div className="body">
          <p>Open the Rift Wallet. Onboard with Google. Send across borders.</p>
          <div className="hero-cta" style={{ marginTop: 28 }}>
            <a
              className="btn btn-secondary"
              href="https://wallet.riftfi.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the Rift Wallet {I.arrow}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============ Book a call ============ */
export const FinalCTA = () => (
  <section className="cta">
    <div className="wrap">
      <div className="cta-card">
        <span className="cta-eyebrow">Schedule</span>
        <h2>Book a call.</h2>
        <p>15 minutes. We walk you through Rift and answer your questions.</p>
        <div className="cta-btns">
          <a className="btn cta-btn btn-lg" href="mailto:admin@riftfi.xyz">
            Book a call {I.arrow}
          </a>
          <a
            className="tlink cta-tlink"
            href="https://portal.riftfi.xyz/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the docs {I.arrowR}
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ============ Footer ============ */
export const Footer = () => {
  const cols: { h: string; links: [string, string][] }[] = [
    {
      h: "Product",
      links: [
        ["The stack", "/#stack"],
        ["Trust", "/#security"],
        ["Coverage", "/#coverage"],
        ["Rift Wallet", "https://wallet.riftfi.xyz/"],
      ],
    },
    {
      h: "For",
      links: [
        ["Businesses", "/#business"],
        ["Fintechs", "/#institutions"],
      ],
    },
    {
      h: "Developers",
      links: [
        ["Documentation", "https://portal.riftfi.xyz/docs"],
        ["API reference", "https://portal.riftfi.xyz/docs"],
        ["Sandbox", "https://portal.riftfi.xyz/docs"],
      ],
    },
    {
      h: "Company",
      links: [
        ["Blog", "/blog"],
        ["Contact", "mailto:admin@riftfi.xyz"],
      ],
    },
    {
      h: "Legal",
      links: [
        ["Privacy", "#"],
        ["Terms", "#"],
        ["Disclosures", "#"],
      ],
    },
  ];

  return (
    <footer id="company">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Link className="brand" to="/">
              <img className="mark" src="/assets/rift-logo.png" alt="" />
              <span className="wm">Rift</span>
            </Link>
            <p>
              Cross-border payments for African businesses. The rails and data
              banks use to serve, settle, and lend.
            </p>
          </div>
          {cols.map((c) => (
            <div className="foot-col" key={c.h}>
              <h5>{c.h}</h5>
              {c.links.map(([label, href]) => {
                const isExternal =
                  href.startsWith("http") || href.startsWith("mailto:");
                if (!isExternal && href.startsWith("/") && !href.startsWith("/#")) {
                  return (
                    <Link key={label} to={href}>
                      {label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={label}
                    href={href}
                    target={
                      isExternal && !href.startsWith("mailto:")
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span className="disc">
            © {new Date().getUTCFullYear()} Rift Finance. Software only. Money
            services provided by licensed partners. Nairobi.
          </span>
          <div className="socials">
            <a
              href="https://x.com/tryrift"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              {I.x}
            </a>
            <a
              href="https://t.me/+B8abU5EjpTsyMWE8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              {I.tg}
            </a>
            <a
              href="https://portal.riftfi.xyz/docs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Docs"
            >
              {I.book}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
