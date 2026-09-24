import { Fragment } from "react";
import { RiftIcon } from "../components/rift/RiftIcon";

import policy from "../content/privacy.json";
const LAST_UPDATED = policy.updated;
const SECTIONS = policy.sections;

export const Privacy = () => {
  const onPrint = () => {
    window.print();
  };

  return (
    <Fragment>

      <main id="main" className="r-legal">
        <div className="r-shell r-doc-in">
          <header className="r-doc-head">
            <h1>Privacy Policy</h1>
            <p className="r-doc-meta">
              Rift (riftfi.com) · Sphere Ramp Ltd
              <br />
              Last updated: {LAST_UPDATED}
            </p>
            <div className="r-doc-actions no-print">
              <a
                className="r-button r-button-primary"
                href="/rift-privacy.pdf"
                download="rift-privacy.pdf"
              >
                Download PDF <RiftIcon name="arrow" />
              </a>
              <button
                type="button"
                className="r-button r-button-outline"
                onClick={onPrint}
              >
                Print
              </button>
            </div>
          </header>

          <nav className="r-doc-toc no-print" aria-label="Table of contents">
            <h2>Contents</h2>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.n}>
                  <a href={`#s-${s.n}`}>
                    {s.n}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="r-doc-body">
            {SECTIONS.map((s) => (
              <section key={s.n} id={`s-${s.n}`} className="r-doc-section">
                <h2>
                  <span className="r-doc-section-n">{s.n}.</span> {s.title}
                </h2>
                {s.blocks.map((b, i) => {
                  if (b.kind === "p") return <p key={i}>{b.text}</p>;
                  if (b.kind === "h3") return <h3 key={i}>{b.text}</h3>;
                  return (
                    <ul key={i}>
                      {b.items!.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  );
                })}
              </section>
            ))}
          </article>
        </div>
      </main>
    </Fragment>
  );
};
