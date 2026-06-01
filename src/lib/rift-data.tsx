import type { ReactNode } from "react";

const S = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const I = {
  arrow: (
    <svg {...S}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  arrowUR: (
    <svg {...S}><path d="M7 17 17 7M8 7h9v9" /></svg>
  ),
  check: (
    <svg {...S} strokeWidth={2.4}><path d="M20 6 9 17l-5-5" /></svg>
  ),
  rampIn: (
    <svg {...S}><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></svg>
  ),
  rampOut: (
    <svg {...S}><path d="M12 15V3M7 8l5-5 5 5" /><path d="M5 21h14" /></svg>
  ),
  swap: (
    <svg {...S}><path d="M7 4 3 8l4 4" /><path d="M3 8h14" /><path d="m17 20 4-4-4-4" /><path d="M21 16H7" /></svg>
  ),
  wallet: (
    <svg {...S}><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2" /><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3" /><path d="M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" /></svg>
  ),
  fuel: (
    <svg {...S}><path d="M3 21h10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16Z" /><path d="M3 11h10" /><path d="M16 8l2 2v7a2 2 0 0 0 4 0V9.5L18 5" /></svg>
  ),
  sign: (
    <svg {...S}><path d="M3 17c3-1 4-9 7-9s3 6 5 6 2-3 6-3" /><path d="M3 21h18" /></svg>
  ),
  code: (
    <svg {...S}><path d="m8 6-6 6 6 6M16 6l6 6-6 6" /></svg>
  ),
  layers: (
    <svg {...S}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></svg>
  ),
  shield: (
    <svg {...S}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  lock: (
    <svg {...S}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  ),
  key: (
    <svg {...S}><circle cx="7.5" cy="15.5" r="3.5" /><path d="m10 13 8-8M16 7l2 2M19 4l2 2" /></svg>
  ),
  doc: (
    <svg {...S}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
  ),
  bolt: (
    <svg {...S}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
  ),
  plus: (
    <svg {...S}><path d="M12 5v14M5 12h14" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Z" />
    </svg>
  ),
  tg: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M21.94 4.6 18.9 19.2c-.23 1.01-.83 1.26-1.68.78l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.37-.33-.08-.52-.58-.19L7.43 13.2l-4.57-1.43c-1-.31-1.01-1 .21-1.48l17.86-6.88c.83-.31 1.55.19 1.28 1.47-.09.45-.18.9-.27 1.32Z" />
    </svg>
  ),
};

export type Cap = { ic: ReactNode; t: string; d: string; tag: string };

export const CAPS: Cap[] = [
  { ic: I.rampIn, t: "On-ramps", d: "Let users buy stablecoins with local fiat via bank transfer, mobile money or card, across 150+ countries.", tag: "150+ countries" },
  { ic: I.rampOut, t: "Off-ramps", d: "Cash out stablecoins to 10+ fiat currencies and settle straight to local rails. One call, money lands.", tag: "10+ payout currencies" },
  { ic: I.wallet, t: "Embedded wallets", d: "Spin up self-custodial wallets via Google, email or phone. No seed phrases, no extensions, no friction.", tag: "Social + passkey login" },
  { ic: I.swap, t: "Stablecoin swaps", d: "Route USDC, USDT and more across 10+ chains with best-execution. Cross-chain handled for you.", tag: "10+ chains" },
  { ic: I.fuel, t: "Gas abstraction", d: "Sponsor gas so your users never hold a native token. Pay fees in stablecoins, or eat them entirely.", tag: "Gasless UX" },
  { ic: I.sign, t: "Transaction signing", d: "Sign any transaction through a secure signing layer with policy controls, MPC and full audit trails.", tag: "Policy + MPC" },
];

const LOGO = "/assets/logos/";

export const COINS = [
  { id: "USDC", img: LOGO + "usdc.svg" },
  { id: "USDT", img: LOGO + "usdt.svg" },
];

export const CHAINS = [
  { id: "eth",  n: "Ethereum",  img: LOGO + "eth.svg" },
  { id: "base", n: "Base",      img: LOGO + "base.svg" },
  { id: "poly", n: "Polygon",   img: LOGO + "polygon.svg" },
  { id: "sol",  n: "Solana",    img: LOGO + "solana.svg" },
  { id: "arb",  n: "Arbitrum",  img: LOGO + "arbitrum.svg" },
  { id: "op",   n: "Optimism",  img: LOGO + "optimism.svg" },
  { id: "bsc",  n: "BNB Chain", img: LOGO + "bnb.svg" },
  { id: "avax", n: "Avalanche", img: LOGO + "avalanche.svg" },
  { id: "tron", n: "Tron",      img: LOGO + "tron.svg" },
  { id: "celo", n: "Celo",      img: LOGO + "celo.svg" },
];

export type UseCase = { badge: string; t: string; d: string; pts: string[] };

export const USECASES: UseCase[] = [
  {
    badge: "Neobanks",
    t: "Launch a dollar account",
    d: "Give customers a USD-denominated balance that earns, spends and settles, without a banking licence or correspondent network.",
    pts: ["Stablecoin balances + yield", "Virtual cards & spending", "Local on/off-ramp built in"],
  },
  {
    badge: "Fintechs",
    t: "Move money cross-border",
    d: "Replace slow correspondent banking with stablecoin rails. Pay out to 150+ countries in minutes, not days.",
    pts: ["Instant global payouts", "FX at stablecoin rates", "One reconciliation ledger"],
  },
  {
    badge: "Startups",
    t: "Ship crypto in a weekend",
    d: "Add wallets, swaps and ramps with a few API calls. We abstract chains, gas and signing so you ship product, not plumbing.",
    pts: ["Wallets in one call", "Gasless transactions", "Sandbox to prod in days"],
  },
];

export type Sec = { ic: ReactNode; t: string; d: string };

export const SECURITY: Sec[] = [
  { ic: I.shield, t: "KYC / AML built in", d: "Configurable identity verification and sanctions screening in 150+ countries." },
  { ic: I.key, t: "MPC key management", d: "Keys split with MPC and HSMs, with no single point of compromise." },
  { ic: I.lock, t: "Encrypted by default", d: "End-to-end encryption in transit and at rest, with scoped, rotating API keys." },
  { ic: I.doc, t: "Audit & compliance", d: "Immutable audit logs, role-based access and policy controls on every transaction." },
];

export type Price = { n: string; pp: string; sub: string; d: string; feat: boolean; pts: string[]; cta: string; style: "teal" | "ghost" };

export const PRICING: Price[] = [
  {
    n: "Build",
    pp: "$0",
    sub: "/ forever",
    d: "Full sandbox access to every API. Perfect for prototyping.",
    feat: false,
    pts: ["All endpoints in sandbox", "Test wallets & ramps", "Community support", "Up to 100 test users"],
    cta: "Start building",
    style: "ghost",
  },
  {
    n: "Scale",
    pp: "Usage",
    sub: "-based",
    d: "Go live with transparent per-transaction pricing. No setup fees.",
    feat: true,
    pts: ["Production API keys", "On/off-ramp in 150+ countries", "Gas sponsorship", "Priority support & SLAs"],
    cta: "Talk to sales",
    style: "teal",
  },
  {
    n: "Enterprise",
    pp: "Custom",
    sub: "",
    d: "Dedicated infrastructure, custom rails and compliance support.",
    feat: false,
    pts: ["Volume pricing", "Dedicated liquidity routes", "Custom KYC flows", "Named solutions engineer"],
    cta: "Contact us",
    style: "ghost",
  },
];

export const FLAGS: [string, string][] = [
  ["ng", "Nigeria"], ["ke", "Kenya"], ["gh", "Ghana"], ["za", "South Africa"],
  ["us", "United States"], ["gb", "United Kingdom"], ["in", "India"], ["br", "Brazil"],
  ["ph", "Philippines"], ["mx", "Mexico"], ["id", "Indonesia"], ["eu", "Eurozone"],
];
