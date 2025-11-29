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
          we enable you to grow your wealth consistently.
        </p>
      </div>
    </div>
  );
};
