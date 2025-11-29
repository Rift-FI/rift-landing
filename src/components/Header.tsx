import { MdStars } from "react-icons/md";
import "../styles/components/header.scss";

export const Header = () => {
  return (
    <div id="header">
      <div className="l1">
        <span className="welcome">
          Welcome to Rift
          <MdStars className="icon" />
        </span>

        <p className="about">
          Elevate your money,
          <br />
          Experience the
          <br />
          Future.
        </p>

        <p className="info">
          Rift transforms the way you pay, save and build your wealth
          <br />
          with a single account.
        </p>

        <a
          href="https://wallet.riftfi.xyz/"
          target="_blank"
          className="getstrated"
        >
          Get Started
        </a>
      </div>

      <div className="l2" />
    </div>
  );
};
