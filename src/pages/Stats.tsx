import { ArrowUpRight } from "lucide-react";

function Stats() {
  return (
    <section className="container mt-10 mb-32">
      <div className="flex flex-col items-center">
        <p className="text-[#2A8E9E] text-sm font-medium mb-3">OUR MISSION</p>
        <h2 className="text-3xl md:text-5xl/tight font-medium text-black text-center">
          Complete payment infrastructure
          <br />
          for growing businesses
        </h2>
        <p className="text-[#6e7a93] text-sm md:text-base font-medium mt-4 text-center">
          From invoice creation to multi-channel payments,
          <br />
          we're building the next generation of business payments.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-12 md:mt-16 not-sm:gap-8">
        <div className="text-center md:justify-self-end">
          <p className="text-7xl font-semibold">1000+</p>
          <p className="text-[#213547] text-sm md:text-base font-semibold mt-2">
            Businesses served
          </p>
        </div>
        <div className="text-center">
          <p className="text-7xl font-semibold">5+</p>
          <p className="text-[#213547] text-sm md:text-base font-semibold mt-2">
            Payment methods
          </p>
        </div>
        <div className="text-center md:justify-self-start">
          <p className="text-7xl font-semibold">24/7</p>
          <p className="text-[#213547] text-sm md:text-base font-semibold mt-2">
            Payment processing
          </p>
        </div>
      </div>
      <div className="mt-24">
        <p className="text-[#213547] text-sm font-medium mb-3 text-center">
          CHOOSE PLAN:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-[#E9F3F4] rounded-2xl p-6 md:p-10 space-y-20">
            <h2 className="text-3xl md:text-5xl/tight font-medium">Business</h2>
            <div className="flex justify-between">
              <span className="text-xl md:text-2xl font-medium">
                1% flat fee
              </span>
              <span className="cursor-pointer">
                <ArrowUpRight />
              </span>
            </div>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScXU4NMfJmsEE0qsJ5z5ALslnUZi-9OhfrAGdTNhC-fxk4fJQ/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2a8e9e] rounded-2xl p-6 md:p-10 text-white space-y-20 block"
          >
            <h2 className="text-3xl md:text-5xl/tight font-medium">
              Enterprise
            </h2>
            <div className="flex justify-between">
              <span className="text-xl md:text-2xl font-medium">
                Custom pricing
              </span>
              <span className="cursor-pointer">
                <ArrowUpRight />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Stats;
