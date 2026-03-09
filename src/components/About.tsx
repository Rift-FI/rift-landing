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
                    The bridge between
                    <br />
                    your money and the world.
                </p>

                <p className="_desc">
                    Stablecoins are the most important financial innovation for
                    <br />
                    emerging markets — Rift makes them simple, useful, and accessible to everyone.
                </p>
            </div>
        </div>
    );
};
