import { IoEarth } from "react-icons/io5";
import "../styles/components/coverage.scss";

const countries = [
  { name: "Nigeria", code: "NGN", flag: "\u{1F1F3}\u{1F1EC}" },
  { name: "Kenya", code: "KES", flag: "\u{1F1F0}\u{1F1EA}" },
  { name: "Ghana", code: "GHS", flag: "\u{1F1EC}\u{1F1ED}" },
  { name: "South Africa", code: "ZAR", flag: "\u{1F1FF}\u{1F1E6}" },
  { name: "Ethiopia", code: "ETB", flag: "\u{1F1EA}\u{1F1F9}" },
  { name: "Uganda", code: "UGX", flag: "\u{1F1FA}\u{1F1EC}" },
];

export const Coverage = () => {
  return (
    <div id="coverage">
      <div className="coverage__ctr">
        <p className="cv_label">
          <IoEarth /> Coverage
        </p>

        <p className="cv_heading">
          Available Where
          <br />
          You Need Us.
        </p>

        <p className="cv_desc">
          We're focused on emerging markets where access to the global economy
          matters most. More countries launching soon.
        </p>

        <span className="cv_badge live">Live Now</span>
        <div className="cv_cards">
          {countries.map((c, i) => (
            <div className="cv_card" key={i}>
              <span className="cv_flag">{c.flag}</span>
              <div className="cv_info">
                <p className="cv_name">{c.name}</p>
                <span className="cv_code">{c.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
