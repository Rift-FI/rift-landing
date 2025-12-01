import { FaLightbulb } from "react-icons/fa";
import "../styles/components/about.scss";

export const About = () => {
    return (
        <div id="about">
            <div className="aboutctr">
                <p className="title">
                    <FaLightbulb className="icon" /> About Us
                </p>

                <p className="desc">
                    Where money meets
                    <br />
                    Innovation and Growth.
                </p>

                <p className="_desc">
                    Rift is more than a payments platform,
                    <br />
                    we enable you to bank globally and grow your wealth.
                </p>
            </div>
        </div>
    );
};
