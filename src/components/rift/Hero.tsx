import { I } from "../../lib/rift-data";

export const Hero = () => (
  <header className="hero" id="top">
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-tint" />
      <div className="hero-map" />
    </div>
    <div className="wrap hero-in">
      <div className="hero-copy">
        <span className="kicker grey">Stablecoin infrastructure for institutions</span>
        <h1>
          <span className="h1-strong">The compliant, identity and settlement rail for </span>
          <span className="h1-muted">programmable money.</span>
        </h1>
        <p className="hero-lead">
          Spin up compliant wallets, hold any major stablecoin, and move money across chains or out
          to local currency. All through one API, with compliance and AML built in.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary btn-lg" href="mailto:admin@riftfi.xyz">
            Talk to us {I.arrow}
          </a>
          <a className="btn btn-secondary btn-lg" href="#outcomes">
            See what you can launch {I.arrowR}
          </a>
        </div>
      </div>
    </div>
  </header>
);

export const TrustStatement = () => (
  <section className="trust" aria-label="Positioning">
    <div className="wrap" style={{ textAlign: "center" }}>
      <p style={{ marginLeft: "auto", marginRight: "auto" }}>
        We issue KYC and AML-enabled wallets and set the standards for how stablecoins move,
        in commerce and across borders. We never hold your funds or your keys. The infrastructure
        your risk and compliance teams can sign off on.
      </p>
    </div>
  </section>
);
