import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import {
  I,
  CAPS,
  COINS,
  CHAINS,
  USECASES,
  SECURITY,
  PRICING,
  FLAGS,
} from "../../lib/rift-data";

export const Capabilities = () => (
  <section className="sec" id="capabilities">
    <div className="wrap">
      <div className="sec-head">
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          Everything you need to move
          <br />
          digital dollars in one API.
        </h2>
        <p className="lede">
          Six composable building blocks. Use one, use all of them. The chains, gas and
          key management are abstracted away so you ship product, not infrastructure.
        </p>
      </div>
      <div className="cap-grid">
        {CAPS.map((c, i) => (
          <Reveal key={c.t} className="cap" style={{ transitionDelay: `${(i % 3) * 0.06}s` }}>
            <span className="ic">{c.ic}</span>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
            <div className="tag mono">{c.tag}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const ChainSwitcher = () => (
  <section className="sec tint" id="chains">
    <div className="wrap">
      <div className="sec-head center">
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          Built across the chains
          <br />
          that actually matter.
        </h2>
        <p className="lede">
          Move value across the major stablecoins and 10+ networks through one interface.
          Rift abstracts the chains, gas and signing so your users never know one exists.
        </p>
      </div>

      <div className="net-block">
        <p className="grp-lab">Stablecoins</p>
        <div className="net-row">
          {COINS.map((c) => (
            <div className="net-chip" key={c.id}>
              <img src={c.img} alt={c.id} />
              <span>{c.id}</span>
            </div>
          ))}
        </div>
        <p className="grp-lab" style={{ marginTop: 34 }}>
          Networks
        </p>
        <div className="net-grid">
          {CHAINS.map((ch) => (
            <div className="net-chip" key={ch.id}>
              <img src={ch.img} alt={ch.n} />
              <span>{ch.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const WalletShowcase = () => (
  <section className="wallet dark" id="wallet">
    <div className="wrap wallet-in">
      <div className="sec-head center" style={{ margin: "0 auto" }}>
        <h2 style={{ marginTop: 0 }}>
          The Rift Wallet,
          <br />
          our infra in your pocket.
        </h2>
        <p className="lede" style={{ margin: "18px auto 0" }}>
          We built a full consumer wallet on the exact same APIs we give you. Proof the rails are
          production-ready, and a reference for what you can ship.
        </p>
      </div>

      <div className="wallet-feats">
        <div className="wallet-feat">
          <span className="ck">{I.plus}</span>
          <div className="wf-t">Buy stables with fiat</div>
          <div className="wf-d">Top up in local currency via bank, card or mobile money. Get USDC instantly.</div>
        </div>
        <div className="wallet-feat">
          <span className="ck">{I.swap}</span>
          <div className="wf-t">Convert to 10+ fiat currencies</div>
          <div className="wf-d">Cash out stablecoins to local money and withdraw in minutes, not days.</div>
        </div>
        <div className="wallet-feat">
          <span className="ck">{I.key}</span>
          <div className="wf-t">Create a wallet in seconds</div>
          <div className="wf-d">Sign up with Google, email or phone. No seed phrases, no extensions.</div>
        </div>
      </div>

      <div className="wallet-cta">
        <a className="btn btn-mint btn-lg" href="https://wallet.riftfi.xyz/" target="_blank" rel="noopener noreferrer">
          Open the Rift Wallet {I.arrowUR}
        </a>
        <a className="btn btn-ghost btn-lg" href="https://wallet.riftfi.xyz/" target="_blank" rel="noopener noreferrer">
          wallet.riftfi.com
        </a>
      </div>
    </div>
  </section>
);

export const DevSection = () => {
  const points = [
    { ic: I.code, t: "REST + typed SDKs", d: "Idempotent API with SDKs for TypeScript, Python and Go." },
    { ic: I.layers, t: "Sandbox that mirrors prod", d: "Test ramps, swaps and payouts end to end before you go live." },
    { ic: I.bolt, t: "Webhooks for everything", d: "Signed, replayable events for every state change." },
    { ic: I.fuel, t: "Abstracted internals", d: "Chains, gas and signing behind one stable interface." },
  ];
  return (
    <section className="sec dev dark" id="developers">
      <div className="wrap">
        <div className="sec-head center">
          <h2 className="h-sect" style={{ marginTop: 0, color: "#fff" }}>
            Ship in days,
            <br />
            not quarters.
          </h2>
          <p className="lede">
            Clean APIs, a generous sandbox and predictable webhooks. Every primitive is
            one call away, and we abstract the parts that usually take a team a year.
          </p>
        </div>
        <div className="dev-grid">
          {points.map((p) => (
            <div className="dev-item" key={p.t}>
              <span className="ic">{p.ic}</span>
              <div className="di-t">{p.t}</div>
              <div className="di-d">{p.d}</div>
            </div>
          ))}
        </div>
        <div className="dev-cta">
          <a className="btn btn-mint btn-lg" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
            Read the docs {I.arrowUR}
          </a>
        </div>
      </div>
    </section>
  );
};

export const UseCases = () => (
  <section className="sec" id="usecases">
    <div className="wrap">
      <div className="sec-head">
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          One layer. Every kind
          <br />
          of money product.
        </h2>
      </div>
      <div className="uc-grid">
        {USECASES.map((u, i) => (
          <Reveal key={u.t} className="uc" style={{ transitionDelay: `${i * 0.06}s` }}>
            <span className="badge mono">{u.badge}</span>
            <h3>{u.t}</h3>
            <p>{u.d}</p>
            <ul>
              {u.pts.map((p) => (
                <li key={p}>
                  <span className="d" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Coverage = () => (
  <section className="sec tint" id="coverage">
    <div className="wrap cov-in">
      <div>
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          Local rails, everywhere
          <br />
          your users are.
        </h2>
        <p className="lede">
          Move between digital dollars and local money on the rails people actually use,
          from bank transfer to mobile money and cards, in 150+ countries.
        </p>
        <div className="cov-flags">
          {FLAGS.map(([code, name]) => (
            <span className="cf" key={code}>
              <img className="flag" src={`https://flagcdn.com/${code}.svg`} alt={name} />
              {name}
            </span>
          ))}
          <span className="cf" style={{ color: "var(--teal-deep)", fontWeight: 600 }}>
            +140 more
          </span>
        </div>
      </div>
      <div className="cov-stats">
        <div className="cov-stat">
          <div className="v">
            150<span>+</span>
          </div>
          <div className="k">Countries with on/off-ramp</div>
        </div>
        <div className="cov-stat">
          <div className="v">
            10<span>+</span>
          </div>
          <div className="k">Blockchains supported</div>
        </div>
        <div className="cov-stat">
          <div className="v">
            10<span>+</span>
          </div>
          <div className="k">Fiat payout currencies</div>
        </div>
        <div className="cov-stat">
          <div className="v">
            4<span>+</span>
          </div>
          <div className="k">Major stablecoins</div>
        </div>
      </div>
    </div>
  </section>
);

export const Security = () => (
  <section className="sec" id="security">
    <div className="wrap">
      <div className="sec-head">
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          Bank-grade controls,
          <br />
          without the bank.
        </h2>
        <p className="lede">
          Compliance and key security are built into every layer, so you inherit the hard
          parts instead of building them.
        </p>
      </div>
      <div className="sec-grid">
        {SECURITY.map((s, i) => (
          <Reveal key={s.t} className="sec-item" style={{ transitionDelay: `${i * 0.05}s` }}>
            <span className="ic">{s.ic}</span>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Pricing = () => (
  <section className="sec tint" id="pricing">
    <div className="wrap">
      <div className="sec-head center">
        <h2 className="h-sect" style={{ marginTop: 0 }}>
          Start free. Pay as you grow.
        </h2>
        <p className="lede">
          No setup fees, no minimums. Transparent per-transaction pricing once you go live.
        </p>
      </div>
      <div className="price-grid">
        {PRICING.map((p) => (
          <div key={p.n} className={"price" + (p.feat ? " feat" : "")}>
            {p.feat && <span className="ribbon mono">MOST POPULAR</span>}
            <span className="pn">{p.n}</span>
            <div className="pp">
              {p.pp}
              <small>{p.sub}</small>
            </div>
            <p className="pd">{p.d}</p>
            <ul>
              {p.pts.map((x) => (
                <li key={x}>
                  <span className="ck">{I.check}</span>
                  {x}
                </li>
              ))}
            </ul>
            <a
              className={"btn btn-" + p.style}
              href={p.style === "teal" ? "mailto:admin@riftfi.xyz" : "https://portal.riftfi.xyz/docs"}
              target={p.style === "teal" ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{ justifyContent: "center" }}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FinalCTA = () => (
  <section className="cta dark">
    <div className="wrap cta-in">
      <h2>
        The stablecoin stack for
        <br />
        your next <span className="grad">money product.</span>
      </h2>
      <p className="lede">
        Get sandbox keys in minutes. Move real value across borders by the end of the week.
      </p>
      <div className="cta-btns">
        <a className="btn btn-mint btn-lg" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
          Get API keys {I.arrow}
        </a>
        <a className="btn btn-ghost btn-lg" href="mailto:admin@riftfi.xyz">
          Talk to sales
        </a>
      </div>
    </div>
  </section>
);

export const Footer = () => {
  const cols: { h: string; links: [string, string][] }[] = [
    {
      h: "Product",
      links: [
        ["On-ramps", "#capabilities"],
        ["Off-ramps", "#capabilities"],
        ["Embedded wallets", "#capabilities"],
        ["Swaps", "#chains"],
        ["Rift Wallet", "#wallet"],
      ],
    },
    {
      h: "Developers",
      links: [
        ["Documentation", "https://portal.riftfi.xyz/docs"],
        ["API reference", "https://portal.riftfi.xyz/docs"],
        ["Sandbox", "https://portal.riftfi.xyz/docs"],
        ["Status", "https://portal.riftfi.xyz/docs"],
      ],
    },
    {
      h: "Solutions",
      links: [
        ["Neobanks", "#usecases"],
        ["Fintechs", "#usecases"],
        ["Startups", "#usecases"],
        ["Coverage", "#coverage"],
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
  ];

  return (
    <footer>
      <div className="wrap">
        <div className="foot-in">
          <div className="foot-brand">
            <Link className="brand" to="/">
              <img className="mark" src="/assets/rift-logo.png" alt="Rift" />
              Rift
            </Link>
            <p>
              Infrastructure for fintechs, neobanks and startups to embed stablecoins,
              wallets and global money movement.
            </p>
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
          <span>© {new Date().getUTCFullYear()} Rift Finance. All rights reserved.</span>
          <div className="socials">
            <a href="https://x.com/tryrift" target="_blank" rel="noopener noreferrer" aria-label="X">
              {I.x}
            </a>
            <a href="https://t.me/+B8abU5EjpTsyMWE8" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              {I.tg}
            </a>
            <a href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer" aria-label="Docs">
              {I.doc}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
