import { TbSettingsCog } from "react-icons/tb";
import "../styles/components/howitworks.scss";

export const HowItWorks = () => {
  return (
    <div id="howitworks">
      <div className="howitworks__ctr">
        <p className="h_title">
          How it works
          <TbSettingsCog className="h_icon" />
        </p>

        <p className="h_sub">
          From Setup to First
          <br />
          Transaction in Minutes
        </p>

        <p className="h__sub">
          We built Rift to make it easy for you to manage your finances and grow
          your wealth.
        </p>

        <div className="step">
          <span className="counter">01</span>
          <p className="s_title">
            Sign Up in <span>Minutes</span>
          </p>
          <p className="s_desc">
            Getting started with Rift is easy and fast, use your email address,
            <br />
            phone number, or a username to get started.
          </p>
        </div>

        <div className="step">
          <span className="counter">02</span>
          <p className="s_title">
            Transact <span>Securely</span>
          </p>
          <p className="s_desc">
            Enjoy fast, secure and low-cost transactions powered by blockchain
            and stablecoins.
          </p>
        </div>

        <div className="step last">
          <span className="counter">03</span>
          <p className="s_title">
            <span>Grow</span> your wealth
          </p>
          <p className="s_desc">
            Grow your wealth by just having a balance on Rift.
          </p>
        </div>
      </div>
    </div>
  );
};
