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
                    Elevate your money,
                    <br />
                    Experience the
                    <br />
                    Future.
                </p>

                <p className="info">
                    Rift gives you direct secure access to world class yield generating assets <br />
                    with a single USD account to <RotateText words={["Save.", "Pay.", "& Build your wealth."]} />
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
