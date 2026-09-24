import { Link } from "react-router-dom";
import { ENQUIRY_LINKS } from "../../lib/enquiry-config";
import { RiftIcon } from "./RiftIcon";

export function FxLiquidity() {
  return <section className="rh-fx" id="fx-liquidity" aria-labelledby="fx-title">
    <div className="r-shell">
      <div className="rh-fx-grid">
        <div className="rh-fx-copy">
          <h2 id="fx-title">Your next payment.<br />Without the settlement wait.</h2>
          <p>Dollar liquidity for remittance companies, FX businesses and payment providers. Bring forward funds owed by your settlement partners, so you can keep customer payments moving.</p>
          <div className="r-actions"><a className="r-button r-button-primary" href={ENQUIRY_LINKS.financing}>Request settlement liquidity <RiftIcon name="arrow" /></a><Link className="r-link" to="/how-it-works#settlement">How FX financing works <RiftIcon name="arrow" /></Link></div>
        </div>
        <figure className="rh-fx-example" aria-label="Illustrative five-day settlement advance">
          <figcaption><RiftIcon name="trade" /><span>A settlement, brought forward</span></figcaption>
          <div className="rh-fx-amount"><span>Your partner owes you</span><strong>$1,000,000</strong><span>Settlement due in 5 days</span></div>
          <div className="rh-fx-advance"><span>Illustrative 90% advance</span><strong>$900,000 <small>in USDC</small></strong><p>Available ahead of the receivable’s settlement, once the facility is approved and funded.</p></div>
          <p className="rh-fx-example-note">Example only. Terms are agreed per facility. Your business covers any remaining payout amount; local conversion and payout depend on your payment partners.</p>
        </figure>
      </div>
      <div className="rh-fx-steps" aria-label="How FX liquidity works">
        <article><RiftIcon name="institution" /><h3>Verify the incoming funds.</h3><p>Share the receivable, settlement partner and expected payment date. We confirm the claim and agree your financing terms.</p></article>
        <article><RiftIcon name="trade" /><h3>Receive USDC, around the clock.</h3><p>Once approved and funded, the advance moves in USDC. Onchain transfers can settle in seconds on supported networks, without waiting for banking hours.</p></article>
        <article><RiftIcon name="wallet" /><h3>Repay when settlement arrives.</h3><p>Your partner’s payment follows the agreed collection route to repay the advance, financing charge and any agreed fees.</p></article>
      </div>
    </div>
  </section>;
}
