import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APP_URL, CONTACT_EMAIL, CONTACT_HREF, DOCS_URL, YIELD_URL } from "../../lib/links";
import { CORRIDORS, fmt, useRates } from "./rates";
import { Roller } from "./Roller";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Landing, v2 (2026-11).
 *
 * One idea, used three times: money is a number, and the number moves.
 * The hero is a working quote (type an amount, pick a country, the payout
 * rolls into place from the live rates feed). The rates table uses the
 * same digits. Rift Wallets shows the one thing an integrator needs to see:
 * a send call that waits for the customer's passkey.
 *
 * Copy rule: every sentence is true today. Yield is invite-only and lives at
 * lp.riftfi.com. Rails are named only where we know them.
 */

const Arrow = () => (
  <svg className="rl-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* ── HERO: the quote ───────────────────────────────────────────────── */

const DEMO_AMOUNT = "80";

const Quote = () => {
  const { rates, live } = useRates();
  const reduced = useReducedMotion();
  const [amount, setAmount] = useState(reduced ? DEMO_AMOUNT : "");
  const [idx, setIdx] = useState(0);
  const touched = useRef(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const segRef = useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const c = CORRIDORS[idx];
  const r = rates[c.currency];
  const num = parseFloat(amount) || 0;
  const receive = num * r.offramp;
  const over = receive > r.perTransactionMax;

  const stop = useCallback(() => {
    touched.current = true;
  }, []);

  // Intro: type the amount once, then step through each corridor a single
  // time. Stops for good the moment the visitor touches the card; pauses
  // while the card is off screen or the tab is hidden.
  useEffect(() => {
    if (reduced) {
      setAmount((a) => a || DEMO_AMOUNT);
      return;
    }
    const timers: number[] = [];
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (cardRef.current) io.observe(cardRef.current);

    DEMO_AMOUNT.split("").forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          if (!touched.current) setAmount(DEMO_AMOUNT.slice(0, i + 1));
        }, 900 + i * 140)
      );
    });

    let step = 0;
    const tick = () => {
      if (touched.current) return;
      if (!visible || document.hidden) {
        timers.push(window.setTimeout(tick, 600));
        return;
      }
      step += 1;
      setIdx(step % CORRIDORS.length);
      if (step < CORRIDORS.length) timers.push(window.setTimeout(tick, 2600));
    };
    timers.push(window.setTimeout(tick, 900 + DEMO_AMOUNT.length * 140 + 2400));

    return () => {
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, [reduced]);

  // Segmented control indicator: measured, then moved with transform only.
  useLayoutEffect(() => {
    const seg = segRef.current;
    if (!seg) return;
    const measure = () => {
      const b = seg.querySelectorAll<HTMLButtonElement>("button")[idx];
      if (b) setPill({ x: b.offsetLeft, w: b.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(seg);
    return () => ro.disconnect();
  }, [idx]);

  const onAmount = (v: string) => {
    stop();
    let s = v.replace(/[^\d.]/g, "");
    const dot = s.indexOf(".");
    if (dot !== -1) s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, "").slice(0, 2);
    const [int, dec] = s.split(".");
    s = int.replace(/^0+(?=\d)/, "").slice(0, 7) + (dec !== undefined ? "." + dec : "");
    setAmount(s);
  };

  const onSegKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    stop();
    const next = (idx + (e.key === "ArrowRight" ? 1 : CORRIDORS.length - 1)) % CORRIDORS.length;
    setIdx(next);
    segRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  const rails = c.rails ? c.rails.join(", ").replace(/, ([^,]*)$/, " and $1") : null;

  return (
    <div className="rl-quote" ref={cardRef} onPointerDown={stop}>
      <div className="rl-q-row">
        <label className="rl-label" htmlFor="rl-amount">
          You send
        </label>
        <div className="rl-q-amt" style={{ ["--len" as string]: Math.max((amount || "0").length, 4), ["--rsv" as string]: "112px" }}>
          <div className="rl-q-field">
            <Roller text={amount || "0"} className={"rl-q-big" + (amount ? "" : " is-empty")} />
            <input
              id="rl-amount"
              className="rl-q-input"
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              value={amount}
              onChange={(e) => onAmount(e.target.value)}
              onFocus={stop}
              aria-describedby="rl-q-out"
            />
          </div>
          <span className="rl-token">
            <img src="/assets/logos/usdc.svg" alt="" width="20" height="20" />
            USDC
          </span>
        </div>
      </div>

      <div className="rl-q-row">
        <span className="rl-label" id="rl-to">
          To
        </span>
        <div className="rl-seg" ref={segRef} role="radiogroup" aria-labelledby="rl-to" onKeyDown={onSegKey}>
          {pill && (
            <span
              className="rl-seg-pill"
              aria-hidden="true"
              style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
            />
          )}
          {CORRIDORS.map((k, i) => (
            <button
              key={k.cc}
              type="button"
              role="radio"
              aria-checked={i === idx}
              aria-label={k.country}
              tabIndex={i === idx ? 0 : -1}
              className={i === idx ? "is-on" : ""}
              onClick={() => {
                stop();
                setIdx(i);
              }}
            >
              {k.cc}
            </button>
          ))}
        </div>
      </div>

      <div className="rl-q-row rl-q-out" id="rl-q-out">
        <span className="rl-label">They receive</span>
        <div className="rl-q-amt" style={{ ["--len" as string]: Math.max(fmt(receive, r.decimals).length, 4), ["--rsv" as string]: "60px" }}>
          <Roller text={fmt(receive, r.decimals)} className="rl-q-big" />
          <span className="rl-q-cur" key={c.currency}>
            {c.currency}
          </span>
        </div>
        <p className={"rl-q-meta" + (over ? " is-warn" : "")} key={c.cc + (over ? "w" : "")}>
          {over
            ? `Above the ${r.symbol} ${fmt(r.perTransactionMax, 0)} limit per transfer.`
            : rails
              ? `${c.country} · ${rails}`
              : `${c.country} · ${c.currencyName}`}
        </p>
      </div>

      <div className="rl-q-foot">
        <span className="rl-q-rate">
          1 USDC = <Roller text={fmt(r.offramp, 2)} /> {c.currency}
          <span className={"rl-q-live" + (live ? " is-live" : "")}>{live ? "Live rate" : "Indicative"}</span>
        </span>
        <a className="rl-btn rl-btn-1 rl-btn-block" href={APP_URL}>
          Send in the app <Arrow />
        </a>
      </div>
    </div>
  );
};

const Hero = () => (
  <header className="rl-hero" id="top">
    <div className="rl-wrap rl-hero-grid">
      <div className="rl-hero-copy">
        <h1 className="rl-h1">
          {["Send money", "across Africa", "and the world."].map((t, i) => (
            <span className="rl-line" key={t}>
              <span style={{ ["--d" as string]: `${i * 70}ms` }}>{t}</span>{" "}
            </span>
          ))}
        </h1>
        <p className="rl-lede rl-in" style={{ ["--d" as string]: "220ms" }}>
          Pay M-Pesa and bank accounts from one wallet. Buy and sell USDC with
          local money.
        </p>
        <div className="rl-ctas rl-in" style={{ ["--d" as string]: "300ms" }}>
          <a className="rl-btn rl-btn-1" href={APP_URL}>
            Open app <Arrow />
          </a>
          <a className="rl-btn rl-btn-ghost" href="#wallets">
            Rift Wallets for institutions
          </a>
        </div>
      </div>
      <div className="rl-in rl-in-card" style={{ ["--d" as string]: "160ms" }}>
        <Quote />
      </div>
    </div>
  </header>
);

/* ── RATES ─────────────────────────────────────────────────────────── */

const Rates = () => {
  const { rates, live, updatedAt } = useRates();
  const time = updatedAt
    ? updatedAt.toLocaleTimeString("en-GB", { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit" }) + " EAT"
    : "";
  return (
    <section className="rl-sec" id="payments" aria-labelledby="payments-h">
      <div className="rl-wrap rl-split">
        <div className="rl-head">
          <p className="rl-eyebrow">Payments</p>
          <h2 className="rl-h2" id="payments-h">
            Six countries. One balance.
          </h2>
          <p className="rl-sub">
            Hold USDC, pay out in local currency. Every rate here is all-in,
            per 1 USDC.
          </p>
          <a className="rl-tlink" href={APP_URL}>
            Send a payment <Arrow />
          </a>
        </div>

        <div className="rl-table" role="table" aria-label="Payout rates per 1 USDC">
          <div className="rl-tr rl-th" role="row">
            <span role="columnheader">Country</span>
            <span role="columnheader" className="rl-c-rails">
              Payout
            </span>
            <span role="columnheader" className="rl-c-rate">
              1 USDC pays out
            </span>
          </div>
          {CORRIDORS.map((c) => (
            <div className="rl-tr" role="row" key={c.cc}>
              <span role="cell" className="rl-c-country">
                <span className="rl-cc">{c.cc}</span>
                <span>
                  <span className="rl-c-name">{c.country}</span>
                  <span className="rl-c-cur">{c.currencyName}</span>
                </span>
              </span>
              <span role="cell" className="rl-c-rails">
                {c.rails ? c.rails.map((x) => <span className="rl-chip" key={x}>{x}</span>) : <span className="rl-c-dim">Local currency</span>}
              </span>
              <span role="cell" className="rl-c-rate">
                <Roller text={fmt(rates[c.currency].offramp, 2)} />
                <span className="rl-c-code">{c.currency}</span>
              </span>
            </div>
          ))}
          <p className="rl-table-foot">
            <span className={"rl-q-live" + (live ? " is-live" : "")}>{live ? "Live" : "Indicative"}</span>
            <span>{live ? `Updated ${time}` : "Live rates load from our rates feed."}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── RIFT WALLETS ──────────────────────────────────────────────────── */

// 0 idle · 1 response came back · 2 customer is approving · 3 approved
type Step = 0 | 1 | 2 | 3;

const useApprovalSequence = () => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<Step>(reduced ? 3 : 0);
  const timers = useRef<number[]>([]);

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    if (reduced) {
      setStep(3);
      return;
    }
    setStep(0);
    const at = (ms: number, s: Step) => timers.current.push(window.setTimeout(() => setStep(s), ms));
    at(450, 1);
    at(1500, 2);
    at(2500, 3);
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    const t = timers.current;
    return () => {
      io.disconnect();
      t.forEach(clearTimeout);
    };
  }, [play]);

  return { ref, step, play };
};

const Code = ({ step }: { step: Step }) => (
  <div className="rl-code">
    <div className="rl-code-bar">
      <span>send.ts</span>
      <span className="rl-code-pkg">@rift-finance/wallet</span>
    </div>
    <pre>
      <code>
        <span className="k">const</span> res = <span className="k">await</span> rift.transactions.<span className="f">send</span>({"({\n"}
        {"  "}to, value: <span className="s">"250"</span>, token: <span className="s">"USDC"</span>, chain: <span className="s">"BASE"</span>,{"\n"}
        {"});\n\n"}
        <span className="k">if</span> (<span className="f">isApprovalRequired</span>(res)) {"{\n"}
        {"  "}<span className="c">// Nothing moves until the customer approves.</span>{"\n"}
        {"  "}<span className="k">return</span> res.approvalUrl;{"\n"}
        {"}"}
      </code>
    </pre>
    <div className="rl-code-out" aria-live="polite">
      <span className={"rl-code-st" + (step >= 1 ? " is-on" : "")} data-s={step >= 3 ? "ok" : "wait"}>
        <span className="rl-swap" key={step >= 3 ? "ok" : step >= 1 ? "wait" : "idle"}>
          {step >= 3 ? "200  Approved with passkey · sent" : step >= 1 ? "202  APPROVAL_REQUIRED" : " "}
        </span>
      </span>
    </div>
  </div>
);

const KeyGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="5.5" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 8H15M12.5 8v2.5M14.5 8v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path className="rl-check" d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" pathLength={1} />
  </svg>
);

const Approve = ({ step }: { step: Step }) => (
  <div className={"rl-approve" + (step >= 1 ? " is-up" : "")} data-step={step} aria-hidden="true">
    <span className="rl-label">Approve payment</span>
    <div className="rl-ap-amt">
      250.00 <span>USDC</span>
    </div>
    <dl className="rl-ap-dl">
      <div>
        <dt>To</dt>
        <dd>0x8f3a…c21a</dd>
      </div>
      <div>
        <dt>Network</dt>
        <dd>Base</dd>
      </div>
      <div>
        <dt>Gas</dt>
        <dd>Sponsored</dd>
      </div>
    </dl>
    <div className={"rl-ap-btn" + (step >= 2 ? " is-press" : "") + (step >= 3 ? " is-done" : "")}>
      <span className="rl-ap-l rl-ap-l1">
        <KeyGlyph /> Approve with passkey
      </span>
      {/* Same label in ink, inside the mint fill: the clip reveals it exactly
          where the fill has reached, so the text never sits low-contrast. */}
      <span className="rl-ap-fill">
        <span className="rl-ap-l rl-ap-l1">
          <KeyGlyph /> Approve with passkey
        </span>
      </span>
      <span className="rl-ap-l rl-ap-l2">
        <Check /> Approved
      </span>
    </div>
    <span className="rl-ap-note">Signed on the customer's device. Rift never holds the key.</span>
  </div>
);

const OS_PARTS = [
  { h: "Passkey wallets", p: "Smart wallets your users unlock with a passkey. No seed phrases, and Rift never holds the keys." },
  { h: "Payments APIs", p: "Send, receive and convert between local money and USDC from your own product." },
  { h: "Approvals", p: "Decide who signs off on what before any money moves." },
  { h: "Dashboard", p: "Every user wallet, payment and approval in one view." },
];

const Wallets = () => {
  const { ref, step, play } = useApprovalSequence();
  return (
    <section className="rl-sec rl-ink" id="wallets" aria-labelledby="wallets-h">
      <div className="rl-wrap">
        <div className="rl-os-head">
          <p className="rl-eyebrow">Rift Wallets · for banks and fintechs</p>
          <h2 className="rl-h2" id="wallets-h">
            Give your users wallets and access to global finance.
          </h2>
          <div className="rl-os-side">
            <p className="rl-sub">
              They hold USDC, USDT and tokenized stocks inside your app, and
              approve every payment with a passkey on their own device.
            </p>
            <div className="rl-ctas">
              <a className="rl-btn rl-btn-mint" href={CONTACT_HREF}>
                Talk to us <Arrow />
              </a>
              <a className="rl-btn rl-btn-ghost" href={DOCS_URL}>
                Read the docs
              </a>
            </div>
          </div>
        </div>

        <div className="rl-os-demo" ref={ref}>
          <Code step={step} />
          <Approve step={step} />
          <button type="button" className="rl-replay" onClick={play}>
            Replay
          </button>
        </div>

        <dl className="rl-parts">
          {OS_PARTS.map((x, i) => (
            <div key={x.h}>
              <span className="rl-num">{String(i + 1).padStart(2, "0")}</span>
              <dt>{x.h}</dt>
              <dd>{x.p}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

/* ── STOCKS + YIELD ────────────────────────────────────────────────── */

const More = () => (
  <section className="rl-sec rl-more" aria-label="Stocks and yield">
    <div className="rl-wrap rl-more-grid">
      <article id="stocks">
        <p className="rl-eyebrow">Stocks</p>
        <h2 className="rl-h3">Own tokenized stocks from your wallet.</h2>
        <p className="rl-sub">They sit next to your dollars. No brokerage account abroad.</p>
        <a className="rl-tlink" href={APP_URL}>
          Open app <Arrow />
        </a>
      </article>
      <article id="yield">
        <p className="rl-eyebrow">
          Yield <span className="rl-soon">By invitation</span>
        </p>
        <h2 className="rl-h3">Earn from the dollars that fund payouts.</h2>
        <p className="rl-sub">Liquidity providers share 0.30% of the volume their dollars carry, paid monthly. Deposits lock for 30 days. You can lose money.</p>
        <a className="rl-tlink" href={YIELD_URL}>
          Go to Yield <Arrow />
        </a>
      </article>
    </div>
  </section>
);

/* ── CLOSE + FOOTER ────────────────────────────────────────────────── */

const Close = () => (
  <section className="rl-close" aria-labelledby="close-h">
    <div className="rl-wrap">
      <h2 className="rl-h1 rl-close-h" id="close-h">
        Start with one transfer.
      </h2>
      <div className="rl-ctas">
        <a className="rl-btn rl-btn-1" href={APP_URL}>
          Open app <Arrow />
        </a>
        <a className="rl-btn rl-btn-ghost" href={CONTACT_HREF}>
          Talk to us
        </a>
        <a className="rl-tlink" href={DOCS_URL}>
          Read the docs <Arrow />
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
          <img src="/assets/rift-logo.png" alt="" width="22" height="22" />
          <span>Rift</span>
        </div>
        <nav className="rl-foot-col" aria-label="Product">
          <span>Product</span>
          <a href="#payments">Payments</a>
          <a href="#wallets">Wallets</a>
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
      <p className="rl-foot-legal">© {new Date().getFullYear()} Rift, a product of Sphere Ramp Ltd. Nairobi, Kenya.</p>
    </div>
  </footer>
);

export const Landing = () => (
  <div className="rl">
    <Hero />
    <Rates />
    <Wallets />
    <More />
    <Close />
    <Footer />
  </div>
);
