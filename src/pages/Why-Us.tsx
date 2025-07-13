import DepositPhotos from "../assets/depositphoto.svg";
import Transfer from "../assets/transfer.svg";
import Chart from "../components/why-us/AreaChart";

function WhyUs() {
  return (
    <section className="container mt-32">
      <div className="flex flex-col items-center">
        <p className="text-[#2A8E9E] text-sm font-medium mb-3">WHY US</p>
        <h2 className="text-3xl md:text-5xl/tight font-medium text-black">
          Why they prefer Paylio
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-6 lg:px-8">
        <div className="bg-[#E9F3F4] rounded-2xl p-8 lg:p-14 text-xl md:text-3xl font-semibold text-black">
          <p className="text-[#2A8E9E] text-6xl mb-8 lg:text-8xl">3k+</p>
          Businesses already running on Paylio
        </div>
        <div className="bg-[#E9F3F4] rounded-2xl p-8 lg:p-14 text-xl md:text-3xl font-semibold text-black">
          Instantly withdraw your funds at any time
          <div className="flex justify-around md:justify-evenly mt-8">
            <div className="bg-[#2A8E9E] rounded-xl p-2.5 md:p-4 inline-block">
              <img
                src={DepositPhotos}
                alt="DepositPhotos"
                height={25}
                width={25}
              />
            </div>
            <img src={Transfer} height={25} width={100} />
            <div className="bg-[#213547] rounded-full p-3 md:p-4 inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffffff"
                className="size-6"
              >
                <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                <path
                  fillRule="evenodd"
                  d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z"
                  clipRule="evenodd"
                />
                <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 bg-[#E9F3F4] rounded-2xl lg:grid grid-cols-3 pt-8 px-2 md:px-10 lg:pt-10 lg:px-14 gap-2">
          <div className="text-xl md:text-3xl font-semibold text-black mb-4 lg:pt-12">
            No asset volatility
            <p className="text-[#6e7a93] text-sm md:text-base font-medium mt-2">
              Create a financial experience and automate repeat purchases by
              scheduling recurring payments.
            </p>
          </div>
          <div className="bg-white pt-4 px-4 lg:px-8 lg:pt-8 rounded-t-2xl md:col-span-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#6e7a93]">Summary</span>
              <span className="text-[#2A8E9E]">6 Months *</span>
            </div>
            <p className="font-bold text-xl md:text-3xl text-black mt-2">
              $1,876,580
            </p>
            <div className="h-40 md:h-70">
              <Chart />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}

export default WhyUs;
