import { useState } from "react";
import { RiftIcon } from "../components/rift/RiftIcon";
import { SettlementExample } from "../components/rift/SettlementExample";
import { ENQUIRY_LINKS } from "../lib/enquiry-config";

const steps = [
  { title: "Verify what is owed", description: "A business submits a receivable: a documented right to payment from an identified counterparty. We assess the payer, due date, ownership, disputes and any existing claims on it.", detail: "An expected transfer alone is not enough. Customer money that must be safeguarded is not treated as freely available collateral." },
  { title: "Agree and fund the advance", description: "The business signs financing and collection agreements. Subject to approval, investor capital funds an advance against a portion of the eligible receivable, using USDC where appropriate.", detail: "An advance below the receivable’s value provides a buffer. The business funds any remaining payout need. Actual local settlement still depends on payment partners and banking rails." },
  { title: "Collect the repayment", description: "When the receivable settles, proceeds enter an agreed, controlled collection route. The advance, interest and applicable charges are paid, with the remaining balance released according to the agreement.", detail: "Contractual assignment, account control and local enforcement support repayment. Smart contracts record and route funds they receive; they cannot force a payer to pay." },
  { title: "Distribute investor income", description: "The pool accounts for repayments and distributes income under its investment terms. Investor returns come from borrower-paid interest after applicable fees, expenses and losses.", detail: "A five-day advance is different from an investor’s lock period. Redemption depends on the pool’s terms and available repayments." },
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
      <div><h1>Finance the wait.<br />Keep business moving.</h1><p>Turn settlement receivables, customer payment contracts and accepted invoices into capital for your business.</p><div className="r-actions"><a href="#settlement" className="r-button r-button-primary">See the financing cycle <RiftIcon name="arrow" /></a><a href={ENQUIRY_LINKS.financing} className="r-link">Discuss a receivable <RiftIcon name="arrow" /></a></div><p className="r-product-status">Financing and investment products are in preparation. Enquiries are open.</p></div>
      <SettlementExample />
    </div></header>

    <section id="settlement" className="r-section r-settlement-cycle"><div className="r-shell">
      <div className="r-section-intro"><h2>A clear repayment source, from the start.</h2><p>A remittance business may be owed money in five days but need liquidity today. Receivables financing bridges that gap against an eligible payment obligation.</p></div>
      <div className="r-cycle-layout">
        <div role="tablist" aria-label="The receivables financing cycle" className="r-cycle-tabs">{steps.map((step, i) => <button key={step.title} id={`credit-step-${i}`} role="tab" aria-selected={selected === i} aria-controls={`credit-panel-${i}`} tabIndex={selected === i ? 0 : -1} onClick={() => choose(i)} onKeyDown={e => {
          if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); choose(i + (["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1), true); }
          if (e.key === "Home" || e.key === "End") { e.preventDefault(); choose(e.key === "Home" ? 0 : steps.length - 1, true); }
        }}><span>{String(i + 1).padStart(2, "0")}</span>{step.title}<RiftIcon name="arrow" /></button>)}</div>
        <div className="r-cycle-panel" id={`credit-panel-${selected}`} role="tabpanel" aria-labelledby={`credit-step-${selected}`} tabIndex={0}><h3>{steps[selected].title}</h3><p>{steps[selected].description}</p><p className="r-cycle-detail">{steps[selected].detail}</p></div>
      </div>
    </div></section>

    <section className="r-yield-section r-section" id="investor-income"><div className="r-shell">
      <div className="r-section-intro"><h2>How your capital can earn.</h2><p>The borrower pays for earlier access to capital. That interest is the source of potential investor income.</p></div>
      <div className="r-process-grid">
        <article><RiftIcon name="institution" /><h3>Choose a defined pool</h3><p>Eligible investors review the assets, duration and fees. Individuals use Rift Wallet; institutions discuss their allocation directly with our team.</p></article>
        <article><RiftIcon name="financing" /><h3>Finance eligible receivables</h3><p>Capital supports approved advances. The pool holds a mix of cash and financing claims as funds are deployed and repaid.</p></article>
        <article><RiftIcon name="wallet" /><h3>Receive your share of income</h3><p>Collections support investor distributions. Charges, adjustments and withdrawals follow each pool’s investment terms.</p></article>
      </div>
      <div className="r-yield-footer"><p>Each facility sets out its financing rate, service charges and payment schedule. Investor distributions follow the terms of the selected pool.</p><a href={ENQUIRY_LINKS.investor} className="r-link">Discuss institutional investment <RiftIcon name="arrow" /></a></div>
    </div></section>

    <section className="r-section"><div className="r-shell">
      <div className="r-section-intro"><h2>The same principle. Different industries.</h2><p>A credible payment obligation can support financing across the productive economy. Each sector needs its own assessment and structure.</p></div>
      <div className="r-receivable-industries">
        <article><RiftIcon name="trade" /><div><h3>Trade and exports</h3><p>Accepted invoices for goods already delivered to an assessed buyer.</p></div><span>Buyer payment</span></article>
        <article><RiftIcon name="agriculture" /><div><h3>Agriculture</h3><p>Verified receivables from delivered produce or processed goods. Future harvests require a different structure.</p></div><span>Offtaker payment</span></article>
        <article><RiftIcon name="energy" /><div><h3>Energy</h3><p>Existing PAYGo customer contracts and eligible energy invoices. Customer collections can support financing for new installations.</p></div><span>Customer collections</span></article>
        <article><RiftIcon name="manufacturing" /><div><h3>Manufacturing and services</h3><p>Accepted invoices from completed deliveries or services, with a clear payer and due date.</p></div><span>Customer payment</span></article>
      </div>
    </div></section>



    <section className="r-contact"><div className="r-shell"><h2>Start with a real financing need.</h2><div className="r-contact-grid"><div><h3>For businesses</h3><p>Tell us who owes you, when payment is due and what earlier access to that capital would enable.</p><a className="r-button r-button-primary" href={ENQUIRY_LINKS.financing}>Discuss financing <RiftIcon name="arrow" /></a></div><div><h3>For investors</h3><p>Discuss your mandate with us, or explore Rift Wallet as we prepare future investment opportunities.</p><div className="r-actions"><a className="r-button r-button-outline" href={ENQUIRY_LINKS.investor}>Express interest <RiftIcon name="arrow" /></a><a className="r-link" href="https://wallet.riftfi.com">Explore the wallet <RiftIcon name="arrow" /></a></div></div></div></div></section>
  </main>;
}
