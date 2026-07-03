import { I } from "../../lib/rift-data";

/**
 * Hero. Positioning is "the money is already moving, we make sure it
 * moves through you." Compliance vocabulary is deliberately absent
 * from H1 and subhead. That copy lives in the product/trust section
 * further down. Do not paraphrase the subhead; it is verbatim per the
 * approved positioning spec.
 */
export const Hero = () => (
  <header className="hero hero--center" id="top">
    <div className="wrap hero-in">
      <a
        className="hero-badge"
        href="https://wallet.riftfi.xyz/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Try the Rift Wallet {I.arrowR}
      </a>
      <h1>
        <span className="h1-strong">The money is already moving. </span>
        <span className="h1-muted">We make sure it moves through you.</span>
      </h1>
      <p className="hero-lead">
        African businesses move billions across borders in stablecoins
        because it's cheaper and faster. Rift is the wallet and
        liquidity infrastructure that plugs banks and fintechs into
        that flow: instant payments, new fee revenue, freed-up capital,
        and the visibility to lend. Live in weeks, not years.
      </p>
      <div className="hero-cta">
        <a className="btn btn-primary btn-lg" href="mailto:admin@riftfi.xyz">
          Talk to us {I.arrow}
        </a>
        <a className="btn btn-secondary btn-lg" href="/businesses">
          For businesses {I.arrowR}
        </a>
      </div>
    </div>
  </header>
);
