import { FaFire } from "react-icons/fa";
import "../styles/components/partners.scss";

export const Partners = () => {
  return (
    <div id="partners">
      <p className="p_title">
        <FaFire />
        our partners
      </p>

      <div className="_partners_ctr">
        <a
          href="https://www.ayahq.com/"
          target="_blank"
          className="partner_ctr aya"
        >
          <img src="/assets/aya.png" alt="Aya" />
          <span>AyaHQ</span>
        </a>

        <a href="mailto:admin@riftfi.xyz" className="partner_ctr _add">
          <div>
            <p>Partner With Us</p>
            <span>admin@riftfi.xyz</span>
          </div>
        </a>
      </div>
    </div>
  );
};
