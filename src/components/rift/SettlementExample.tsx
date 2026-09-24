import { RiftIcon } from "./RiftIcon";

export function SettlementExample() {
  return <figure className="r-settlement-example" aria-label="Illustrative financing against a one-million-dollar receivable due in five days">
    <div className="r-receivable-head"><RiftIcon name="trade" /><span>Verified receivable</span><span>USD</span></div>
    <div className="r-receivable-value">$1,000,000</div>
    <p>Expected settlement in 5 days</p>
    <dl className="r-receivable-ledger">
      <div><dt>Illustrative advance rate</dt><dd>90%</dd></div>
      <div><dt>Capital available earlier</dt><dd>$900,000</dd></div>
    </dl>
    <div className="r-receivable-repayment"><RiftIcon name="wallet" /><p>When the receivable pays, collections repay the advance and agreed interest.</p></div>
    <figcaption>Illustrative only. Advance rates and pricing depend on assessment.</figcaption>
  </figure>;
}
