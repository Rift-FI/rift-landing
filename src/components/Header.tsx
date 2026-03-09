import { MdStars } from "react-icons/md";
import { RotateText } from "./ui/animated-text";
import "../styles/components/header.scss";

export const Header = () => {
  return (
    <div id="header">
      <div className="l1">
        <span className="welcome">
          Welcome to Rift
          <MdStars id="_icon" />
        </span>

        <p className="about">
          Your money,
          <br />
          without borders.
        </p>

        <p className="info">
          A simple app that lets you move between local currency and digital
          dollars — then{" "}
          <RotateText words={["Save.", "Invest.", "Spend.", "Send globally."]} />
        </p>

        <div className="header_actions">
          <a
            href="https://wallet.riftfi.xyz/"
            target="_blank"
            className="getstrated"
          >
            Get Started
          </a>
          <a href="mailto:admin@riftfi.xyz" className="contact_link">
            Contact Sales
          </a>
        </div>
      </div>

      <div className="l2" />
    </div>
  );
};
