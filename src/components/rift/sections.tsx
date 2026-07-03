import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { I } from "../../lib/rift-data";

/* ============ Problem section (directly under hero) ============ */
export const Problem = () => (
  <section className="band" id="problem">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">01</span> The gap
          </span>
          <h2 style={{ marginTop: 18 }}>
            Billions are moving.
            <br />
            Your institution can't see it.
          </h2>
        </div>
        <p className="lead measure">
          Cross-border payments between African businesses increasingly
          run on stablecoins, outside the banking system. Banks lose
          the transaction fees, tie up capital in pre-funded accounts
          overseas, and can't lend to businesses whose cash flow they
          can't see. The flow isn't coming back to the old rails. The
          rails have to come to the flow.
        </p>
      </div>
    </div>
  </section>
);

/* ============ What your institution gets (bank pitch) ============ */

const INST_BENEFITS: { h: string; d: string }[] = [
  {
    h: "Serve clients instantly.",
    d: "Cross-border payments in minutes, not days.",
  },
  {
    h: "New revenue.",
    d: "Transaction fees on flows that currently bypass you.",
  },
  {
    h: "Freed capital.",
    d: "Cut the cash locked away overseas to handle international payments.",
  },
  {
    h: "Lend with visibility.",
    d: "Real-time cash flow on businesses you could never underwrite before.",
  },
];

export const InstitutionBenefits = () => (
  <section className="band" id="banks">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">02</span> For banks and fintechs
          </span>
          <h2 style={{ marginTop: 18 }}>
            What your institution
            <br />
            gets.
          </h2>
        </div>
        <p className="lead measure">
          African businesses are moving billions across borders in
          stablecoins because it's cheaper and faster, but that
          transaction history sits outside the banking system,
          invisible to the institutions that could lend against it.
          Rift's wallet and liquidity infrastructure plugs your
          institution directly into that flow. You can now help your
          clients move money instantly, earn entirely new transaction
          fees, free up the cash your bank usually has to lock away
          overseas to handle international payments, and gain the
          real-time visibility you need to safely lend to customers
          whose repayment behavior you can finally see.
        </p>
      </div>
      <p
        style={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          marginTop: 32,
          color: "var(--ink)",
        }}
      >
        The money is already moving. We make sure it moves through you.
      </p>
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
                {b.h}
              </strong>{" "}
              {b.d}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Product / trust (compliance lives here) ============ */

const CAPABILITIES: string[] = [
  "Wallets with passkey and Google auth, KYC'd onboarding built in",
  "Key generation and transaction signing inside secure enclaves, non-custodial by architecture",
  "In-country deployment on any enclave-supporting server, shipped as a signed, verifiable build",
  "Fiat on-ramps and off-ramps",
  "Local-currency stablecoin issuance support",
  "Treasury and money movement: stablecoin to stablecoin, to local currency, across chains",
  "One API for all of it",
];

export const OneStack = () => (
  <section className="band" id="stack">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">03</span> The stack
          </span>
          <h2 style={{ marginTop: 18 }}>
            One stack, built
            <br />
            for the regulated era.
          </h2>
        </div>
        <p className="lead measure">
          Everything an institution needs to capture the flow, and
          everything its risk team needs to say yes.
        </p>
      </div>
      <div
        className="list-grid"
        style={{ marginTop: 40 }}
      >
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c} className="list-row">
            <span className="lr-n">{`0${i + 1}`}</span>
            <div>
              <div className="lr-h">{c}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div
        style={{
          marginTop: 48,
          textAlign: "center",
          fontFamily: "Archivo, sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: "var(--muted)",
          fontStyle: "italic",
        }}
      >
        Compliant by architecture, not by promise.
      </div>
    </div>
  </section>
);

/* ============ Data + credit story ============ */
export const DataCredit = () => (
  <section className="band" id="data">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">04</span> Credit and data
          </span>
          <h2 style={{ marginTop: 18 }}>
            Every payment builds
            <br />
            a financial identity.
          </h2>
        </div>
        <p className="lead measure">
          Businesses on Rift don't just move money, they build verified
          payment histories they can choose to share with their bank.
          For the business, that's the credit reputation informal
          channels never gave them. For your institution, it's
          underwriting data on customers who were invisible before.
          Consent-based, both sides win.
        </p>
      </div>
    </div>
  </section>
);

/* ============ Vision section ============ */
export const Vision = () => (
  <section className="band" id="vision">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">05</span> Where this goes
          </span>
          <h2 style={{ marginTop: 18 }}>
            The clearing layer
            <br />
            Africa never built.
          </h2>
        </div>
        <p className="lead measure">
          The wallet layer is the door into the bigger thing. Once
          institutions in different countries run on Rift, we connect
          them, so a bank in Kenya and one in Tanzania settle in local
          currency, flows netting against each other, with only the
          small residual ever touching dollars. Cross-border payments
          in Africa detour through scarce dollars not because they have
          to, but because nobody built the clearing layer. That is the
          company we are building.
        </p>
      </div>
    </div>
  </section>
);

/* ============ Design partners (honest replacement for Partners) ============ */

/**
 * Only real names go here. Per the positioning spec: no invented logos,
 * no "trusted by 100+ institutions", no volume numbers. With a thin
 * list we frame as "design partners" rather than pretending to be at
 * scale we're not.
 */
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
      <p
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 13,
          color: "var(--muted)",
        }}
      >
        Currently onboarding design partners across East Africa.
      </p>
    </div>
  </section>
);

/* ============ Wallet section (proof the rails work) ============ */
export const Wallet = () => (
  <section className="band">
    <div className="wrap">
      <div className="prose-grid">
        <div>
          <span className="kicker">
            <span className="n">06</span> Proof
          </span>
          <h2 style={{ marginTop: 18 }}>See the rails in action.</h2>
        </div>
        <div className="body">
          <p>
            The Rift Wallet is a full consumer wallet we built on the
            same APIs we give you. It onboards with Google, email, or
            phone, no seed phrase. It moves real funds across borders
            today. Proof the rails are ready.
          </p>
          <div className="hero-cta" style={{ marginTop: 28 }}>
            <a
              className="btn btn-secondary"
              href="https://wallet.riftfi.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the Rift Wallet {I.arrow}
            </a>
            <a
              className="tlink"
              href="https://wallet.riftfi.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              wallet.riftfi.com {I.arrowR}
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
        <h2>Book a call with us</h2>
        <p>
          Tell us what your institution wants to capture from the flow.
          We will walk you through Rift, answer your questions, and
          show you how fast you can go live.
        </p>
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
        ["Data and credit", "/#data"],
        ["Rift Wallet", "https://wallet.riftfi.xyz/"],
      ],
    },
    {
      h: "For",
      links: [
        ["Banks and fintechs", "/#banks"],
        ["Businesses", "/businesses"],
        ["Where this goes", "/#vision"],
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
              Rift powers businesses moving money across African
              borders, and gives banks the rails and the data to
              finally see, serve, and lend to them.
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
            © {new Date().getUTCFullYear()} Rift Finance. Rift provides
            infrastructure software and does not issue stablecoins or
            hold customer funds. Stablecoin and money-movement services
            are provided by licensed partners. Nairobi.
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
