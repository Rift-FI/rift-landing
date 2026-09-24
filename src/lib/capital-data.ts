import type { RiftIconName } from "../components/rift/RiftIcon";

export const sectors: { id: string; name: string; icon: RiftIconName; description: string }[] = [
  { id: "trade", name: "Trade & FX liquidity", icon: "trade", description: "Our initial focus: financing against eligible, short-term settlement receivables for remittance and FX businesses." },
  { id: "energy", name: "Energy", icon: "energy", description: "Financing for power generation, distribution and the businesses expanding access to reliable energy." },
  { id: "agriculture", name: "Agriculture", icon: "agriculture", description: "Capital for producers, processors and exporters across the agricultural value chain." },
  { id: "mining", name: "Mining & resources", icon: "mining", description: "Financing for equipment, processing and responsible production across resource supply chains." },
  { id: "manufacturing", name: "Manufacturing", icon: "manufacturing", description: "Working capital and equipment financing for businesses turning raw materials into finished goods." },
  { id: "infrastructure", name: "Infrastructure", icon: "infrastructure", description: "Capital for logistics, transport and the essential networks that help economies grow." },
];

export const questions = [
  ["What is Rift?", "Rift is developing financing against verified business receivables, starting with the settlement gap for remittance and FX companies. We connect eligible investor capital with approved advances and their repayment cash flows. Our wider vision includes trade, agriculture, energy and other productive sectors."],
  ["How do I invest as an individual?", "Investment products are still being structured. Rift Wallet is the intended entry point for individual investors. When opportunities become available, eligibility requirements, investment terms and risk information will be shown in the wallet. The sectors on this website describe our broader focus, rather than a list of investments currently available."],
  ["Where does the yield come from?", "A business pays interest for earlier access to capital against an eligible receivable. When repayments reach the pool, they support investor distributions after applicable fees, expenses and losses. Holding USDC by itself does not generate this income. A short advance does not mean investors can withdraw at any time."],
  ["Does a receivable guarantee repayment?", "No. The payment may be disputed, delayed or unpaid. Our proposed controls include verification of the payer and receivable, legal assignment or security, controlled collections, advance-rate buffers and concentration limits. Customer money subject to safeguarding is not treated as freely available collateral."],
  ["Can my institution invest?", "We welcome expressions of interest from insurers, pension funds, venture capital firms, hedge funds, DFIs and other institutional investors. Tell us about your mandate, sectors of interest and intended allocation so we can discuss potential fit."],
  ["How can my business request financing?", "Complete the business financing enquiry form with your operating market, sector, financing needs and intended use of funds. The Rift team will review your enquiry and contact you about potential next steps. An enquiry does not guarantee funding."],
  ["What should I understand before investing?", "Investments can lose value, including principal. Borrower repayment, currency movements, liquidity and technology can all affect an investment. Returns are not guaranteed. Eligibility, investment duration and withdrawal terms depend on the specific opportunity. Review its terms and risk information before investing."],
];
