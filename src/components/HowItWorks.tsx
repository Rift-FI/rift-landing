import { TbSettingsCog } from "react-icons/tb";
import { FiUserPlus, FiSend, FiTrendingUp } from "react-icons/fi";
import "../styles/components/howitworks.scss";

const steps = [
  {
    icon: <FiUserPlus />,
    counter: "01",
    title: "Sign Up in",
    highlight: "Minutes",
    desc: "Open Rift with your email, phone, or username. No complex onboarding, no jargon. Just you and your money.",
  },
  {
    icon: <FiSend />,
    counter: "02",
    title: "Add Money,",
    highlight: "Get Dollars",
    desc: "Deposit local currency via bank transfer, mobile money, or card. Get USDC instantly at the best rate. The crypto part is invisible.",
  },
  {
    icon: <FiTrendingUp />,
    counter: "03",
    title: "Save, Invest,",
    highlight: "Spend",
    desc: "Earn yield on your balance. Buy fractional US stocks. Spend with a virtual card. Send money globally. All in one app.",
  },
];

export const HowItWorks = () => {
  return (
    <div id="howitworks">
      <p className="h_label">
        How it works
        <TbSettingsCog />
      </p>

      <p className="h_heading">
        From Setup to First
        <br />
        Transaction in <span>Minutes.</span>
      </p>

      <div className="steps_grid">
        {steps.map((s, i) => (
          <div className="step_card" key={i}>
            <span className="step_icon">{s.icon}</span>
            <span className="step_counter">{s.counter}</span>
            <p className="step_title">
              {s.title} <span>{s.highlight}</span>
            </p>
            <p className="step_desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
