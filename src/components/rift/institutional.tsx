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

import { useState } from "react";
import { useInView, useCountUp } from "./useInView";

/** Corridors we actually settle today. The claim a customer tests first. */
const CORRIDORS = ["Kenya", "Uganda", "Tanzania", "Rwanda"];

/** Published, and a customer can check them against an invoice. */
const FEE_ALLIN = "1%";

/**
 * Probe endpoint form. This is the PUBLIC access key and is meant to ship in
 * client code, the same way a Stripe publishable key is. The account API key
 * (probe_...) is a password, never goes near this file, and is only used from
 * a shell to administer the form.
 *
 * Form: "Rift quote request", id 9b9bc5cc-2651-4575-9eda-0d87911c6974.
 * Submissions are stored immediately, but notification email to
 * amschel@riftfi.com only starts once the recipient clicks Probe's
 * verification link. Until then, read them in the Probe dashboard.
 *
 * Origin allowlist is enforced server-side, so this key is useless from any
 * other site. Add a domain with endpoint.update before launching on it.
 */
const PROBE_ENDPOINT = "https://probe.riftfi.com/submit";
const PROBE_ACCESS_KEY = "NV8BZinZsJhk6wXwyiS8ZgaTyHCpkfMewSbA";

const EMAIL = "amschel@riftfi.com";

const Arrow = () => (
  <span className="ar" aria-hidden="true">
    →
  </span>
);

// ── Hero ────────────────────────────────────────────────────────────────

export const InstitutionalHero = () => (
  <header className="hero" id="top">
    <div className="hero-bg" aria-hidden="true" />
    <div className="wrap hero-in">
      {/* Each child gets a staggered CSS entrance, 60ms apart. CSS rather
          than JS so it keeps its frames while fonts are still loading. */}
      <h1 className="h1 rise" style={{ "--d": "0ms" } as React.CSSProperties}>
        Cross-border payments for East African trade.
      </h1>

      <p className="h1-sub rise" style={{ "--d": "80ms" } as React.CSSProperties}>
        The fee is not the cost. <em>The spread is.</em>
      </p>

      <p className="lede rise" style={{ "--d": "160ms" } as React.CSSProperties}>
        Your bank charges about thirty-five dollars to send money to Kampala,
        then takes one to three percent on the exchange rate, twice, which
        never appears on the statement. We quote one price before you send.
      </p>

      <div className="cta-row rise" style={{ "--d": "240ms" } as React.CSSProperties}>
        <a className="btn btn-1" href="#contact">
          Get a quote <Arrow />
        </a>
        <a className="btn btn-2" href="#how">
          How it works
        </a>
      </div>
    </div>

    <div className="wrap">
      <Receipt />
    </div>
  </header>
);

/**
 * The argument as the document the trader never receives.
 *
 * The two hidden rows animate wider than the fee, and the numbers count, so
 * the reader watches the real cost arrive rather than reading a claim about
 * it. It runs once, on scroll-in. Figures are illustrative and the card says
 * so underneath.
 */
const ROWS = [
  { label: "Bank wire fee", note: "", value: 35, pct: 2, hidden: false },
  { label: "Exchange rate, shillings to dollars", note: "not shown on your statement", value: 700, pct: 51, hidden: true },
  { label: "Exchange rate, dollars to shillings", note: "not shown either", value: 640, pct: 47, hidden: true },
];

const Receipt = () => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const total = useCountUp(1375, inView, 1100);

  return (
    <div className={`receipt rise${inView ? " is-in" : ""}`} ref={ref} style={{ "--d": "320ms" } as React.CSSProperties}>
      <div className="receipt-head">
        <span>Paying a supplier in Kampala</span>
        <span className="receipt-amt">$50,000</span>
      </div>

      <ul className="receipt-rows">
        {ROWS.map((r, i) => (
          <li key={r.label} className={r.hidden ? "is-hidden" : ""}>
            <span className="rr-label">
              {r.label}
              {r.note ? <em>{r.note}</em> : null}
            </span>
            <span className="rr-bar">
              <i
                style={{
                  transform: inView ? `scaleX(${r.pct / 100})` : "scaleX(0)",
                  transitionDelay: `${420 + i * 110}ms`,
                }}
              />
            </span>
            <span className="rr-val">${r.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="receipt-foot">
        <span>What it actually cost</span>
        <b>${total.toLocaleString()}</b>
      </div>
      <p className="receipt-note">
        Illustrative, on a typical corridor. Your figures depend on the day and
        the bank. The point is which line you were shown.
      </p>
    </div>
  );
};

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

export const Benefits = () => {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
  <section className="sec sec-white" id="what" aria-labelledby="what-h">
    <div className="wrap">
      <h2 id="what-h" className="sr-only">
        What Rift does
      </h2>
      <div className={`points${inView ? " is-in" : ""}`} ref={ref}>
        {POINTS.map((pt, i) => (
          <article className="point" key={pt.h} style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
            <span className="point-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="point-h">{pt.h}</h3>
            <p className="point-p">{pt.p}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

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

export const HowItWorks = () => {
  const [ref, inView] = useInView<HTMLOListElement>();
  return (
  <section className="sec sec-paper" id="how" aria-labelledby="how-h">
    <div className="wrap">
      <h2 id="how-h" className="h2 h2-c">
        How it works
      </h2>
      <ol className={`steps${inView ? " is-in" : ""}`} ref={ref}>
        {STEPS.map((st, i) => (
          <li className="step" key={st.h} style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
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
};

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

export const WhoFor = () => {
  const [whoRef, whoIn] = useInView<HTMLDivElement>();
  return (
  <section className="sec sec-white" id="who" aria-labelledby="who-h">
    <div className="wrap">
      <h2 id="who-h" className="h2 h2-c">
        Who this is for
      </h2>
      <div className={`who${whoIn ? " is-in" : ""}`} ref={whoRef}>
        {WHO.map((w, i) => (
          <div className="who-card" key={w.h} style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
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
};

// ── Contact ─────────────────────────────────────────────────────────────

const PAY_INTO = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Outside Africa",
  "Several of these",
];

const MONTHLY = [
  "Under $10,000",
  "$10,000 to $50,000",
  "$50,000 to $250,000",
  "$250,000 to $1m",
  "Over $1m",
];

const PAY_TODAY = [
  "Bank wire",
  "Forex bureau",
  "Mobile money",
  "An agent or broker",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";

export const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = { access_key: PROBE_ACCESS_KEY };
    fd.forEach((v, k) => {
      payload[k] = typeof v === "string" ? v : "";
    });
    payload.subject = `Quote request, ${payload.company || "unknown company"}`;
    payload.from_name = payload.name || "";

    try {
      const res = await fetch(PROBE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.success) {
        setStatus("sent");
        return;
      }
      /* Surface the real reason rather than a generic failure, so a broken
         allowlist or an expired key is diagnosable from the browser. */
      setError(body.message || `Something went wrong (${res.status}).`);
      setStatus("error");
    } catch {
      setError("Could not reach us. Check your connection, or email instead.");
      setStatus("error");
    }
  };

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

        {status === "sent" ? (
          <div className="form-done" role="status">
            <p className="form-done-h">Thank you, that is with us.</p>
            <p className="form-done-p">
              We read every one of these. If you told us about a corridor we
              will come back with what it would cost on our side, usually
              within a day.
            </p>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate={false}>
            <div className="form-row">
              <label className="field">
                <span>Your name</span>
                <input name="name" type="text" required autoComplete="name" />
              </label>
              <label className="field">
                <span>Work email</span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
            </div>

            <label className="field">
              <span>Company</span>
              <input name="company" type="text" required autoComplete="organization" />
            </label>

            <div className="form-row">
              <label className="field">
                <span>Where are you paying?</span>
                <select name="paying_into" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {PAY_INTO.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Roughly how much a month?</span>
                <select name="monthly_volume" required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {MONTHLY.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>How do you pay today?</span>
              <select name="pay_today" required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {PAY_TODAY.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>
                Anything else <i>optional</i>
              </span>
              <textarea name="notes" rows={3} />
            </label>

            {/* Probe's honeypot. Hidden from people, tempting to bots. */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="honey"
            />

            <div className="form-foot">
              <button className="btn btn-1" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending" : "Send"}
                {status === "sending" ? null : <Arrow />}
              </button>
              <p className="form-note">
                Or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            </div>

            <p className="form-err" role="alert">
              {status === "error" ? error : ""}
            </p>
          </form>
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
