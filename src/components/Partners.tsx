import { FaFire } from "react-icons/fa";
import "../styles/components/partners.scss";

const partners = [
  {
    name: "AyaHQ",
    logo: "/assets/aya.png",
    href: "https://www.ayahq.com",
    theme: "aya",
  },
  {
    name: "BASE East Africa",
    logo: "/assets/base-logo.svg",
    href: "https://www.base.org",
    theme: "base",
  },
  {
    name: "Liquid Royalty",
    logo: "/assets/liquidroyalty.webp",
    href: "https://www.liquidroyalty.com",
    theme: "liquidroyalty",
  },
  {
    name: "Sasa Pay",
    logo: "/assets/sasapay.png",
    href: "https://www.sasapay.co.ke",
    theme: "celo",
  },
  {
    name: "Pretium",
    logo: "/assets/pretium.png",
    href: "https://pretium.africa",
    theme: "pretium",
  },
  {
    name: "Web3 Clubs",
    logo: "/assets/web3clubs.png",
    href: "https://web3clubs.xyz",
    theme: "labs",
  },
];

export const Partners = () => {
  // Double the array for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <div id="partners">
      <p className="p_label">
        <FaFire />
        Trusted By
      </p>

      <p className="p_heading">
        Our Partners
      </p>

      <div className="marquee_wrapper">
        <div className="marquee_fade left" />
        <div className="marquee_track">
          {doubled.map((p, i) => (
            <a
              href={p.href}
              target="_blank"
              className={`partner_card ${p.theme}`}
              key={i}
            >
              <img src={p.logo} alt={p.name} />
              <span>{p.name}</span>
            </a>
          ))}
        </div>
        <div className="marquee_fade right" />
      </div>

      <div className="partner_cta">
        <a href="mailto:admin@riftfi.xyz" className="cta_card">
          <p>Want to partner with us?</p>
          <span>admin@riftfi.xyz</span>
        </a>
      </div>
    </div>
  );
};
