import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsSendFill, BsShopWindow, BsPeopleFill } from "react-icons/bs";
import { TbApi } from "react-icons/tb";
import "../styles/components/forbusiness.scss";

const features = [
  {
    icon: <BsSendFill />,
    title: "B2B Payments",
    desc: "Pay international suppliers instantly in stablecoins. No more waiting days for wire transfers or dealing with correspondent banks.",
    accent: true,
  },
  {
    icon: <BsShopWindow />,
    title: "Merchant Settlement",
    desc: "Accept stablecoin payments from customers and settle in local currency automatically. Expand your customer base globally.",
    accent: false,
  },
  {
    icon: <BsPeopleFill />,
    title: "Global Payroll",
    desc: "Pay remote team members in stablecoins or their local currency of choice. No more expensive international wire fees.",
    accent: false,
  },
  {
    icon: <TbApi />,
    title: "APIs Coming Soon",
    desc: "Embed Rift into your own app — offer dollar savings, stablecoin payments, or global investments to your users.",
    accent: true,
  },
];

export const ForBusiness = () => {
  return (
    <div id="forbusiness">
      <p className="fb_label">
        <HiOutlineBuildingOffice2 /> For Business
      </p>

      <div className="fb_header">
        <p className="fb_heading">
          Built for Businesses
          <br />
          That Move <span>Fast.</span>
        </p>
        <p className="fb_desc">
          Whether you're paying suppliers, settling merchants, or running
          payroll across borders — Rift gives your business the rails to move
          money globally without friction.
        </p>
      </div>

      <div className="fb_grid">
        {features.map((f, i) => (
          <div className={`fb_card${f.accent ? " accent" : ""}`} key={i}>
            <span className="fb_card_icon">{f.icon}</span>
            <p className="fb_card_title">{f.title}</p>
            <p className="fb_card_desc">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="fb_cta">
        <a href="mailto:admin@riftfi.xyz" className="fb_cta_btn">
          Talk to our team
        </a>
        <span className="fb_cta_sub">admin@riftfi.xyz</span>
      </div>
    </div>
  );
};
