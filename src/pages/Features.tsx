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
              FUTURE PAYMENT
            </p>
            <h2 className="text-3xl md:text-5xl/tight font-medium text-black">
              Experience that grows
              <br />
              with your scale.
            </h2>
          </div>
          <div className="text-sm not-sm:mt-4 md:text-lg font-normal text-[#6e7a93]">
            Design a financial operating system that works for
            <br />
            your business and streamlined cash flow
            <br />
            management
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mt-12 md:mt-14 px-6">
          <div>
            <img className="size-8" src={Transfers} width={50} />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Free Transfers
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Create a financial experience and automate repeat purchases by
              scheduling recurring payments.
            </p>
          </div>
          <div>
            <img className="size-8" src={Accounts} width={50} />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Multiple Accounts
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Run your operations with cash from your account and generate yield
              on funds stored in the account.
            </p>
          </div>
          <div>
            <img className="size-8" src={Shield} width={50} />
            <h3 className="text-xl md:text-2xl font-semibold text-black mt-6 mb-2 md:mb-4">
              Unmatched Security
            </h3>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium">
              Securely manage your finances with organization-wide MFA,
              card-locking and account-level controls.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
