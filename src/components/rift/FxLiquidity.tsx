import { Link } from "react-router-dom";
import { ENQUIRY_LINKS } from "../../lib/enquiry-config";
import { RiftIcon } from "./RiftIcon";

export function FxLiquidity() {
  return <section className="rh-fx" id="fx-liquidity" aria-labelledby="fx-title">
    <div className="r-shell">
      <div className="rh-fx-grid">
        <div className="rh-fx-copy">
          <h2 id="fx-title">Settlement cycles take days.<br />Stablecoins take seconds.</h2>
          <p>The claim is verified off-chain. The money moves on-chain. Rift runs both legs: USDC to you in seconds, and a local stablecoin or tokenized deposit on the payout side wherever that rail exists. A payment that would have waited out a settlement cycle settles now.</p>
          <div className="r-actions"><a className="r-button r-button-primary" href={ENQUIRY_LINKS.financing}>Request settlement liquidity <RiftIcon name="arrow" /></a><Link className="r-link" to="/how-it-works#settlement">How settlement financing works <RiftIcon name="arrow" /></Link></div>
        </div>
        <figure className="rh-fx-example" aria-label="Illustrative example of a settlement advance">
          <figcaption><RiftIcon name="trade" /><span>Illustrative example</span></figcaption>
          <div className="rh-fx-amount"><span>A settlement partner owes you</span><strong>$1,000,000</strong><span>Example settlement date in 5 days</span></div>
          <div className="rh-fx-advance"><span>Illustrative 90% advance</span><strong>$900,000 <small>in USDC</small></strong><p>Available ahead of the receivable’s settlement, once the facility is approved and funded.</p></div>
        </figure>
      </div>
      <div className="rh-fx-steps" aria-label="How settlement financing works">
        <article><RiftIcon name="institution" /><h3>Verify the incoming funds.</h3><p>Share the receivable, the settlement partner and the expected payment date. We confirm that the obligation is established, who owes it and when it is due, then agree your financing terms.</p></article>
        <article><RiftIcon name="trade" /><h3>Move in seconds, not days.</h3><p>Once approved and funded, the advance reaches you in USDC, in seconds on supported networks, at any hour. Where your payout leg runs on a local stablecoin or a tokenized deposit, that side settles on-chain too. Where the last mile is a bank or mobile-money account, it follows that rail’s own timings, and approval and network finality still take their own time.</p></article>
        <article><RiftIcon name="wallet" /><h3>Repay when settlement arrives.</h3><p>Your partner’s payment follows the agreed collection route to repay the advance, the financing charge and any agreed fees. A receivable does not guarantee repayment: payment may be disputed, delayed, reversed or unpaid.</p></article>
      </div>
    </div>
  </section>;
}
