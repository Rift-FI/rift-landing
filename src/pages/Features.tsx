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
              COMPLETE PAYMENT INFRASTRUCTURE
            </p>
            <h2 className="text-3xl md:text-5xl/tight font-medium text-black">
              Everything you need to
              <br />
              get paid, anywhere.
            </h2>
          </div>
          <div className="text-sm not-sm:mt-4 md:text-lg font-normal text-[#6e7a93]">
            Create invoices, accept payments via USDC or M-Pesa,
            <br />
            receive money through paybill, bank, or till numbers.
            <br />
            Your complete payment solution.
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mt-12 md:mt-14 px-6">
          <div>
            <img className="size-8" src={Transfers} width={50} loading="lazy" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Invoice & Payment Creation
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Create professional invoices, send payment links, and get paid instantly 
              via USDC or M-Pesa. Perfect for businesses without existing payment systems.
            </p>
          </div>
          <div>
            <img className="size-8" src={Accounts} width={50} loading="lazy" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Multiple Payment Channels
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Receive payments through paybill numbers, bank accounts, till numbers, 
              or direct USDC transfers. One platform, all payment methods.
            </p>
          </div>
          <div>
            <img className="size-8" src={Shield} width={50} loading="lazy" />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              KYB & Compliance
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Complete KYB approval process, regulatory compliance, and secure 
              account setup. Built for legitimate businesses ready to scale.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
