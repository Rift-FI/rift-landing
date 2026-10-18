/**
 * Rift home. B2B, East African cross-border trade.
 *
 * WHO THIS PAGE IS FOR: Kenyan, Ugandan and Tanzanian importers, exporters
 * and SME traders moving goods across the region, and the finance and ops
 * people behind them. Not consumers. Not crypto. Not remittance senders.
 *
 * WHAT IT SELLS: pay a supplier in another East African country in dollars,
 * settled in minutes, delivered to them in local currency on mobile money.
 * Against a correspondent bank wire that costs 3 to 8 percent and takes days.
 *
 * NOT ON THIS PAGE, ON PURPOSE: netting, liquidity partnerships, capital
 * efficiency, DFIs. That is a real argument but it is an institutional one,
 * and institutions arrive through a deck and a warm introduction, not
 * through this page. Keep it out.
 *
 * RULES:
 *   - Lead with settlement, never with "wallet".
 *   - No hype words. No revolutionise, unlock, empower, seamless, leverage.
 *   - Real numbers over adjectives. Short sentences.
 *   - No staking, yield, trading, NFTs, investing.
 *   - DO NOT NAME A CORRIDOR THAT IS NOT LIVE. See CORRIDORS below.
 *   - Fee numbers are the published ones and a customer can check them
 *     against an invoice. Keep them accurate or take them out.
 */

import { useEffect } from "react";

/**
 * The corridors we actually settle today. This is the claim a customer
 * discovers fastest, and a wrong one costs the relationship. Edit here and
 * it updates everywhere on the page.
 */
const CORRIDORS = "Kenya, Uganda and Tanzania";

/** Published pricing. If these change, change them here. */
const FEE_TRANSFER = "0.5%";
const FEE_CONVERT = "1.0% to 1.5%";

/** The part after tally.so/r/ in the form's share link. */
const TALLY_FORM_ID = "RG7W2d";

const EMAIL = "amschel@riftfi.com";

const Arrow = () => (
  <span className="i-ar" aria-hidden="true">
    →
  </span>
);

// ── Hero ────────────────────────────────────────────────────────────────

export const InstitutionalHero = () => (
  <header className="hero-i" id="top">
    <div className="hero-i-in">
      <h1 className="i-h1 hero-i-h1">
        Pay suppliers across East Africa in <em>minutes</em>.
      </h1>

      <p className="i-lead hero-i-sub">
        Send US dollars to a supplier in {CORRIDORS}, settle in minutes, and
        they take payout in local currency on mobile money.
      </p>

      <div className="hero-i-cta">
        <a className="i-btn i-btn-1" href="#contact">
          Start moving money <Arrow />
        </a>
      </div>
    </div>
  </header>
);

// ── Benefits ────────────────────────────────────────────────────────────

const BENEFITS: { h: string; p: string }[] = [
  {
    h: "Minutes, not days.",
    p: "Your payment settles in US dollar stablecoins the moment you send it. Your supplier has it the same session instead of waiting three days for a correspondent bank to release it.",
  },
  {
    h: `${FEE_CONVERT.split(" to ")[1]}, not 8%.`,
    p: `Transfers cost ${FEE_TRANSFER}. Converting into or out of local currency costs ${FEE_CONVERT}. The same payment through a correspondent bank typically runs 3% to 8% all in, plus a fixed fee at every hop.`,
  },
  {
    h: "Local currency at the other end.",
    p: "Your supplier does not need a dollar account, a bank that holds one, or any knowledge of crypto. They take payout in shillings on M-Pesa, when they want it.",
  },
];

export const Benefits = () => (
  <section className="i-section" id="why" aria-labelledby="why-h">
    <div className="i-wrap">
      <h2 id="why-h" className="sr-only">
        Why Rift
      </h2>
      <div className="bens">
        {BENEFITS.map((b) => (
          <div className="ben" key={b.h}>
            <h3 className="ben-h">{b.h}</h3>
            <p className="ben-p">{b.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── How it works ────────────────────────────────────────────────────────

const STEPS: { h: string; p: string }[] = [
  {
    h: "You send dollars.",
    p: "Pay in from your bank or mobile money. It becomes a US dollar stablecoin on the way in.",
  },
  {
    h: "It settles in minutes.",
    p: "The payment goes straight to your supplier. No correspondent bank, no intermediary taking a cut at each stop.",
  },
  {
    h: "They convert when they need to.",
    p: "Your supplier holds dollars or takes local currency on mobile money. Their choice, their timing.",
  },
];

export const HowItWorks = () => (
  <section className="i-section i-section--wash" id="how" aria-labelledby="how-h">
    <div className="i-wrap">
      <h2 id="how-h" className="i-h2 i-h2--sm who-h">
        How it works.
      </h2>
      <ol className="pts">
        {STEPS.map((st, i) => (
          <li className="pt" key={st.h}>
            <span className="pt-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="pt-h">{st.h}</h3>
              <p className="pt-p">{st.p}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Fees and custody, stated plainly. A customer can check both.
          Licensing is deliberately not claimed here. Add it when it is
          true and specific, it is worth more than any other line. */}
      <p className="trust">
        Fees are published and fixed: {FEE_TRANSFER} to transfer,{" "}
        {FEE_CONVERT} to convert. Your business holds its own keys, so Rift
        cannot move your money. Sphere Ramp Ltd, Nairobi.
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
    <div className="i-slab-outer">
      <section className="i-slab" id="contact" aria-labelledby="contact-h">
        <div className="i-wrap">
          <div className="i-head-c">
            <h2 id="contact-h" className="i-h2 i-h2--inv">
              Start moving money.
            </h2>
            <p className="i-lead i-lead--inv">
              Tell us which corridor you pay into and what it costs you today.
              We will show you the difference.
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
              Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will reply
              the same day.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────

export const InstitutionalFooter = () => (
  <footer className="i-footer">
    <div className="i-footer-in">
      <span className="i-footer-legal">
        © {new Date().getFullYear()} Rift, a product of Sphere Ramp Ltd.
        Nairobi, Kenya.
      </span>
      <div className="i-footer-links">
        <a href="/blog">Journal</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href={`mailto:${EMAIL}`}>Contact</a>
      </div>
    </div>
  </footer>
);
