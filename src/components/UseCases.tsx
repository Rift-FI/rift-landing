import { HiUsers } from "react-icons/hi2";
import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import "../styles/components/usecases.scss";

const cases = [
  {
    name: "Olu",
    location: "Lagos, Nigeria",
    tag: "Freelance",
    quote:
      "I used to lose 4% in fees and worry about P2P scams just to get paid. Now I tap withdraw and get Naira in minutes. I keep some in dollars and earn yield automatically.",
  },
  {
    name: "Ama",
    location: "Accra, Ghana",
    tag: "Savings",
    quote:
      "I was scared of exchanges and wallets. With Rift, I deposit GHS from mobile money, get USDC instantly, and watch my savings hold value. It feels like a savings account — just in dollars.",
  },
  {
    name: "Kwame",
    location: "Nairobi, Kenya",
    tag: "Business",
    quote:
      "My supplier accepts USDT. I used to spend hours on exchanges and gas fees. Now I deposit KES, convert to USDC, and send to my supplier. Done. One tap to convert back for payroll.",
  },
  {
    name: "Chioma",
    location: "Lagos, Nigeria",
    tag: "Investing",
    quote:
      "Local brokers had high minimums. With Rift, I deposit Naira, convert to USDC, and buy $20 of Apple stock. I watch it grow alongside my dollar savings.",
  },
  {
    name: "Michael",
    location: "London, UK",
    tag: "Remittance",
    quote:
      "Sending money to my mother in Kenya used to take 3 days and cost 8%. Now I send USDC to her Rift account. She withdraws via mobile money in minutes. I paid 0.5%.",
  },
];

export const UseCases = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div id="usecases">
      <div className="uc_header">
        <div>
          <p className="uc_label">
            <HiUsers />
            Real Stories
          </p>
          <p className="uc_heading">
            People love <span>Rift.</span>
          </p>
        </div>
        <div className="uc_nav">
          <button onClick={() => scroll("left")} aria-label="Previous">
            <GoChevronLeft />
          </button>
          <button onClick={() => scroll("right")} aria-label="Next">
            <GoChevronRight />
          </button>
        </div>
      </div>

      <div className="cases_scroll" ref={scrollRef}>
        {cases.map((c, i) => (
          <div className="case_card" key={i}>
            <span className="case_tag">{c.tag}</span>
            <p className="case_quote">"{c.quote}"</p>
            <div className="case_author">
              <div className="case_avatar">
                {c.name.charAt(0)}
              </div>
              <div>
                <p className="case_name">{c.name}</p>
                <p className="case_loc">{c.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
