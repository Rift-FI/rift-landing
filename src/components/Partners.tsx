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
          href="https://www.ayahq.com"
          target="_blank"
          className="partner_ctr aya"
        >
          <img src="/assets/aya.png" alt="Aya" />
          <span>AyaHQ</span>
        </a>

        <a
          href="https://www.celoafricadao.xyz"
          target="_blank"
          className="partner_ctr celo"
        >
          <img src="/assets/CAD.svg" alt="cad" />
          <span>CELO Africa DAO</span>
        </a>

        <a
          href="https://www.base.org"
          target="_blank"
          className="partner_ctr base"
        >
          <img src="/assets/base-logo.svg" alt="base" />
          <span>BASE East Africa</span>
        </a>

        <a
          href="https://www.liquidroyalty.com"
          target="_blank"
          className="partner_ctr liquidroyalty"
        >
          <img src="/assets/liquidroyalty.webp" alt="LRP" />
          <span>Liquid Royalty</span>
        </a>

        <a
          href="https://www.sasapay.co.ke"
          target="_blank"
          className="partner_ctr celo"
        >
          <img src="/assets/sasapay.png" alt="sasa pay" />
          <span>Sasa Pay</span>
        </a>

        <a
          href="https://pretium.africa"
          target="_blank"
          className="partner_ctr pretium"
        >
          <img src="/assets/pretium.png" alt="pretium" />
          <span>Pretium</span>
        </a>

        <a
          href="https://web3clubs.xyz"
          target="_blank"
          className="partner_ctr labs"
        >
          <img src="/assets/web3clubs.png" alt="LRP" />
          <span>Web3 Clubs</span>
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
