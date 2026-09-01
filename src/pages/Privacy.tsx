import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { I } from "../lib/rift-data";

const LAST_UPDATED = "04/07/2026";

type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "h3"; text: string };

type Section = {
  n: string;
  title: string;
  blocks: Block[];
};

const SECTIONS: Section[] = [
  {
    n: "1",
    title: "Who we are",
    blocks: [
      {
        kind: "p",
        text: 'Rift is a product of Sphere Ramp Ltd, a company incorporated in Kenya at Enkang, Ngong Road. For the purposes of Kenya\'s Data Protection Act, 2019 ("DPA"), Sphere Ramp Ltd is the data controller for personal data processed in connection with riftfi.com and our applications, APIs, and services (the "Services").',
      },
      { kind: "p", text: "Contact for privacy matters: privacy@riftfi.com." },
      {
        kind: "p",
        text: "Where we process personal data on behalf of an institutional customer (for example, a bank deploying our infrastructure for its own clients), that institution is the controller and we act as a processor under its instructions and a data processing agreement; this Policy covers processing where Sphere Ramp Ltd is the controller.",
      },
    ],
  },
  {
    n: "2",
    title: "What we collect",
    blocks: [
      { kind: "p", text: "We collect and process the following categories of personal data:" },
      {
        kind: "ul",
        items: [
          "Identity and verification data (KYC/KYB): name, date of birth, nationality, identity document details and images, photographs or liveness checks, business registration details, directors and beneficial owners, address, and source-of-funds information where required.",
          "Contact data: email address, phone number, business address.",
          "Account and authentication data: usernames, authentication events, passkey public keys and credential identifiers, linked sign-in identifiers (for example Google account identifiers). We do not receive your Google password. Private keys used for transaction signing are generated and used inside secure hardware environments and are not accessible to us as readable data.",
          "Transaction data: payment amounts, currencies, counterparties, corridors, timestamps, wallet addresses, and related records.",
          "Technical data: device information, IP address, logs, and cookie or similar identifiers (see Section 9).",
          "Communications: support requests, correspondence, and, where lawfully notified, call or chat records.",
        ],
      },
      {
        kind: "p",
        text: "We collect this data directly from you, from your use of the Services, and from third-party sources used for verification, sanctions and fraud screening, and business registries.",
      },
    ],
  },
  {
    n: "3",
    title: "Why we process it, and the lawful bases",
    blocks: [
      { kind: "p", text: "Under the DPA we process personal data on the following bases:" },
      {
        kind: "ul",
        items: [
          "Contract: to provide the Services, create and secure accounts, execute transactions, provide support, and administer our agreement with you.",
          "Legal obligation: identity verification, sanctions and AML/CTF screening, transaction monitoring, record-keeping, tax, and reporting to regulators and law enforcement where required, including under the Proceeds of Crime and Anti-Money Laundering Act and applicable virtual-asset regulation.",
          "Consent: sharing your verified transaction history with a financial institution you designate (see Section 5); optional communications; any cookies that are not strictly necessary. You may withdraw consent at any time without affecting prior processing.",
          "Legitimate interests: securing and improving the Services, preventing fraud and abuse, and producing aggregated or de-identified analytics, balanced against your rights and expectations.",
        ],
      },
      {
        kind: "p",
        text: "We do not use your personal data for automated decisions that produce legal or similarly significant effects without human review, except where required for sanctions screening, in which case a review process applies. We do not sell personal data.",
      },
    ],
  },
  {
    n: "4",
    title: "Where your data is stored",
    blocks: [
      {
        kind: "p",
        text: "Personal data relating to our customers is stored on servers located in Kenya. Where any personal data is transferred outside Kenya (for example to a verification, screening, or cloud provider), we do so in accordance with the DPA, including ensuring appropriate safeguards and, where required, that a copy of the relevant personal data remains stored in Kenya, and, where the law requires, obtaining consent or ensuring the destination provides an adequate level of protection.",
      },
    ],
  },
  {
    n: "5",
    title: "Consent-based sharing of transaction history",
    blocks: [
      {
        kind: "p",
        text: "A core feature of the Services allows you, at your choice, to share your verified transaction history with a bank or other financial institution, for example to support a credit application. This sharing:",
      },
      {
        kind: "ul",
        items: [
          "Happens only at your direction and with your recorded consent;",
          "Is limited to the recipient you designate and the scope described at the time of consent;",
          "Can be withdrawn at any time for future sharing, without affecting information already shared.",
        ],
      },
      {
        kind: "p",
        text: "We do not share your transaction history with financial institutions for their marketing or underwriting without your consent. Nothing in this section limits disclosures we are legally required to make (Section 6).",
      },
    ],
  },
  {
    n: "6",
    title: "Who else we share data with",
    blocks: [
      {
        kind: "ul",
        items: [
          "Partners necessary to provide the Services: licensed banking, payment, and virtual-asset partners involved in executing your transactions; identity-verification, sanctions, and fraud-screening providers; cloud and infrastructure providers, under contracts that restrict their use of your data.",
          "Regulators and law enforcement: where required or permitted by law, including AML reporting obligations that may prohibit us from notifying you.",
          "Professional advisers and auditors: under confidentiality obligations.",
          "Corporate transactions: a purchaser or successor in a merger, acquisition, or asset sale, subject to this Policy.",
        ],
      },
      {
        kind: "p",
        text: "Public blockchain networks are, by design, public: wallet addresses and on-chain transaction details may be visible to anyone. We do not publish your identity to a public network, but on-chain data combined with other information could identify you.",
      },
    ],
  },
  {
    n: "7",
    title: "How long we keep data",
    blocks: [
      {
        kind: "p",
        text: "We keep personal data only as long as needed for the purposes above. In particular: KYC and transaction records are retained for at least seven (7) years after the end of the relationship or the transaction, as required by Kenyan AML law; account data is retained for the life of the account plus the statutory period; technical logs are retained for 32 months. When retention ends, we delete or irreversibly anonymise the data.",
      },
    ],
  },
  {
    n: "8",
    title: "Your rights",
    blocks: [
      { kind: "p", text: "Under the DPA you have the right to:" },
      {
        kind: "ul",
        items: [
          "Be informed about how your data is used;",
          "Access personal data we hold about you;",
          "Correct false or misleading data;",
          "Deletion of data we are not entitled or required to retain (note that AML law requires us to retain certain records even after account closure);",
          "Object to or restrict certain processing;",
          "Data portability, where applicable;",
          "Withdraw consent where processing is based on consent.",
        ],
      },
      {
        kind: "p",
        text: "To exercise these rights, contact privacy@riftfi.com. We will respond within the timelines required by the DPA and may need to verify your identity first. If you are unsatisfied, you have the right to lodge a complaint with the Office of the Data Protection Commissioner (www.odpc.go.ke).",
      },
    ],
  },
  {
    n: "9",
    title: "Cookies and similar technologies",
    blocks: [
      {
        kind: "p",
        text: "riftfi.com uses cookies and similar technologies for: (a) strictly necessary functions such as security and session management; and (b) with your consent, analytics to understand how the site is used. You can manage non-essential cookies through your browser settings.",
      },
    ],
  },
  {
    n: "10",
    title: "Security",
    blocks: [
      {
        kind: "p",
        text: "We apply technical and organisational measures appropriate to the risk, including encryption in transit and at rest, hardware-isolated key handling (secure enclaves) for wallet keys, access controls, logging, and independent security review of our infrastructure. No system is perfectly secure; if a breach occurs that presents a real risk of harm, we will notify the ODPC and affected persons as required by the DPA.",
      },
    ],
  },
  {
    n: "11",
    title: "Children",
    blocks: [
      {
        kind: "p",
        text: "The Services are for business use by persons 18 and over. We do not knowingly process children's data. If you believe a minor has provided us data, contact privacy@riftfi.com and we will delete it.",
      },
    ],
  },
  {
    n: "12",
    title: "Changes to this Policy",
    blocks: [
      {
        kind: "p",
        text: 'We may update this Policy from time to time. For material changes we will give notice on the site or by email before the changes take effect. The "Last updated" date shows the current version.',
      },
    ],
  },
  {
    n: "13",
    title: "Contact",
    blocks: [
      {
        kind: "p",
        text: "Sphere Ramp Ltd (Rift), Enkang, Ngong Road, Nairobi, Kenya.",
      },
      {
        kind: "p",
        text: "amschel@riftfi.com · privacy@riftfi.com",
      },
      {
        kind: "p",
        text: "Office of the Data Protection Commissioner: www.odpc.go.ke",
      },
    ],
  },
];

export const Privacy = () => {
  const onPrint = () => {
    window.print();
  };

  return (
    <Fragment>
      <Helmet>
        <html lang="en" />
        <title>Privacy Policy. Rift (riftfi.com), Sphere Ramp Ltd.</title>
        <meta
          name="description"
          content="Rift Privacy Policy. Sphere Ramp Ltd, Nairobi, Kenya."
        />
        <link rel="canonical" href="https://riftfi.xyz/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="legal">
        <div className="wrap legal-in">
          <header className="legal-head">
            <span className="kicker">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="legal-meta">
              Rift (riftfi.com) · Sphere Ramp Ltd
              <br />
              Last updated: {LAST_UPDATED}
            </p>
            <div className="legal-actions no-print">
              <a
                className="btn btn-primary"
                href="/rift-privacy.pdf"
                download="rift-privacy.pdf"
              >
                Download PDF {I.arrow}
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onPrint}
              >
                Print
              </button>
            </div>
          </header>

          <nav className="legal-toc no-print" aria-label="Table of contents">
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

          <article className="legal-body">
            {SECTIONS.map((s) => (
              <section key={s.n} id={`s-${s.n}`} className="legal-section">
                <h2>
                  <span className="legal-section-n">{s.n}.</span> {s.title}
                </h2>
                {s.blocks.map((b, i) => {
                  if (b.kind === "p") return <p key={i}>{b.text}</p>;
                  if (b.kind === "h3") return <h3 key={i}>{b.text}</h3>;
                  return (
                    <ul key={i}>
                      {b.items.map((it, j) => (
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
