import type { ReactNode } from "react";

export type RiftIconName = "wallet" | "institution" | "financing" | "trade" | "energy" | "agriculture" | "mining" | "manufacturing" | "infrastructure" | "arrow" | "chevron" | "menu" | "close" | "check";

const drawings: Record<RiftIconName, ReactNode> = {
  wallet: <><path d="M5 7V5a2 2 0 0 1 2-2h12v4M4 7h16v14H4z" /><path d="M20 11h-6v6h6M17 14h.01" /></>,
  institution: <><path d="m2 7 10-5 10 5H2ZM3 21h18M5 10v8m7-8v8m7-8v8" /></>,
  financing: <><path d="M3 21V3h18M7 16l5-5 4 2 5-6M17 7h4v4" /></>,
  trade: <><path d="M3 8h16l-4-4M21 16H5l4 4" /><path d="M5 12v-1m14 2v-1" /></>,
  energy: <><path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z" /></>,
  agriculture: <><path d="M12 22V11M12 15C4 15 3 10 3 5c6 0 9 3 9 10ZM12 11c0-6 3-9 9-9 0 6-3 9-9 9Z" /></>,
  mining: <><path d="m2 10 10-7 10 7-10 7-10-7ZM2 15l10 7 10-7M7 10l5-3 5 3-5 3-5-3Z" /></>,
  manufacturing: <><path d="M3 21V10l6 3V8l6 4V3h4l2 18H3ZM7 17h1m4 0h1m4 0h1" /></>,
  infrastructure: <><path d="M2 21h20M5 21V9l7-6 7 6v12M9 21v-7h6v7M9 9h6" /></>,
  arrow: <path d="M3 12h17m-6-6 6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  check: <path d="m4 12 5 5L20 6" />,
};

export function RiftIcon({ name, className = "" }: { name: RiftIconName; className?: string }) {
  return <svg className={`r-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[name]}</svg>;
}
