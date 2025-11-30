import { FaFire } from "react-icons/fa";
import "../styles/components/partners.scss";

export const Partners = () => {
  return (
    <div id="partners">
      <p className="p_title">
        <FaFire />
        our partners
      </p>

      <div className="partners_ctr">
        <img src="/assets/aya.webp" alt="Aya" />
      </div>
    </div>
  );
};
