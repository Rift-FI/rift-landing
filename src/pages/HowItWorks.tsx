import { useState } from "react";
import { RiftIcon } from "../components/rift/RiftIcon";
import { SettlementExample } from "../components/rift/SettlementExample";
import { ENQUIRY_LINKS } from "../lib/enquiry-config";

const steps = [
  { title: "Verify what is owed", description: "A business submits a receivable: a documented right to payment from an identified counterparty such as a processor, acquirer, bank or settlement partner. We check that the transaction has occurred, who owes the money, the amount, the due date, whether the claim can be assigned and controlled, and the historical failure or reversal rate for payments of that kind.", detail: "An expected transfer alone is not enough; there must be an established obligation behind it. Customer money that must be safeguarded is not treated as freely available collateral." },
  { title: "Agree and fund the advance", description: "The business signs financing and collection agreements. Subject to approval, investor capital funds an advance against a portion of the eligible receivable, supplied in USDC where appropriate.", detail: "An advance below the receivable’s value provides a buffer, and the business funds any remaining payout need. Advance rates, charges and day counts are agreed per facility, and every figure shown on this site is illustrative. Local conversion and payout still depend on the business’s own payment partners." },
  { title: "Collect the repayment", description: "When the receivable settles, proceeds enter an agreed, controlled collection route. The advance, interest and applicable charges are paid, with the remaining balance released according to the agreement.", detail: "Contractual assignment, account control and local enforcement support repayment, but a receivable does not guarantee it: payment may be disputed, delayed, reversed or unpaid. Smart contracts record and route funds they receive; they cannot force a payer to pay." },
  { title: "Distribute investor income", description: "The pool accounts for repayments and distributes income under its investment terms. Investor income comes only from borrower-paid interest actually collected, after applicable fees, expenses and losses.", detail: "A short-dated advance is different from an investor’s lock period. Redemption depends on the pool’s terms and available repayments. No return is guaranteed or projected." },
];

export function HowItWorks() {
  const [selected, setSelected] = useState(0);
  function choose(index: number, focus = false) {
    const next = (index + steps.length) % steps.length;
    setSelected(next);
    if (focus) document.getElementById(`credit-step-${next}`)?.focus();
  }
  return <main id="main" className="r-how">
    <header className="r-how-hero"><div className="r-shell r-how-hero-grid">
      <div><h1>Finance the wait.<br />Keep business moving.</h1><p>Access USDC financing against verified short-term settlement receivables. Built for remittance companies, cross-border payment apps, PSPs, FX businesses and the merchants that settle through them.</p><div className="r-actions"><a href="#settlement" className="r-button r-button-primary">See the financing cycle <RiftIcon name="arrow" /></a><a href={ENQUIRY_LINKS.financing} className="r-link">Discuss a receivable <RiftIcon name="arrow" /></a></div><p className="r-product-status">Financing and investment products are in preparation. Enquiries are open.</p></div>
      <SettlementExample />
    </div></header>

    <section id="settlement" className="r-section r-settlement-cycle"><div className="r-shell">
      <div className="r-section-intro"><h2>A clear repayment source, from the start.</h2><p>Payment companies frequently face timing mismatches between when a transaction must be paid out and when the underlying funds become available through processors, acquirers, banks or settlement partners. This can force them to hold prefunded liquidity across payment corridors. Financing works against the obligation that is already owed.</p></div>
      <div className="r-cycle-layout">
        <div role="tablist" aria-label="The receivables financing cycle" className="r-cycle-tabs">{steps.map((step, i) => <button key={step.title} id={`credit-step-${i}`} role="tab" aria-selected={selected === i} aria-controls="credit-panel" tabIndex={selected === i ? 0 : -1} onClick={() => choose(i)} onKeyDown={e => {
          if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); choose(i + (["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1), true); }
          if (e.key === "Home" || e.key === "End") { e.preventDefault(); choose(e.key === "Home" ? 0 : steps.length - 1, true); }
        }}><span>{String(i + 1).padStart(2, "0")}</span>{step.title}<RiftIcon name="arrow" /></button>)}</div>
        <div className="r-cycle-panel" id="credit-panel" role="tabpanel" aria-labelledby={`credit-step-${selected}`} tabIndex={0}><h3>{steps[selected].title}</h3><p>{steps[selected].description}</p><p className="r-cycle-detail">{steps[selected].detail}</p></div>
      </div>
    </div></section>

    <section className="r-section r-receivable-risk" id="the-gap"><div className="r-shell">
      <div className="r-section-intro"><h2>Why the gap exists.</h2><p>The wait is structural rather than a sign of distress: settlement schedules are set by the rails and by the agreements behind them. Short-duration credit already exists inside the industry, with some networks extending post-funding or T+1 settlement windows to institutional partners. Rift makes that financing available independently.</p></div>
      <div className="r-process-grid">
        <article><RiftIcon name="institution" /><h3>Rails settle at different speeds</h3><p>Card settlements commonly become available to the payment company several days after the transaction, while local bank-transfer and instant rails are typically faster. A payout obligation can therefore fall due well before the matching funds land.</p></article>
        <article><RiftIcon name="financing" /><h3>Payouts run on fixed cycles</h3><p>Aggregator-to-merchant settlement commonly runs on a fixed schedule that is configurable by agreement. Published periods can range from about a day to about a month depending on the payment method and the country.</p></article>
        <article><RiftIcon name="wallet" /><h3>The cost is carried as prefunding</h3><p>To keep paying out on time, a business holds its own cash across payment corridors. That prefunded liquidity is capital sitting idle against settlements that are already owed to it.</p></article>
      </div>
    </div></section>

    <section className="r-section" id="layers"><div className="r-shell">
      <div className="r-section-intro"><h2>Two financeable layers in one settlement.</h2><p>A single transaction creates a claim on each side of the payment company. Both are claims on money that already exists, and each has its own payer and its own repayment source.</p></div>
      <div className="r-receivable-industries">
        <article><RiftIcon name="institution" /><div><h3>Layer A. The payment company is owed</h3><p>The payer is the processor, acquirer, bank or collection entity holding funds due to the payment company. Rift advances against that established obligation, takes an assignment of the claim and agrees a controlled collection route. The advance, financing charge and agreed fees are settled from the incoming payment when the cycle completes.</p></div><span>Repaid by the incoming settlement</span></article>
        <article><RiftIcon name="financing" /><div><h3>Layer B. The merchant is owed</h3><p>The payer is the PSP or aggregator holding a balance that belongs to its merchant. That claim is financeable on the same test: an established obligation, a known amount, a payer we can assess and a settlement date that can be evidenced. Repayment comes from the scheduled payout rather than from the merchant’s future trading.</p></div><span>Repaid by the scheduled payout</span></article>
      </div>
    </div></section>

    <section className="r-yield-section r-section" id="investor-income"><div className="r-shell">
      <div className="r-section-intro"><h2>How your capital can earn.</h2><p>The borrower pays for earlier access to capital. That interest is the source of potential investor income.</p></div>
      <div className="r-process-grid">
        <article><RiftIcon name="institution" /><h3>Choose a defined pool</h3><p>Eligible investors review the assets, duration and fees. Individuals use Rift Wallet; institutions discuss their allocation directly with our team.</p></article>
        <article><RiftIcon name="financing" /><h3>Finance eligible receivables</h3><p>Capital supports approved advances. The pool holds a mix of cash and financing claims as funds are deployed and repaid.</p></article>
        <article><RiftIcon name="wallet" /><h3>Receive your share of income</h3><p>Collections support investor distributions. Charges, adjustments and withdrawals follow each pool’s investment terms.</p></article>
      </div>
      <div className="r-yield-footer"><p>Each facility sets out its financing rate, service charges and payment schedule. Investor distributions follow the terms of the selected pool. Investor income comes only from borrower-paid interest actually collected, after fees, expenses and losses, and no return is guaranteed or projected.</p><a href={ENQUIRY_LINKS.investor} className="r-link">Discuss institutional investment <RiftIcon name="arrow" /></a></div>
    </div></section>

    <section className="r-contact"><div className="r-shell"><h2>Start with a real financing need.</h2><div className="r-contact-grid"><div><h3>For businesses</h3><p>Tell us who owes you, when payment is due and what earlier access to that capital would enable.</p><a className="r-button r-button-primary" href={ENQUIRY_LINKS.financing}>Discuss financing <RiftIcon name="arrow" /></a></div><div><h3>For investors</h3><p>Discuss your mandate with us as we prepare future investment opportunities.</p><div className="r-actions"><a className="r-button r-button-outline" href={ENQUIRY_LINKS.investor}>Express interest <RiftIcon name="arrow" /></a></div></div></div></div></section>
  </main>;
}
