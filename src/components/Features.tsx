import { GoRocket } from "react-icons/go";
import "../styles/components/features.scss";

export const Features = () => {
  return (
    <div id="features">
      <p className="title">
        Features <GoRocket className="features_icon" />
      </p>

      <div className="title-desc">
        <p className="_title">
          Unleashing the power
          <br />
          of Finance
        </p>
        <p className="_desc">
          At Rift, we empower you to take control of your finances like never
          before. Rift is packed with cutting-edge features designed to
          revolutionize your financial experience, from seamless transactions to
          investment opportunities.
        </p>
      </div>
    </div>
  );
};
