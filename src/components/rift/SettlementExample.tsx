import { RiftIcon } from "./RiftIcon";

export function SettlementExample() {
  return <figure className="r-settlement-example" aria-label="Illustrative example: financing against a one-million-dollar receivable settling in five days">
    <div className="r-receivable-head"><RiftIcon name="trade" /><span>Verified receivable</span><span>Illustrative</span></div>
    <div className="r-receivable-value">$1,000,000</div>
    <p>Example settlement date in 5 days</p>
    <dl className="r-receivable-ledger">
      <div><dt>Illustrative advance rate</dt><dd>90%</dd></div>
      <div><dt>Example capital available earlier</dt><dd>$900,000</dd></div>
    </dl>
    <div className="r-receivable-repayment"><RiftIcon name="wallet" /><p>When the receivable settles, collections repay the advance and the agreed financing charge.</p></div>
    <figcaption>Illustrative example. Not an offer, quote or indication of terms. Amounts, advance rates and day counts are examples only and are agreed per facility after assessment. A receivable does not guarantee repayment: payment may be disputed, delayed, reversed or unpaid.</figcaption>
  </figure>;
}
