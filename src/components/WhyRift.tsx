import { FaBolt } from "react-icons/fa6";
import "../styles/components/whyrift.scss";

const points = [
  "The simplest on-ramp to digital dollars",
  "Save, invest, spend — all in one app",
  "No wallets, no gas fees, no seed phrases",
  "Built for emerging markets, not traders",
  "The infrastructure other apps build on",
];

export const WhyRift = () => {
  return (
    <div id="whyrift">
      <div className="whyrift__ctr">
        <div className="wr_left">
          <p className="wr_label">
            <FaBolt /> Why Rift
          </p>

          <p className="wr_heading">
            Money that finally works
            <br />
            the way it <span>should.</span>
          </p>

          <p className="wr_desc">
            We're not building another crypto app. We're building the default
            way people in emerging markets access the global economy. The
            blockchain is invisible — you just see your money, working for you.
          </p>

          <a href="https://wallet.riftfi.xyz/" target="_blank" className="wr_btn">
            Try Rift Today
          </a>
        </div>

        <div className="wr_right">
          {points.map((p, i) => (
            <div className="wr_point" key={i}>
              <span className="wr_check">&#10003;</span>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
