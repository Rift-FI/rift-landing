/**
 * Rift home. Four sections and a footer, nothing else.
 *
 * WHAT THIS PAGE SELLS: dollar settlement for African trade corridors. We net
 * what cancels out so most dollars never move, and settle the rest in hours.
 *
 * WHO IT IS FOR: people who can fund the residual (liquidity providers, DFIs,
 * banks) and people who move money along the corridor. Nobody else.
 *
 * RULES, learned the hard way:
 *   - No jargon. No VPC, no wallet infrastructure, no ERC anything, no
 *     enclaves. If a trade financier would not say it, it does not go here.
 *   - No diagrams. Say it in a sentence or cut it.
 *   - No feature grid. We sell one thing.
 *   - Plain language, no em dashes.
 *   - Every number on this page must be checkable. If it is not sourced, it
 *     is not here. That is why there are almost none.
 *
 * Contact is a Tally form, so enquiries land somewhere structured instead of
 * in an inbox. Set TALLY_FORM_ID below. Until it is set the page degrades
 * honestly to an email address rather than pretending to collect anything.
 */

import { useEffect } from "react";

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
        Settle dollars across African trade corridors in <em>hours</em>, not
        days.
      </h1>

      <p className="i-lead hero-i-sub">
        Trade runs both ways along a corridor. We cancel what offsets, so you
        fund the difference instead of the whole flow.
      </p>

      <div className="hero-i-cta">
        <a className="i-btn i-btn-1" href="#contact">
          Get in touch <Arrow />
        </a>
      </div>
    </div>
  </header>
);

// ── How it works ────────────────────────────────────────────────────────

const POINTS: { h: string; p: string }[] = [
  {
    h: "Moving money across a border means funding both ends.",
    p: "To pay out on time you need dollars already sitting in the destination, before the money from the other side reaches you. That inventory is working capital doing nothing else. When there is not enough of it you borrow, and the credit lines cost more than the margin on the transfer.",
  },
  {
    h: "Most of that money cancels out.",
    p: "Money owed one way along a corridor is largely matched by money owed the other way. We hold both sides for a short window and settle them against each other, so that portion never needs funding at all.",
  },
  {
    h: "You only fund the difference.",
    p: "What is left settles in stablecoins, which reach the last mile where banks cannot, though you pay a premium for that access. Netting means you buy far fewer of them. Local currency stays where it already works: PAPSS and Pesalink clear shillings and naira, we clear the dollars.",
  },
];

export const HowItWorks = () => (
  <section className="i-section" id="how" aria-labelledby="how-h">
    <div className="i-wrap">
      <h2 id="how-h" className="sr-only">
        How it works
      </h2>
      <ol className="pts">
        {POINTS.map((pt, i) => (
          <li className="pt" key={pt.h}>
            <span className="pt-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="pt-h">{pt.h}</h3>
              <p className="pt-p">{pt.p}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ── Who it is for ───────────────────────────────────────────────────────

export const WhoFor = () => (
  <section className="i-section i-section--wash" id="who" aria-labelledby="who-h">
    <div className="i-wrap">
      <h2 id="who-h" className="i-h2 i-h2--sm who-h">
        Two kinds of people should talk to us.
      </h2>

      <div className="who">
        <div className="who-card">
          <h3>If you hold dollars</h3>
          <p>
            Development finance institutions, banks, and anyone with a mandate
            to put dollars into African trade. Because the netting layer only
            draws on the difference, the same balance sheet clears far more
            trade. We bring the businesses already moving it.
          </p>
          <a className="who-link" href="#contact">
            Partner with us <Arrow />
          </a>
        </div>

        <div className="who-card">
          <h3>If you move money at volume</h3>
          <p>
            Remittance companies, exporters, importers, and the banks and
            payment companies behind them. Instead of pre-funding both ends of
            every corridor, you fund the net. Less trapped float, and less
            reason to draw on an expensive credit line to cover it.
          </p>
          <a className="who-link" href="#contact">
            Move money with us <Arrow />
          </a>
        </div>
      </div>
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
              Tell us about your corridor.
            </h2>
            <p className="i-lead i-lead--inv">
              Where the money goes, roughly how much, and what it costs you
              today. We will come back with what netting does to that.
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
            /* No form configured yet, so say so rather than collect nothing. */
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
