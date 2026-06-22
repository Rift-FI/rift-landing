import { I } from "../../lib/rift-data";

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
        <span className="h1-strong">The compliant rail for </span>
        <span className="h1-muted">programmable money.</span>
      </h1>
      <p className="hero-lead">
        Spin up compliant wallets, hold any major stablecoin, and move money across chains or out
        to local currency. One API, with compliance and AML built in.
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
