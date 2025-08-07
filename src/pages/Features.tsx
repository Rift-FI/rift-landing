import Transfers from "../assets/transfers.svg";
import Accounts from "../assets/accounts.svg";
import Shield from "../assets/shield.svg";

function Features() {
  return (
    <>
      <section className="container">
        <div className="flex flex-col lg:flex-row md:justify-between lg:items-center">
          <div>
            <p className="text-[#2A8E9E] text-sm font-medium mb-3">
              CRYPTO PAYMENT PLATFORM
            </p>
            <h2 className="text-3xl md:text-5xl/tight font-medium text-black">
              Solutions built for
              <br />
              African businesses.
            </h2>
          </div>
          <div className="text-sm not-sm:mt-4 md:text-lg font-normal text-[#6e7a93]">
            Accept USDC payments, reduce transaction costs,
            <br />
            and expand your customer base with instant
            <br />
            crypto-to-fiat conversion
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mt-12 md:mt-14 px-6">
          <div>
            <img className="size-8" src={Transfers} width={50} loading="lazy" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Low-Cost Transactions
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Save on payment processing fees with just 1% flat fee compared to 
              traditional 3% PSP charges. Instant USDC settlements.
            </p>
          </div>
          <div>
            <img className="size-8" src={Accounts} width={50} loading="lazy" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Instant Off-ramping
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Convert USDC to local currency instantly with direct transfers to 
              mobile money and bank accounts across Kenya and Africa.
            </p>
          </div>
          <div>
            <img className="size-8" src={Shield} width={50} loading="lazy" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Developer SDK
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Integrate crypto payments into any application with our comprehensive 
              SDK. Gas fees abstracted, wallet creation simplified.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
