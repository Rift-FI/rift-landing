import { useEffect, useState } from "react";

/**
 * Public rates feed. All-in local currency per 1 USDC.
 * `offramp` is what a recipient gets when USDC is paid out to them.
 *
 * FALLBACK is a snapshot of the live feed (2026-11-11). It renders first so
 * the page never waits on the network or shifts when the fetch lands; the
 * live numbers then roll into place. If the fetch fails the page says
 * "Indicative" instead of "Live".
 */
export type Rate = {
  currency: string;
  symbol: string;
  decimals: number;
  onramp: number;
  offramp: number;
  perTransactionMax: number;
};

export type Corridor = {
  cc: string;
  country: string;
  currency: string;
  currencyName: string;
  rails?: string[];
};

/** Live corridors, in the order the page lists them. */
export const CORRIDORS: Corridor[] = [
  { cc: "KE", country: "Kenya", currency: "KES", currencyName: "Kenyan shilling", rails: ["M-Pesa", "Bank", "Till", "Paybill"] },
  { cc: "UG", country: "Uganda", currency: "UGX", currencyName: "Ugandan shilling" },
  { cc: "TZ", country: "Tanzania", currency: "TZS", currencyName: "Tanzanian shilling" },
  { cc: "GH", country: "Ghana", currency: "GHS", currencyName: "Ghanaian cedi" },
  { cc: "MW", country: "Malawi", currency: "MWK", currencyName: "Malawian kwacha" },
  { cc: "NG", country: "Nigeria", currency: "NGN", currencyName: "Nigerian naira", rails: ["Bank"] },
];

const FALLBACK: Record<string, Rate> = {
  KES: { currency: "KES", symbol: "KSh", decimals: 2, onramp: 128.1281, offramp: 127.872, perTransactionMax: 245000 },
  UGX: { currency: "UGX", symbol: "USh", decimals: 0, onramp: 3973.1331, offramp: 3965.1908, perTransactionMax: 5000000 },
  TZS: { currency: "TZS", symbol: "TSh", decimals: 0, onramp: 2794.1102, offramp: 2486.9538, perTransactionMax: 4800000 },
  GHS: { currency: "GHS", symbol: "GH₵", decimals: 2, onramp: 14.5015, offramp: 10.9714, perTransactionMax: 1000 },
  MWK: { currency: "MWK", symbol: "MK", decimals: 2, onramp: 3396.8787, offramp: 2805.7215, perTransactionMax: 5000000 },
  NGN: { currency: "NGN", symbol: "₦", decimals: 2, onramp: 1405.38, offramp: 1387.08, perTransactionMax: 1000000 },
};

const RATES_URL = "https://payment.riftfi.xyz/v1/rates";

export type RatesState = { rates: Record<string, Rate>; live: boolean; updatedAt: Date | null };

// One request per page view, shared by every component that asks.
let pending: Promise<RatesState> | null = null;

function load(): Promise<RatesState> {
  if (pending) return pending;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 6000);
  pending = fetch(RATES_URL, { signal: ctrl.signal })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((j: { currencies?: Partial<Rate>[]; updatedAt?: string }) => {
      const rates = { ...FALLBACK };
      for (const c of j.currencies ?? []) {
        const base = c.currency ? FALLBACK[c.currency] : undefined;
        if (!base || typeof c.offramp !== "number" || !(c.offramp > 0)) continue;
        rates[base.currency] = { ...base, ...c } as Rate;
      }
      const at = j.updatedAt ? new Date(j.updatedAt) : new Date();
      return { rates, live: true, updatedAt: isNaN(at.getTime()) ? new Date() : at };
    })
    .catch(() => ({ rates: FALLBACK, live: false, updatedAt: null }))
    .finally(() => clearTimeout(t));
  return pending;
}

export function useRates(): RatesState {
  const [s, set] = useState<RatesState>({ rates: FALLBACK, live: false, updatedAt: null });
  useEffect(() => {
    let on = true;
    load().then((x) => on && set(x));
    return () => {
      on = false;
    };
  }, []);
  return s;
}

export const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
