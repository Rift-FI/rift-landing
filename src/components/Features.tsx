import { GoRocket } from "react-icons/go";
import "../styles/components/features.scss";

export const Features = () => {
  return (
    <div id="features">
      <p className="title">
        Features <GoRocket />
      </p>

      <div className="title-desc">
        <p className="_title">
          Unleashing the power
          <br />
          of Finance.
        </p>
        <p className="_desc">
          At Rift, we empower you to take control of your finances like never
          before. Rift is packed with cutting-edge features designed to
          revolutionize your financial experience, from seamless transactions to
          investment opportunities.
        </p>
      </div>

      <div className="__features">
        <div className="f_left">
          <p className="f_title">Instant, Secure Payments</p>
          <p className="f_desc">
            Built on blockchain, we guarantee your peace of mind through secure
            transfers at lightning speed with every transaction.
          </p>

          <div className="f_bg_image" />
        </div>

        <div className="f_right">
          <div className="feature">
            <span>
              <p className="f_title">Multi-currency and Cross-Border Ready</p>
              <p className="f_desc">
                One platform, endless possibilities. Send, receive, pay and
                invest globally without the borders.
                <br />
              </p>
            </span>

            <div className="f_bg_image crossborder" />
          </div>

          <div className="feature">
            <span>
              <p className="f_title">Smart Insights and Spending Analytics</p>
              <p className="f_desc">
                Let your data work for you, we help you keep track of your
                investments and spending.
                <br />
              </p>
            </span>

            <div className="f_bg_image insights" />
          </div>
        </div>
      </div>
    </div>
  );
};
