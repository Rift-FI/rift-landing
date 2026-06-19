import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import {
  I,
  OUTCOMES,
  PILLARS,
  FLOW,
  WHY,
  SECURITY,
  STABLES,
  MARKS,
  FLAGS,
  NUMS,
  SNIPPET,
  type Tok,
} from "../../lib/rift-data";

/* ============ Outcomes ============ */
export const Outcomes = () => (
  <section className="band" id="outcomes">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">01</span> What you can launch
          </span>
          <h2 style={{ marginTop: 18 }}>
            Ship the product.
            <br />
            We are the rail beneath it.
          </h2>
        </div>
        <p className="lead measure">
          One integration, many products. Whatever your institution moves, Rift is the compliant
          infrastructure it runs on.
        </p>
      </div>
      <div className="segs">
        <div className="seg-head-row">
          <span>You are</span>
          <span>What you launch</span>
        </div>
        {OUTCOMES.map((s) => (
          <Reveal key={s.k} className="seg">
            <div className="seg-name">{s.k}</div>
            <div className="seg-d">
              <strong
                style={{
                  color: "var(--ink)",
                  fontFamily: "Archivo, sans-serif",
                  fontWeight: 700,
                }}
              >
                {s.p}.
              </strong>{" "}
              {s.d}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Platform ============ */
export const Platform = () => (
  <section className="band" id="platform">
    <div className="wrap">
      <div className="prose-grid">
        <div>
          <span className="kicker">
            <span className="n">02</span> The platform
          </span>
          <h2 style={{ marginTop: 18 }}>
            The layer everything
            <br />
            runs on.
          </h2>
        </div>
        <div className="body">
          <p>
            Rift is the infrastructure beneath institutional stablecoin money. Compliance, treasury,
            settlement and the standards for how stablecoins move, in commerce and across borders,
            come as one rail, not a stack of vendors you stitch together yourself.
          </p>
        </div>
      </div>
      <div className="spine">
        <span>
          Build on <em>Rift</em>.
        </span>
        <span>
          Operate on <em>Rift</em>.
        </span>
        <span>
          Settle across <em>Rift</em>.
        </span>
      </div>
    </div>
  </section>
);

/* ============ Pillars ============ */
export const Pillars = () => (
  <section className="band" id="stack">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">03</span> The platform, in layers
          </span>
          <h2 style={{ marginTop: 18 }}>
            One rail.
            <br />
            Every layer you need.
          </h2>
        </div>
        <p className="lead measure">
          Use one layer or the whole stack, through a single API. Compliance leads, because the
          regulator does.
        </p>
      </div>
      <div className="pillars">
        {PILLARS.map((p) => (
          <Reveal key={p.h} className="pillar">
            <div className="p-top">
              <span className="p-ic">{p.ic}</span>
              <span className="p-tag">{p.tag}</span>
            </div>
            <h3>{p.h}</h3>
            <p className="p-d">{p.d}</p>
            <ul>
              {p.pts.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Why Rift ============ */
export const WhyRift = () => (
  <section className="band">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">04</span> Why Rift
          </span>
          <h2 style={{ marginTop: 18 }}>
            Built for
            <br />
            the institution.
          </h2>
        </div>
        <p className="lead measure">
          Everything an institution needs to operate in stablecoins, and nothing it has to build
          itself.
        </p>
      </div>
      <div className="list-grid">
        {WHY.map((r) => (
          <Reveal key={r.n} className="list-row">
            <span className="lr-n">{r.n}</span>
            <div>
              <div className="lr-h">{r.h}</div>
              <div className="lr-d">{r.d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ How it works ============ */
export const HowItWorks = () => (
  <section className="band" id="how">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">05</span> How it works
          </span>
          <h2 style={{ marginTop: 18 }}>
            From integration
            <br />
            to settlement.
          </h2>
        </div>
        <p className="lead measure">
          Integrate once and launch. We run the chains, custody, gas and settlement underneath, so
          your team ships product.
        </p>
      </div>
      <div className="flow">
        {FLOW.map((s, i) => (
          <Reveal key={s.h} className="flow-step" style={{ transitionDelay: `${i * 0.05}s` }}>
            <div className="fs-n">{s.n}</div>
            <div className="fs-ic">{s.ic}</div>
            <div className="fs-h">{s.h}</div>
            <div className="fs-d">{s.d}</div>
            {i < FLOW.length - 1 && <span className="fs-arrow">{I.arrowR}</span>}
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Orchestration diagram ============ */
type IconCfg = [React.ReactElement, string, string];

const ORCH_TOP: IconCfg[] = [
  [I.bank, "Core banking", "ledger sync"],
  [I.layers, "ERP & ledger", "reconciliation"],
  [I.coins, "Treasury", "balances"],
  [I.users, "Payroll", "disbursement"],
];
const ORCH_BOT: IconCfg[] = [
  [I.store, "POS terminals", "acceptance"],
  [I.card, "Card issuing", "spend"],
  [I.phone, "Mobile money", "on / off-ramp"],
  [I.lock, "Custody", "keys"],
];

const OrchNode = ({ cx, y, cfg }: { cx: number; y: number; cfg: IconCfg }) => {
  const [icon, h, sub] = cfg;
  const NW = 244;
  const NH = 70;
  const ix = cx - NW / 2 + 20;
  const tx = cx - NW / 2 + 56;
  return (
    <g>
      <rect className="on-rect" x={cx - NW / 2} y={y} width={NW} height={NH} rx={2} />
      <foreignObject x={ix} y={y + NH / 2 - 13} width={26} height={26}>
        <div className="on-ic" style={{ width: 26, height: 26, color: "var(--brand)" }}>
          {icon}
        </div>
      </foreignObject>
      <text className="on-h" x={tx} y={y + 30}>
        {h}
      </text>
      <text className="on-sub" x={tx} y={y + 49}>
        {sub}
      </text>
    </g>
  );
};

export const Orchestration = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDraw(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cxs = [152, 417, 682, 947];
  const NH = 70;
  const topY = 26;
  const botY = 464;
  const cW = 250;
  const cH = 94;
  const cCx = 550;
  const cY = 244;
  const cX = cCx - cW / 2;
  const cTop = cY;
  const cBot = cY + cH;
  const topBus = 184;
  const botBus = 404;

  return (
    <section className="band" id="connect">
      <div className="wrap">
        <div className="head-2col">
          <div>
            <span className="kicker">
              <span className="n">06</span> Integrations
            </span>
            <h2 style={{ marginTop: 18 }}>
              Connect to the systems
              <br />
              you already run.
            </h2>
          </div>
          <p className="lead measure">
            One integration sits between your existing stack and stablecoin money. Connect core
            banking, treasury, payroll, commerce and custody through a single API, with compliance
            enforced on every flow.
          </p>
        </div>

        <div className={"orch" + (draw ? " draw" : "")} ref={ref}>
          <div className="orch-mobile" aria-hidden="true">
            <div className="orch-mobile-grid">
              {ORCH_TOP.map(([icon, h, sub], i) => (
                <div className="orch-mobile-node" key={`mt${i}`}>
                  <div className="orch-mobile-ic">{icon}</div>
                  <div>
                    <div className="orch-mobile-h">{h}</div>
                    <div className="orch-mobile-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="orch-mobile-center">
              <img src="/assets/rift-logo.png" alt="" />
              <div className="orch-mobile-rift">RIFT</div>
              <div className="orch-mobile-tag">compliance · treasury · settlement</div>
            </div>
            <div className="orch-mobile-grid">
              {ORCH_BOT.map(([icon, h, sub], i) => (
                <div className="orch-mobile-node" key={`mb${i}`}>
                  <div className="orch-mobile-ic">{icon}</div>
                  <div>
                    <div className="orch-mobile-h">{h}</div>
                    <div className="orch-mobile-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="orch-scroll">
            <svg className="orch-svg" viewBox="0 0 1100 560" role="img" aria-label="Rift connects core banking, ERP, treasury, payroll, POS terminals, card issuing, mobile money and custody systems through one API.">
              {cxs.map((cx, i) => (
                <path
                  key={`t${i}`}
                  className="on-link"
                  d={`M ${cx} ${topY + NH} V ${topBus} H ${cCx} V ${cTop}`}
                />
              ))}
              {cxs.map((cx, i) => (
                <path
                  key={`b${i}`}
                  className="on-link"
                  d={`M ${cx} ${botY} V ${botBus} H ${cCx} V ${cBot}`}
                />
              ))}

              <text className="on-trunk" x={cCx + 16} y={topBus - 12}>
                REST · SDKs
              </text>
              <text className="on-trunk" x={cCx + 16} y={botBus + 22}>
                Webhooks · events
              </text>

              {ORCH_TOP.map((cfg, i) => (
                <OrchNode key={`tn${i}`} cx={cxs[i]} y={topY} cfg={cfg} />
              ))}
              {ORCH_BOT.map((cfg, i) => (
                <OrchNode key={`bn${i}`} cx={cxs[i]} y={botY} cfg={cfg} />
              ))}

              {cxs.map((cx, i) => (
                <circle key={`td${i}`} className="on-dot" cx={cx} cy={topY + NH} r={3} />
              ))}
              {cxs.map((cx, i) => (
                <circle key={`bd${i}`} className="on-dot" cx={cx} cy={botY} r={3} />
              ))}

              <rect className="on-center" x={cX} y={cY} width={cW} height={cH} rx={2} />
              <image href="/assets/rift-logo.png" x={cCx - 58} y={cY + 22} width={32} height={32} />
              <text className="on-center-h" x={cCx - 18} y={cY + 45}>
                RIFT
              </text>
              <text className="on-center-sub" x={cCx} y={cY + 72} textAnchor="middle">
                compliance · treasury · settlement
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============ Security ============ */
export const Security = () => (
  <section className="band" id="security">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">07</span> Security and compliance
          </span>
          <h2 style={{ marginTop: 18 }}>
            The controls your risk
            <br />
            team will sign off.
          </h2>
        </div>
        <p className="lead measure">
          Compliance and key security are built into every layer, so you inherit the controls
          instead of building them.
        </p>
      </div>
      <div className="list-grid">
        {SECURITY.map((r) => (
          <Reveal key={r.n} className="list-row">
            <span className="lr-n">{r.n}</span>
            <div>
              <div className="lr-h">{r.h}</div>
              <div className="lr-d">{r.d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ Proof / Coverage ============ */
export const Proof = () => (
  <section className="band" id="coverage">
    <div className="wrap">
      <div className="head-2col">
        <div>
          <span className="kicker">
            <span className="n">08</span> Coverage
          </span>
          <h2 style={{ marginTop: 18 }}>
            Every regulated stablecoin.
            <br />
            Everywhere your money moves.
          </h2>
        </div>
        <p className="lead measure">
          One rail across stablecoin types, chains and markets. Local-currency, dollar and regulated
          private stablecoins, settling where your users are.
        </p>
      </div>
      <div className="types">
        {STABLES.map((s, i) => (
          <Reveal key={s.h} className="type" style={{ transitionDelay: `${i * 0.06}s` }}>
            <div className="ty-n mono">{`0${i + 1}`}</div>
            <div className="ty-h">{s.h}</div>
            <div className="ty-d">{s.d}</div>
          </Reveal>
        ))}
      </div>
      <div className="cov-grid" style={{ marginTop: 56 }}>
        <div>
          <h3 style={{ marginBottom: 18 }}>Settling where your users are</h3>
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
          <h3 style={{ marginBottom: 18 }}>Across the chains that matter</h3>
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
      <div className="nums" style={{ marginTop: 56 }}>
        {NUMS.map((n) => (
          <div className="num" key={n.k}>
            <div className="stat-v">{n.v}</div>
            <div className="stat-k">{n.k}</div>
          </div>
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
          <span className="kicker">
            <span className="n">09</span> Built on Rift
          </span>
          <h2 style={{ marginTop: 18 }}>See the rail in action.</h2>
        </div>
        <div className="body">
          <p>
            The Rift Wallet is a full consumer wallet we built on the same APIs we give you. It
            buys stablecoins with local currency, cashes out to more than ten currencies, and
            onboards with Google, email or phone, no seed phrase. Proof the rails are ready for
            production.
          </p>
          <div className="hero-cta" style={{ marginTop: 28 }}>
            <a className="btn btn-secondary" href="https://wallet.riftfi.xyz/" target="_blank" rel="noopener noreferrer">
              Open the Rift Wallet {I.arrow}
            </a>
            <a className="tlink" href="https://wallet.riftfi.xyz/" target="_blank" rel="noopener noreferrer">
              wallet.riftfi.com {I.arrowR}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============ Developers (code block) ============ */
const CodeLine = ({ toks }: { toks: Tok[] }) => {
  if (toks.length === 1 && toks[0][1] === "") return <span>{"\n"}</span>;
  return (
    <span>
      {toks.map((t, i) => {
        const [k, v] = t;
        if (k === "i") return <span key={i}>{v}</span>;
        const cls: Record<string, string> = {
          c: "tk-c",
          k: "tk-k",
          f: "tk-f",
          s: "tk-s",
          n: "tk-n",
          p: "tk-p",
          pr: "tk-pr",
        };
        return (
          <span key={i} className={cls[k] || "tk-p"}>
            {v}
          </span>
        );
      })}
      {"\n"}
    </span>
  );
};

export const Developers = () => (
  <section className="band" id="developers">
    <div className="wrap">
      <div className="dev-grid">
        <div>
          <span className="kicker">
            <span className="n">09</span> For developers
          </span>
          <h2 style={{ marginTop: 18 }}>
            Stablecoin money
            <br />
            in a few lines.
          </h2>
          <p className="lead measure" style={{ marginTop: 22 }}>
            Issue wallets, move value and settle through one API. Identity, gas and compliance are
            built in, so you ship the product, not the regulation.
          </p>
          <div className="hero-cta" style={{ marginTop: 30 }}>
            <a className="btn btn-secondary" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
              Read the docs {I.arrow}
            </a>
            <a className="tlink" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
              Get API access {I.arrowR}
            </a>
          </div>
        </div>
        <div className="code">
          <div className="code-bar">
            <span className="cf-l">rift.ts</span>
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="code-body">
            <pre>
              {SNIPPET.map((l, i) => (
                <CodeLine key={i} toks={l} />
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============ Final CTA ============ */
export const FinalCTA = () => (
  <section className="cta invert">
    <div className="wrap">
      <h2>Launch stablecoin money, compliantly.</h2>
      <p className="lead">
        Tell us what you want to issue, disburse or settle. We will show you how fast you can go
        live.
      </p>
      <div className="cta-btns">
        <a className="btn btn-primary btn-lg" href="mailto:admin@riftfi.xyz">
          Talk to us {I.arrow}
        </a>
        <a
          className="btn btn-secondary btn-lg"
          href="https://portal.riftfi.xyz/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
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
        ["Embedded wallets", "#stack"],
        ["On & off-ramps", "#stack"],
        ["Cross-chain movement", "#stack"],
        ["Rift Wallet", "https://wallet.riftfi.xyz/"],
      ],
    },
    {
      h: "Solutions",
      links: [
        ["Neobanks", "#segments"],
        ["Fintechs & PSPs", "#segments"],
        ["Startups", "#segments"],
        ["Coverage", "#coverage"],
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
        ["Security", "#security"],
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
            <p>The compliance, treasury and settlement infrastructure for the stablecoin era.</p>
          </div>
          {cols.map((c) => (
            <div className="foot-col" key={c.h}>
              <h5>{c.h}</h5>
              {c.links.map(([label, href]) => {
                const isExternal = href.startsWith("http") || href.startsWith("mailto:");
                if (!isExternal && href.startsWith("/")) {
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
                    target={isExternal && !href.startsWith("mailto:") ? "_blank" : undefined}
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
            © {new Date().getUTCFullYear()} Rift Finance. Rift provides infrastructure software and
            does not issue stablecoins or hold customer funds. Stablecoin and money-movement
            services are provided by licensed partners.
          </span>
          <div className="socials">
            <a href="https://x.com/tryrift" target="_blank" rel="noopener noreferrer" aria-label="X">
              {I.x}
            </a>
            <a href="https://t.me/+B8abU5EjpTsyMWE8" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              {I.tg}
            </a>
            <a href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer" aria-label="Docs">
              {I.book}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
