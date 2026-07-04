import { I } from "../../lib/rift-data";

/**
 * Home hero — business-led. Copy is minimal, the moneyo product image
 * carries the story. The banks/fintech line lives inside the reveal
 * further down; do not repeat it here.
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
        Open the Rift Wallet {I.arrowR}
      </a>
      <h1>
        <span className="h1-strong">Pay across African borders </span>
        <span className="h1-muted">in minutes.</span>
      </h1>
      <p className="hero-lead">
        Local currency in, local currency out. On rails your bank will sign off.
      </p>
      <div className="hero-cta">
        <a
          className="btn btn-primary btn-lg"
          href="https://wallet.riftfi.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start moving money {I.arrow}
        </a>
        <a className="btn btn-secondary btn-lg" href="#institutions">
          For banks and fintechs {I.arrowR}
        </a>
      </div>
    </div>
    <div className="hero-shot" aria-hidden="true">
      <img
        className="hero-shot-img"
        src="/moneyo.jpeg"
        alt=""
        loading="eager"
      />
      <div className="hero-shot-fade" />
    </div>
  </header>
);
