import type { ReactNode } from "react";

const mk = (...paths: string[]) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

export const I = {
  arrow: mk("M5 16h22", "M19 8l8 8-8 8"),
  arrowR: mk("M7 16h16", "M16 9l7 7-7 7"),
  wallet: mk(
    "M4 9a2 2 0 0 1 2-2h17a1 1 0 0 1 1 1v3",
    "M4 9v14a2 2 0 0 0 2 2h19a1 1 0 0 0 1-1v-4",
    "M28 14h-6a3 3 0 0 0 0 6h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z"
  ),
  ramp: mk("M16 5v16", "M9 14l7 7 7-7", "M6 27h20"),
  swap: mk("M9 6 4 11l5 5", "M4 11h18", "M23 26l5-5-5-5", "M28 21H10"),
  code: mk("M11 9 4 16l7 7", "M21 9l7 7-7 7"),
  shield: mk(
    "M16 4 5 8v7c0 7 5 11 11 13 6-2 11-6 11-13V8L16 4Z",
    "M11 16l3.5 3.5L22 12"
  ),
  key: mk("M19 5a8 8 0 1 0 5.5 13.8", "M14 14l13-3", "M24 11l3 2 1-4"),
  lock: mk(
    "M7 14h18v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V14Z",
    "M11 14V9a5 5 0 0 1 10 0v5"
  ),
  doc: mk(
    "M18 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V12l-8-8Z",
    "M18 4v8h8",
    "M11 18h10",
    "M11 23h10"
  ),
  globe: mk(
    "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z",
    "M4 16h24",
    "M16 4c4 4 6 8 6 12s-2 8-6 12c-4-4-6-8-6-12s2-8 6-12Z"
  ),
  layers: mk(
    "M16 5 4 11l12 6 12-6-12-6Z",
    "M4 17l12 6 12-6",
    "M4 23l12 6 12-6",
    "M4 11l12 6 12-6"
  ),
  bolt: mk("M18 4 7 19h8l-1 9 11-15h-8l1-9Z"),
  bank: mk(
    "M4 12 16 5l12 7",
    "M6 12v12",
    "M26 12v12",
    "M11 12v12",
    "M21 12v12",
    "M16 12v12",
    "M4 28h24"
  ),
  cube: mk("M16 4 5 10v12l11 6 11-6V10L16 4Z", "M5 10l11 6 11-6", "M16 16v12"),
  node: mk(
    "M16 4v7",
    "M16 21v7",
    "M4 16h7",
    "M21 16h7",
    "M16 11a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
  ),
  coins: mk(
    "M16 7c5 0 9 1.3 9 3s-4 3-9 3-9-1.3-9-3 4-3 9-3Z",
    "M7 10v12c0 1.7 4 3 9 3s9-1.3 9-3V10",
    "M7 16c0 1.7 4 3 9 3s9-1.3 9-3"
  ),
  users: mk(
    "M11 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    "M3 27c0-4.4 3.6-8 8-8s8 3.6 8 8",
    "M20 4.5a5 5 0 0 1 0 10",
    "M22 27a8 8 0 0 0-4-7"
  ),
  store: mk(
    "M5 13v12a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V13",
    "M4 6h24l2 6a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0l2-6Z",
    "M13 26v-7h6v7"
  ),
  bridge: mk(
    "M3 12c4 0 5 5 13 5s9-5 13-5",
    "M3 12v9",
    "M29 12v9",
    "M10 14v7",
    "M22 14v7",
    "M16 17v4"
  ),
  rampOut: mk("M16 21V5", "M9 12l7-7 7 7", "M6 27h20"),
  card: mk(
    "M3 8h26a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z",
    "M2 14h28",
    "M7 20h7"
  ),
  phone: mk(
    "M11 3h10a1 1 0 0 1 1 1v24a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z",
    "M14 25h4"
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Z" />
    </svg>
  ),
  tg: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.6 18.9 19.2c-.23 1.01-.83 1.26-1.68.78l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.37-.33-.08-.52-.58-.19L7.43 13.2l-4.57-1.43c-1-.31-1.01-1 .21-1.48l17.86-6.88c.83-.31 1.55.19 1.28 1.47Z" />
    </svg>
  ),
  book: (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6a2 2 0 0 1 2-2h18v22H8a2 2 0 0 0-2 2V6Z" />
      <path d="M26 22H8" />
    </svg>
  ),
};

export type IconKey = keyof typeof I;
export type IconNode = ReactNode;

export const REQUIREMENTS = [
  { ic: I.key, n: "Identity" },
  { ic: I.shield, n: "Compliance" },
  { ic: I.coins, n: "Treasury" },
  { ic: I.bridge, n: "Settlement" },
];

export const PROBLEMS = [
  {
    n: "01",
    h: "Fragmented",
    d: "Value is split across more than ten chains, each with incompatible tooling, fees and finality.",
  },
  {
    n: "02",
    h: "Hard to settle",
    d: "Reaching local currency means a chain of intermediaries, and value leaks at every border.",
  },
  {
    n: "03",
    h: "Now regulated",
    d: "Identity, screening and reporting are now mandatory on digital-money flows, not optional.",
  },
];

export const STABLES = [
  {
    h: "Central-bank stablecoins",
    d: "Local-currency money issued under a central bank's framework, with the controls it mandates built in.",
  },
  {
    h: "Dollar stablecoins",
    d: "USD-denominated stablecoins for global value, treasury and settlement to the dollar world.",
  },
  {
    h: "Regulated private stablecoins",
    d: "Privately issued, regulated stablecoins, supported on the same compliant rail.",
  },
];

export const PILLARS = [
  {
    ic: I.shield,
    tag: "01 · Keystone",
    h: "Compliance and identity",
    d: "Issue wallets with KYC, AML and sanctions screening built in. Verified identity and audit trails on every transaction, the control layer the law now requires.",
    pts: [
      "KYC and AML-enabled wallets",
      "Verified business and individual identity",
      "Audit trails on every transaction",
    ],
  },
  {
    ic: I.coins,
    tag: "02",
    h: "Treasury",
    d: "Hold and manage balances across stablecoin types with the controls of a treasury system: policy, approvals, reserves and reporting.",
    pts: [
      "Multi-chain, multi-stablecoin balances",
      "Policy and approval controls",
      "Reserve visibility and reporting",
    ],
  },
  {
    ic: I.users,
    tag: "03",
    h: "Payroll",
    d: "Pay salaries in stablecoins, with tax, pension and compliance split and recorded automatically at the moment of payment.",
    pts: [
      "Tax and pension splits",
      "Recorded at point of payment",
      "Pay to wallet or local rail",
    ],
  },
  {
    ic: I.store,
    tag: "04",
    h: "Commerce standards",
    d: "Standards for stablecoin commerce: accept at point-of-sale terminals and online checkout, with settlement to local currency built in.",
    pts: [
      "POS terminals and online checkout",
      "Common commerce flow standards",
      "Automatic local settlement",
    ],
  },
  {
    ic: I.bridge,
    tag: "05",
    h: "Cross-border protocols",
    d: "Protocols for moving value across borders: bridge stablecoin to stablecoin, and stablecoin to local and dollar currency, compliantly.",
    pts: [
      "Stablecoin to stablecoin bridging",
      "Stablecoin to local and dollar",
      "150+ countries, 10+ currencies",
    ],
  },
  {
    ic: I.code,
    tag: "06",
    h: "Developer layer",
    d: "One API to embed every layer above into any treasury, payroll, commerce or core system, on the rails institutions already run.",
    pts: [
      "Idempotent REST, typed SDKs",
      "Sandbox that mirrors production",
      "Signed, replayable webhooks",
    ],
  },
];

export const FLOW = [
  {
    n: "Step 01",
    ic: I.code,
    h: "Integrate",
    d: "Connect once to one API, or start in a sandbox that mirrors production. Typed SDKs and clear docs.",
  },
  {
    n: "Step 02",
    ic: I.shield,
    h: "Configure compliance",
    d: "Switch on the identity, screening and reporting your market requires. The controls are already built in.",
  },
  {
    n: "Step 03",
    ic: I.coins,
    h: "Launch",
    d: "Issue accounts, run payroll, disburse or accept, on the rails your users already hold.",
  },
  {
    n: "Step 04",
    ic: I.bridge,
    h: "Settle",
    d: "Settle to local currency and dollars through licensed partners, reconciled in one ledger.",
  },
];

export const OUTCOMES = [
  {
    k: "Banks & fintechs",
    p: "Stablecoin & dollar accounts",
    d: "Balances that hold, earn and move in stablecoins, settling to local currency on demand.",
  },
  {
    k: "Enterprises",
    p: "Programmable disbursement",
    d: "Pay vendors, partners and contractors as programmable money that can only be spent as intended, fully traced and auditable.",
  },
  {
    k: "Employers",
    p: "Stablecoin payroll",
    d: "Salaries paid in stablecoins, with tax, pension and compliance split automatically.",
  },
  {
    k: "PSPs & remitters",
    p: "Cross-border settlement",
    d: "Correspondent banking replaced with stablecoin rails, settling in minutes, not days.",
  },
  {
    k: "Merchants",
    p: "Stablecoin acceptance",
    d: "Payments accepted at point of sale and online, settled to local currency automatically.",
  },
];

export const SEGMENTS = [
  {
    k: "Enterprises",
    d: "Disburse to vendors, partners and contractors as programmable money that can only be spent as intended, fully traced and auditable.",
  },
  {
    k: "Banks & financial institutions",
    d: "Hold, issue and settle stablecoin value on a rail that already carries identity, reserves and reporting.",
  },
  {
    k: "Employers",
    d: "Run payroll in stablecoins, with tax, pension and compliance split and recorded at the moment of payment.",
  },
  {
    k: "Merchants",
    d: "Accept stablecoins at point of sale and in ecommerce, and settle to local currency automatically.",
  },
  {
    k: "Developers",
    d: "Build on compliant, multi-chain stablecoin money, through one API.",
  },
];

export const WHY = [
  {
    n: "01",
    h: "Compliant out of the box",
    d: "KYC, AML, screening and reporting are built into every flow, so you launch on the right side of the regulator in each market.",
  },
  {
    n: "02",
    h: "Ship product, not infrastructure",
    d: "Integrate once. We run the chains, custody, gas and settlement, so your team ships product instead of plumbing.",
  },
  {
    n: "03",
    h: "Local and dollar coverage",
    d: "Settle between stablecoins, local currency and dollars in more than 150 countries and over ten currencies.",
  },
  {
    n: "04",
    h: "Institutional security",
    d: "MPC custody, audited infrastructure and policy controls your risk and compliance teams can sign off on.",
  },
  {
    n: "05",
    h: "One partner, the whole stack",
    d: "Compliance, treasury, settlement and the API from a single rail, instead of stitching together vendors.",
  },
];

export const SECURITY = [
  {
    n: "01",
    h: "MPC key management",
    d: "Keys are split across MPC and HSMs, so there is no single point of compromise.",
  },
  {
    n: "02",
    h: "Identity and screening",
    d: "KYC, AML and sanctions screening are embedded in every flow, with full record-keeping.",
  },
  {
    n: "03",
    h: "Encrypted by default",
    d: "End-to-end encryption in transit and at rest, with scoped, rotating API keys.",
  },
  {
    n: "04",
    h: "Auditable by default",
    d: "Immutable audit trails, role-based access and policy controls on every transaction.",
  },
];

export const NUMS = [
  { v: "150+", k: "Countries with on and off-ramp" },
  { v: "10+", k: "Blockchains, one integration" },
  { v: "10+", k: "Fiat payout currencies" },
  { v: "100%", k: "Self-custodial wallets" },
];

const LOGO = "/assets/logos/";

export const MARKS = [
  { img: LOGO + "usdc.svg", n: "USDC" },
  { img: LOGO + "usdt.svg", n: "USDT" },
  { img: LOGO + "eth.svg", n: "Ethereum" },
  { img: LOGO + "base.svg", n: "Base" },
  { img: LOGO + "solana.svg", n: "Solana" },
  { img: LOGO + "polygon.svg", n: "Polygon" },
  { img: LOGO + "arbitrum.svg", n: "Arbitrum" },
  { img: LOGO + "optimism.svg", n: "Optimism" },
  { img: LOGO + "bnb.svg", n: "BNB Chain" },
  { img: LOGO + "avalanche.svg", n: "Avalanche" },
  { img: LOGO + "tron.svg", n: "Tron" },
  { img: LOGO + "celo.svg", n: "Celo" },
];

export const FLAGS: [string, string][] = [
  ["ng", "Nigeria"],
  ["ke", "Kenya"],
  ["gh", "Ghana"],
  ["za", "South Africa"],
  ["us", "United States"],
  ["gb", "United Kingdom"],
  ["in", "India"],
  ["br", "Brazil"],
  ["ph", "Philippines"],
  ["mx", "Mexico"],
  ["id", "Indonesia"],
  ["eu", "Eurozone"],
];

export type Tok = ["c" | "k" | "f" | "s" | "n" | "p" | "pr" | "i" | "", string];
export type Line = Tok[];

export const SNIPPET: Line[] = [
  [["c", "// Issue, condition and move stablecoin money in one call"]],
  [["", ""]],
  [
    ["k", "await"],
    ["p", " rift."],
    ["pr", "transfers"],
    ["p", "."],
    ["f", "create"],
    ["p", "({"],
  ],
  [
    ["i", "  "],
    ["pr", "asset"],
    ["p", ": "],
    ["s", '"USDC"'],
    ["p", ", "],
    ["pr", "amount"],
    ["p", ": "],
    ["n", "5000"],
    ["p", ","],
  ],
  [
    ["i", "  "],
    ["pr", "from"],
    ["p", ": { "],
    ["pr", "wallet"],
    ["p", ": "],
    ["s", '"acct_ada"'],
    ["p", ", "],
    ["pr", "gasless"],
    ["p", ": "],
    ["k", "true"],
    ["p", " },"],
  ],
  [
    ["i", "  "],
    ["pr", "rules"],
    ["p", ": { "],
    ["pr", "restrictTo"],
    ["p", ": "],
    ["s", '"approved_merchants"'],
    ["p", ", "],
    ["pr", "expires"],
    ["p", ": "],
    ["s", '"30d"'],
    ["p", " },"],
  ],
  [
    ["i", "  "],
    ["pr", "offramp"],
    ["p", ": { "],
    ["pr", "currency"],
    ["p", ": "],
    ["s", '"KES"'],
    ["p", ", "],
    ["pr", "rail"],
    ["p", ": "],
    ["s", '"mobile_money"'],
    ["p", " }"],
  ],
  [["p", "})"]],
];
