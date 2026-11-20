import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { InstitutionalFooter } from "../components/rift/institutional";

const LAST_UPDATED = "20 November 2026";
const EFFECTIVE_DATE = "20 November 2026";

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
        text: 'Rift is a product of SPHERE-RAMP LTD (trading as "Rift"), a company incorporated in the Republic of Kenya (registration number PVT-9WYFD5) with its registered office at 32 Enkang, D403, Ngong Road, Riruta, Nairobi 00505, Kenya. For the purposes of Kenya\'s Data Protection Act, 2019 ("DPA"), SPHERE-RAMP LTD is the data controller for personal data processed in connection with the Services (defined below).',
      },
      {
        kind: "p",
        text: 'This Policy covers our services wherever you use them (together, the "Services"): the website at riftfi.com, the Rift web app at wallet.riftfi.com, the "Rift" mobile app for Android on Google Play and for iOS on the App Store, and our related APIs.',
      },
      { kind: "p", text: "Contact for privacy matters: admin@riftfi.com." },
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
      { kind: "h3", text: "Service providers and SDKs in the mobile app" },
      {
        kind: "p",
        text: "The Rift mobile app uses a limited set of third-party services and software development kits (SDKs):",
      },
      {
        kind: "ul",
        items: [
          "Authentication: Google Sign-In and Apple Sign-In (to let you sign in with those accounts) and device passkeys. We receive an account identifier, not your Google or Apple password.",
          "Push notifications: Google Firebase Cloud Messaging, to deliver transaction and security alerts.",
          "Wallet connections: WalletConnect / Reown, used only when you choose to connect Rift to a third-party application at your request.",
          "Identity verification and sanctions screening: a licensed verification provider that processes your identity documents and screening checks.",
          "Cloud hosting and infrastructure providers that store and transmit data on our behalf under contract.",
        ],
      },
      {
        kind: "p",
        text: "The app does not contain third-party advertising SDKs, and we do not use third-party analytics to track you across other apps or websites.",
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
        text: "To exercise these rights, contact admin@riftfi.com. We will respond within the timelines required by the DPA and may need to verify your identity first. If you are unsatisfied, you have the right to lodge a complaint with the Office of the Data Protection Commissioner (www.odpc.go.ke).",
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
        text: "The Services are for persons 18 and over. We do not knowingly process children's data. If you believe a minor has provided us data, contact admin@riftfi.com and we will delete it.",
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
    title: "Mobile app permissions and device data",
    blocks: [
      {
        kind: "p",
        text: "The Rift mobile app requests only the device permissions it needs to work. On Android and iOS these are:",
      },
      {
        kind: "ul",
        items: [
          "Camera — to scan wallet and payment QR codes, used only when you open a scanner in the app. Identity verification runs in a separate secure browser window provided by our verification partner, which may use your device camera there to capture your ID and a liveness check; that happens outside the Rift app.",
          "Biometrics and passkeys (Face ID, Touch ID, fingerprint) — to sign you in and authorise payments with a passkey stored on your device. Your biometric data never leaves your device and is never sent to us.",
          "Notifications — to send transaction and security alerts. You can turn these off in your device settings at any time.",
          "Network and internet access — required to connect to the Services.",
        ],
      },
      {
        kind: "p",
        text: "The app does not access your photos, precise location, contacts, call logs, SMS messages, or microphone (the microphone permission is explicitly blocked). This list matches what we declare in Google Play's Data safety section.",
      },
    ],
  },
  {
    n: "14",
    title: "Deleting your account and data",
    blocks: [
      { kind: "p", text: "You can delete your Rift account at any time:" },
      {
        kind: "ul",
        items: [
          "In the app: open Settings, tap Delete account, and confirm with the one-time code we send to your registered email or phone.",
          "On the web: go to https://riftfi.com/delete-account and follow the instructions.",
        ],
      },
      {
        kind: "p",
        text: "We verify your identity before deleting by sending a one-time code to the email address or phone number on the account.",
      },
      {
        kind: "p",
        text: "When you delete your account we remove your profile, authentication credentials and passkeys, device records, and app preferences, and we sign you out on every device. Deletion completes within 30 days.",
      },
      {
        kind: "p",
        text: "Some records must be kept even after deletion: identity-verification (KYC) and transaction records are retained for seven (7) years as required by Kenya's Proceeds of Crime and Anti-Money Laundering Act, after which they are deleted or irreversibly anonymised. Data already written to public blockchains (such as wallet addresses and on-chain transactions) cannot be deleted, because those networks are public and immutable.",
      },
      {
        kind: "p",
        text: "Before you delete, move any remaining balance out of your wallet — after deletion you will no longer be able to reach it through Rift.",
      },
    ],
  },
  {
    n: "15",
    title: "Contact",
    blocks: [
      {
        kind: "p",
        text: "SPHERE-RAMP LTD (trading as Rift). Registered office: 32 Enkang, D403, Ngong Road, Riruta, Nairobi 00505, Kenya. Company registration number PVT-9WYFD5. D-U-N-S 369977829.",
      },
      {
        kind: "p",
        text: "admin@riftfi.com · amschel@riftfi.com",
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
        <title>Privacy Policy. Rift, SPHERE-RAMP LTD.</title>
        <meta
          name="description"
          content="Rift Privacy Policy. SPHERE-RAMP LTD, Nairobi, Kenya."
        />
        <link rel="canonical" href="https://riftfi.com/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="legal">
        <div className="wrap legal-in">
          <header className="legal-head">
            <span className="kicker">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="legal-meta">
              Rift (riftfi.com) · SPHERE-RAMP LTD
              <br />
              Last updated: {LAST_UPDATED} · Effective date: {EFFECTIVE_DATE}
            </p>
            <div className="legal-actions no-print">
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
      <InstitutionalFooter />
    </Fragment>
  );
};
