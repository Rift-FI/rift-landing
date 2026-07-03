import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Reveal } from "../components/rift/Reveal";
import { I } from "../lib/rift-data";

/**
 * /businesses page. Speed and cost lead, credit history closes.
 * Compliance appears exactly once, as reassurance ("fully regulated
 * rails"), never as a selling point. No bank jargon.
 *
 * Every piece of copy on this page is the approved wording from the
 * positioning spec, section 5. Do not paraphrase.
 */

const BENEFITS: string[] = [
  "Minutes, not days.",
  "Local currency to local currency, no dollar detour on balanced corridors.",
  "Fully regulated rails, safe and defensible if anyone ever asks.",
  "Every payment builds verified history your bank can lend against.",
];

export const Businesses = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>Pay across African borders in minutes, with Rift</title>
      <meta
        name="description"
        content="Move money across African borders in minutes, compliantly, and turn every payment into credit history your bank can see."
      />
      <link rel="canonical" href="https://riftfi.xyz/businesses" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Pay across African borders in minutes, with Rift"
      />
      <meta
        property="og:description"
        content="Move money across African borders in minutes, compliantly, and turn every payment into credit history your bank can see."
      />
      <meta property="og:url" content="https://riftfi.xyz/businesses" />
    </Helmet>

    <header className="hero hero--center" id="top">
      <div className="wrap hero-in">
        <h1>
          <span className="h1-strong">Pay across African borders </span>
          <span className="h1-muted">in minutes.</span>
        </h1>
        <p className="hero-lead">
          Move money across African borders in minutes, compliantly, and
          turn every payment into credit history your bank can see.
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
          <a className="btn btn-secondary btn-lg" href="mailto:admin@riftfi.xyz">
            Talk to us {I.arrowR}
          </a>
        </div>
      </div>
    </header>

    <section className="band" id="how">
      <div className="wrap">
        <div className="head-2col">
          <div>
            <span className="kicker">
              <span className="n">01</span> The problem you feel
            </span>
            <h2 style={{ marginTop: 18 }}>
              The old rails cost you
              <br />
              days and dollars.
            </h2>
          </div>
          <p className="lead measure">
            Paying suppliers across African borders still means routing
            through dollars, losing days to correspondent banks, and
            paying fees at every hop. Rift moves your money directly,
            local currency to local currency, on compliant, fully
            regulated rails. Your supplier gets paid in minutes, not
            days, at a fraction of the cost. And unlike informal
            channels, every payment builds a verified transaction
            history you can share with your bank, so the money you move
            finally counts toward the credit you're trying to build.
          </p>
        </div>
      </div>
    </section>

    <section className="band" id="benefits">
      <div className="wrap">
        <div className="head-2col">
          <div>
            <span className="kicker">
              <span className="n">02</span> What changes
            </span>
            <h2 style={{ marginTop: 18 }}>
              Faster payments.
              <br />
              Real credit history.
            </h2>
          </div>
          <p className="lead measure">
            Four things that shift the day you start using Rift.
          </p>
        </div>
        <div className="segs" style={{ marginTop: 40 }}>
          {BENEFITS.map((b, i) => (
            <Reveal key={b} className="seg">
              <div className="seg-name">{`0${i + 1}`}</div>
              <div className="seg-d">
                <strong
                  style={{
                    color: "var(--ink)",
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {b}
                </strong>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="cta">
      <div className="wrap">
        <div className="cta-card">
          <span className="cta-eyebrow">Get started</span>
          <h2>Start moving money.</h2>
          <p>
            Open the Rift Wallet and pay your first supplier across a
            border in minutes.
          </p>
          <div className="cta-btns">
            <a
              className="btn cta-btn btn-lg"
              href="https://wallet.riftfi.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the Rift Wallet {I.arrow}
            </a>
            <a className="tlink cta-tlink" href="mailto:admin@riftfi.xyz">
              Talk to us {I.arrowR}
            </a>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);
