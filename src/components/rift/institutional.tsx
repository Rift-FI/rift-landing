/**
 * Rift home. B2B, East African cross-border trade.
 *
 * WHO IT IS FOR: importers, exporters, clearing and freight agents, and SME
 * traders moving goods between East African countries, plus the finance
 * people behind them. Not consumers. Not crypto.
 *
 * THE ARGUMENT, which the research earns (see docs/positioning.md):
 *   The fee is not the cost. A Kenyan bank caps an outward wire at about
 *   thirty-five dollars, five hundredths of one percent of a fifty thousand
 *   dollar invoice. The cost is the exchange rate, taken twice, because the
 *   payment converts to dollars and back. All in it runs roughly 1.1 to 3.3
 *   percent, and 80 to 95 percent of that is spread, not fees. Nobody tells
 *   the trader what it was. So the product is one disclosed price.
 *
 * WHAT WE NEVER SAY, and these are not stylistic preferences:
 *   - "stablecoin", "crypto", "blockchain", "wallet", "non-custodial".
 *     The customer does not care and the words cost trust.
 *   - "no dollars needed". Untrue. Every approach touches the dollar
 *     somewhere; ours touches it on the full notional, briefly, as a token
 *     rather than a nostro balance. We remove the dollar ACCOUNT, the
 *     correspondent bank, the three days and the hidden spread. Not the
 *     dollar.
 *   - 8 percent, or any figure derived from remittance pricing. Those are
 *     measured on a two hundred dollar consumer transfer and putting them
 *     next to a commercial invoice is a category error a CFO will catch.
 *   - any corridor that is not live. See CORRIDORS.
 *   - any licensing status we do not hold.
 *
 * DESIGN: Instrument Serif display over Public Sans body, figures in
 * JetBrains Mono. Warm paper, near-black ink, one deep teal. The reference
 * is a serious trade publication, not a fintech template, because the reader
 * has been pitched by crypto companies and has learned to distrust the look.
 */

import { useEffect } from "react";

/** Corridors we actually settle today. The claim a customer tests first. */
const CORRIDORS = ["Kenya", "Uganda", "Tanzania", "Rwanda"];

/** Published, and a customer can check them against an invoice. */
const FEE_ALLIN = "1%";

const TALLY_FORM_ID = "RG7W2d";
const EMAIL = "amschel@riftfi.com";

const Arrow = () => (
  <span className="ar" aria-hidden="true">
    →
  </span>
);

// ── Hero ────────────────────────────────────────────────────────────────

export const InstitutionalHero = () => (
  <header className="hero" id="top">
    <div className="wrap hero-in">
      <p className="eyebrow">Cross-border payments for East African trade</p>

      <h1 className="h1">
        The fee is not the cost.
        <br />
        <em>The spread is.</em>
      </h1>

      <p className="lede">
        Your bank charges about thirty-five dollars to send money to Kampala,
        then takes one to three percent on the exchange rate, twice, which
        never appears on the statement. We quote one price before you send.
      </p>

      <div className="cta-row">
        <a className="btn btn-1" href="#contact">
          Get a quote <Arrow />
        </a>
        <a className="btn btn-2" href="#how">
          How it works
        </a>
      </div>
    </div>

    {/* The argument as a receipt. Illustrative, labelled as such. */}
    <div className="wrap">
      <div className="receipt">
        <div className="receipt-head">
          <span>Paying a supplier in Kampala</span>
          <span className="receipt-amt">$50,000</span>
        </div>
        <ul className="receipt-rows">
          <li>
            <span className="rr-label">Bank wire fee</span>
            <span className="rr-bar"><i style={{ width: "1%" }} /></span>
            <span className="rr-val">$35</span>
          </li>
          <li className="is-hidden">
            <span className="rr-label">
              Exchange rate, shillings to dollars
              <em>not shown on your statement</em>
            </span>
            <span className="rr-bar"><i style={{ width: "46%" }} /></span>
            <span className="rr-val">$700</span>
          </li>
          <li className="is-hidden">
            <span className="rr-label">
              Exchange rate, dollars to shillings
              <em>not shown either</em>
            </span>
            <span className="rr-bar"><i style={{ width: "42%" }} /></span>
            <span className="rr-val">$640</span>
          </li>
        </ul>
        <div className="receipt-foot">
          <span>What it actually cost</span>
          <b>$1,375</b>
        </div>
        <p className="receipt-note">
          Illustrative, on a typical corridor. Your figures depend on the day
          and the bank. The point is which line you were shown.
        </p>
      </div>
    </div>
  </header>
);

// ── What we do ──────────────────────────────────────────────────────────

const POINTS: { h: string; p: string }[] = [
  {
    h: "One price, before you send.",
    p: "You see the full cost of the payment, exchange rate included, while you are still deciding. No spread buried in the rate, no fees discovered on the statement a week later.",
  },
  {
    h: "Your supplier is paid today.",
    p: "Not three to five days. The money reaches them the same session, in their own currency, on the mobile money or bank account they already use. They need nothing new.",
  },
  {
    h: "And when you buy from outside Africa.",
    p: "Paying a supplier in China or the Gulf is a different problem, because those dollars genuinely have to be found rather than netted. Same account, same desk, we handle both.",
  },
];

export const Benefits = () => (
  <section className="sec sec-white" id="what" aria-labelledby="what-h">
    <div className="wrap">
      <h2 id="what-h" className="sr-only">
        What Rift does
      </h2>
      <div className="points">
        {POINTS.map((pt, i) => (
          <article className="point" key={pt.h}>
            <span className="point-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="point-h">{pt.h}</h3>
            <p className="point-p">{pt.p}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ── How it works ────────────────────────────────────────────────────────

const STEPS: { h: string; p: string }[] = [
  {
    h: "Tell us where it is going.",
    p: "The country, the amount, who is receiving it. We come back with one number, which is what the payment will cost you in total.",
  },
  {
    h: "Pay in from your own account.",
    p: "Bank transfer or mobile money, in shillings. Nothing to install, no account to fund in advance, no foreign currency to find first.",
  },
  {
    h: "They are paid in their currency.",
    p: "Mobile money or bank, whichever they already use. You get a record of what was sent, what was received, and what it cost.",
  },
];

export const HowItWorks = () => (
  <section className="sec sec-paper" id="how" aria-labelledby="how-h">
    <div className="wrap">
      <h2 id="how-h" className="h2 h2-c">
        How it works
      </h2>
      <ol className="steps">
        {STEPS.map((st, i) => (
          <li className="step" key={st.h}>
            <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="step-h">{st.h}</h3>
              <p className="step-p">{st.p}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="corridors">
        <span className="corridors-l">Live today</span>
        <ul>
          {CORRIDORS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <span className="corridors-r">
          Both directions, between any two.
        </span>
      </div>
    </div>
  </section>
);

// ── Who it is for ───────────────────────────────────────────────────────

const WHO: { h: string; p: string }[] = [
  {
    h: "Importers and exporters",
    p: "Paying for goods across the border, or being paid for them. Grain, cement, produce, hardware, fast-moving goods.",
  },
  {
    h: "Clearing and freight agents",
    p: "Settling with counterparts along the Northern and Central corridors. Many payments, several currencies, every week.",
  },
  {
    h: "Manufacturers and distributors",
    p: "Buying inputs regionally and finished goods from outside Africa, on the same account.",
  },
];

export const WhoFor = () => (
  <section className="sec sec-white" id="who" aria-labelledby="who-h">
    <div className="wrap">
      <h2 id="who-h" className="h2 h2-c">
        Who this is for
      </h2>
      <div className="who">
        {WHO.map((w) => (
          <div className="who-card" key={w.h}>
            <h3>{w.h}</h3>
            <p>{w.p}</p>
          </div>
        ))}
      </div>
      <p className="trust">
        All-in pricing from {FEE_ALLIN}, quoted before you send. Your business
        keeps control of its own funds. Sphere Ramp Ltd, Nairobi.
      </p>
    </div>
  </section>
);

// ── Contact ─────────────────────────────────────────────────────────────

export const Contact = () => {
  useEffect(() => {
    if (!TALLY_FORM_ID) return;
    const SRC = "https://tally.so/widgets/embed.js";
    const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
    if (document.querySelector(`script[src="${SRC}"]`)) {
      w.Tally?.loadEmbeds();
      return;
    }
    const sc = document.createElement("script");
    sc.src = SRC;
    sc.async = true;
    document.body.appendChild(sc);
  }, []);

  return (
    <section className="sec sec-ink" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="contact-head">
          <h2 id="contact-h" className="h2 h2-inv">
            Tell us about one payment.
          </h2>
          <p className="lede lede-inv">
            Where it goes, how much, and what you pay today. We will come back
            with the number.
          </p>
        </div>

        {TALLY_FORM_ID ? (
          <div className="tally">
            <iframe
              data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
              loading="lazy"
              width="100%"
              height={320}
              frameBorder={0}
              title="Contact Rift"
            />
          </div>
        ) : (
          <p className="tally-fallback">
            Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will reply the
            same day.
          </p>
        )}
      </div>
    </section>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────

export const InstitutionalFooter = () => (
  <footer className="foot">
    <div className="wrap foot-in">
      <span className="foot-legal">
        © {new Date().getFullYear()} Rift, a product of Sphere Ramp Ltd.
        Nairobi, Kenya.
      </span>
      <div className="foot-links">
        <a href="/blog">Journal</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href={`mailto:${EMAIL}`}>Contact</a>
      </div>
    </div>
  </footer>
);
