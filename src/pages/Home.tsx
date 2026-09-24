import { useState } from "react";
import { CapitalNav, CapitalFooter } from "../components/rift/CapitalChrome";
import { RiftIcon } from "../components/rift/RiftIcon";
import { ENQUIRY_LINKS } from "../lib/enquiry-config";
import { sectors, questions } from "../lib/capital-data";
import "../styles/capital.scss";

const audiences = [
  {
    tab: "Individual investors",
    title: "Invest in the economy around you.",
    description: "Rift Wallet is being built to connect you to opportunities that finance real business activity, with potential yield from the financing your capital provides.",
    points: ["Review opportunities when they become available.", "Understand what your capital finances.", "Manage your investments through one wallet."],
    cta: "Explore Rift Wallet",
    href: "https://wallet.riftfi.com",
    image: "/brand/rift-wallet-life.png",
    alt: "Illustrative photograph of a woman using her phone in a contemporary cafe",
    note: "Investment products are still being structured. Access will depend on availability and eligibility.",
  },
  {
    tab: "Institutional investors",
    title: "Connect your mandate to productive growth.",
    description: "For insurers, pension funds, VCs, hedge funds and DFIs seeking exposure to Africa’s productive economy. Start a conversation around your mandate and allocation goals.",
    points: ["Explore financing opportunities across sectors.", "Discuss investment structures and duration.", "Engage directly with the Rift team."],
    cta: "Express investment interest",
    href: ENQUIRY_LINKS.investor,
    image: "/brand/rift-capital-sculpture.png",
    alt: "Rift brand sculpture of interconnected stone, glass and metal forms",
    note: "An expression of interest is not a commitment to invest.",
  },
  {
    tab: "Businesses",
    title: "Finance your next stage of growth.",
    description: "Whether you need dollar liquidity, working capital, equipment or project financing, tell us what your business needs and what that capital can enable.",
    points: ["Share your business and operating market.", "Tell us your financing needs and use of funds.", "Speak with our team about potential fit."],
    cta: "Request financing",
    href: ENQUIRY_LINKS.financing,
    image: "/brand/rift-productive-economy.png",
    alt: "Illustrative agricultural processing site with solar energy and cultivated fields",
    note: "Financing enquiries are subject to review and do not guarantee funding.",
  },
];

export const Home = () => {
  const [audience, setAudience] = useState(0);
  const selected = audiences[audience];
  function changeTab(index: number, focus = false) {
    const next = (index + audiences.length) % audiences.length;
    setAudience(next);
    if (focus) document.getElementById(`audience-${next}`)?.focus();
  }

  return <div className="rift-site">
    <CapitalNav />
    <main id="main">
      <section className="r-hero">
        <div className="r-shell r-hero-layout">
          <div className="r-hero-copy">
            <h1>Capital for Africa’s productive economy.</h1>
            <p>Connect your capital to the businesses building Africa. Invest in opportunities across trade, energy, agriculture and beyond.</p>
            <div className="r-actions">
              <a className="r-button r-button-primary" href="https://wallet.riftfi.com">Invest with Rift <RiftIcon name="arrow" /></a>
              <a className="r-button r-button-outline" href={ENQUIRY_LINKS.financing}>Get financing <RiftIcon name="arrow" /></a>
            </div>
          </div>
          <div className="r-hero-art"><img src="/brand/rift-capital-sculpture.png" alt="Interconnected glass, stone and metal forms representing capital flowing into productive enterprise" width="1536" height="1024" fetchPriority="high" /></div>
        </div>
      </section>

      <section className="r-vision r-section" id="vision">
        <div className="r-shell r-vision-grid">
          <h2>A new connection between capital and enterprise.</h2>
          <div><p>Africa’s businesses produce, power, build and trade. They also need capital to grow.</p><p>Rift is building the financial infrastructure that makes this activity investable—connecting individual and institutional capital with the businesses that need financing.</p><a className="r-link" href="#how-it-works">See how it works <RiftIcon name="arrow" /></a></div>
        </div>
      </section>

      <section className="r-audiences r-section" id="participate">
        <div className="r-shell">
          <h2>Built for investors and businesses.</h2>
          <div className="r-tabs" role="tablist" aria-label="Ways to participate in Rift">
            {audiences.map((item, i) => <button key={item.tab} id={`audience-${i}`} role="tab" aria-selected={audience === i} aria-controls={`audience-panel-${i}`} tabIndex={audience === i ? 0 : -1} onClick={() => changeTab(i)} onKeyDown={e => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); changeTab(i + (e.key === "ArrowRight" ? 1 : -1), true); }
              if (e.key === "Home" || e.key === "End") { e.preventDefault(); changeTab(e.key === "Home" ? 0 : audiences.length - 1, true); }
            }}>{item.tab}</button>)}
          </div>
          <div className="r-audience-panel" id={`audience-panel-${audience}`} role="tabpanel" aria-labelledby={`audience-${audience}`} tabIndex={0}>
            <div className="r-audience-copy">
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <ul>{selected.points.map(point => <li key={point}><RiftIcon name="check" /><span>{point}</span></li>)}</ul>
              <a className="r-button r-button-primary" href={selected.href}>{selected.cta} <RiftIcon name="arrow" /></a>
              <p className="r-note">{selected.note}</p>
            </div>
            <div className={`r-audience-image r-audience-image-${audience}`}><img src={selected.image} alt={selected.alt} width="1536" height="1024" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className="r-sectors r-section" id="sectors">
        <div className="r-shell">
          <div className="r-section-intro"><h2>Capital across the productive economy.</h2><p>Our focus spans the businesses and infrastructure that create lasting economic value.</p></div>
          <div className="r-sector-grid">
            {sectors.map(sector => <article id={`sector-${sector.id}`} key={sector.id}><RiftIcon name={sector.icon} /><h3>{sector.name}</h3><p>{sector.description}</p></article>)}
          </div>
          <div className="r-sector-bottom"><p>These sectors represent Rift’s focus. Specific investment opportunities are introduced as they become available.</p><a href={ENQUIRY_LINKS.financing} className="r-link">Discuss your financing needs <RiftIcon name="arrow" /></a></div>
        </div>
      </section>

      <section className="r-section r-process" id="how-it-works">
        <div className="r-shell">
          <div className="r-section-intro"><h2>Investment connected to real economic activity.</h2><p>Returns start with what the capital enables. Rift is building on-chain infrastructure to support deployment, repayments and reporting.</p></div>
          <div className="r-process-grid">
            <article><RiftIcon name="institution" /><h3>Investors provide capital</h3><p>Individuals participate through Rift Wallet. Institutions engage directly around their mandates, preferred sectors and allocation goals.</p></article>
            <article><RiftIcon name="financing" /><h3>Businesses put it to work</h3><p>Financing supports a defined business need, with agreed terms for how capital is used and repaid.</p></article>
            <article><RiftIcon name="wallet" /><h3>Repayments generate returns</h3><p>Interest and other agreed cash flows create potential investor yield, after applicable costs and losses.</p></article>
          </div>
        </div>
      </section>

      <section className="r-example">
        <div className="r-shell r-example-grid">
          <div className="r-example-image"><img src="/brand/rift-productive-economy.png" alt="Illustrative view of solar power and agricultural production in an African landscape" width="1536" height="1024" loading="lazy" /></div>
          <div className="r-example-copy"><h2>Financing that starts with a real business need.</h2><p>A payment provider needs dollars to settle cross-border transactions. A processor needs capital to buy the next harvest. An energy business needs equipment to expand supply.</p><p>Rift connects these needs with investors. Each opportunity has its own structure, repayment source and risks.</p><a className="r-link" href={ENQUIRY_LINKS.investor}>Explore institutional investment <RiftIcon name="arrow" /></a></div>
        </div>
      </section>

      <section className="r-section r-faq" id="questions">
        <div className="r-shell r-faq-layout"><h2>Questions about Rift</h2><div>{questions.map(([q,a]) => <details key={q}><summary>{q}<RiftIcon name="chevron" /></summary><p>{a}</p></details>)}</div></div>
      </section>

      <section className="r-contact">
        <div className="r-shell"><h2>Let’s build what comes next.</h2><div className="r-contact-grid">
          <div><h3>Invest with Rift</h3><p>Explore opportunities through the wallet or speak to us about your institution’s mandate.</p><div className="r-actions"><a className="r-button r-button-primary" href="https://wallet.riftfi.com">Open Rift Wallet <RiftIcon name="arrow" /></a><a className="r-link" href={ENQUIRY_LINKS.investor}>Institutional enquiries <RiftIcon name="arrow" /></a></div></div>
          <div><h3>Finance your business</h3><p>Tell us what you’re building, what you need and what the right capital could make possible.</p><a className="r-button r-button-outline" href={ENQUIRY_LINKS.financing}>Request financing <RiftIcon name="arrow" /></a></div>
        </div></div>
      </section>
    </main>
    <CapitalFooter />
  </div>;
};
