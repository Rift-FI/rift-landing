import { ArrowUpRight } from "lucide-react";

function Stats() {
  return (
    <section className="container mt-32 mb-32">
      <div className="flex flex-col items-center">
        <p className="text-[#2A8E9E] text-sm font-medium mb-3">OUR MISSION</p>
        <h2 className="text-3xl md:text-5xl/tight font-medium text-black text-center">
          We've helped
          <br />
          innovative companies
        </h2>
        <p className="text-[#6e7a93] text-sm md:text-base font-medium mt-4 text-center">
          Hundreds of all sizes and across all industries
          <br />
          have made big improvements with us.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-12 md:mt-16 not-sm:gap-8">
        <div className="text-center md:justify-self-end">
          <p className="text-7xl font-semibold">24%</p>
          <p className="text-[#213547] text-sm md:text-base font-semibold mt-2">
            Business revenue
          </p>
        </div>
        <div className="text-center">
          <p className="text-7xl font-semibold">180K</p>
          <p className="text-[#213547] text-sm md:text-base font-semibold mt-2">
            In annual revenue
          </p>
        </div>
        <div className="text-center md:justify-self-start">
          <p className="text-7xl font-semibold">10+</p>
          <p className="text-[#213547] text-sm md:text-base font-semibold mt-2">
            Months of runway
          </p>
        </div>
      </div>
      <div className="mt-24">
        <p className="text-[#213547] text-sm font-medium mb-3 text-center">
          CHOOSE PLAN:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-[#E9F3F4] rounded-2xl p-6 md:p-10 space-y-20">
            <h2 className="text-3xl md:text-5xl/tight font-medium">Plus</h2>
            <div className="flex justify-between">
              <span className="text-xl md:text-2xl font-medium">
                £2.99/month
              </span>
              <span className="cursor-pointer">
                <ArrowUpRight />
              </span>
            </div>
          </div>
          <div className="bg-[#2a8e9e] rounded-2xl p-6 md:p-10 text-white space-y-20">
            <h2 className="text-3xl md:text-5xl/tight font-medium">Premium</h2>
            <div className="flex justify-between">
              <span className="text-xl md:text-2xl font-medium">
                £6.99/month
              </span>
              <span className="cursor-pointer">
                <ArrowUpRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
