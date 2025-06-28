import Header from "./components/Header.component";
import Intuit from "../../assets/intuit.svg";
import Coinbase from "../../assets/coinbase.svg";
import Lyft from "../../assets/lyft.svg";
import DepositPhotos from "../../assets/depositphotos.svg";

function Hero() {
  return (
    <>
      <div className="bg-[#E9F3F4] py-6">
        <Header />
        <section className="container my-24">
          <div className="grid grid-cols-2 mx-12">
            <div>
              <div>
                <p className="text-6xl font-bold mb-4">Get paid early</p>
                <p className="text-6xl font-medium mb-4">save automatically</p>
                <p className="text-6xl font-medium">all your pay.</p>
              </div>
              <div className="text-[#8792AA] text-base font-medium my-9">
                <p>Supports small businesses with simple invoicing,</p>
                <p>powerful integrations, and cash flow management tools.</p>
              </div>
              <div className="border-1 rounded-2xl border-[#b9bfc7] bg-white inline-block relative w-[390px]">
                <input
                  className="text-sm outline-hidden p-4 w-[68%]"
                  type="text"
                  placeholder="Your business email"
                  // size={10}
                />
                <button
                  className="absolute right-0.5 bg-[#2A8E9E] h-[90%] top-0.5 px-5 rounded-2xl text-white text-sm cursor-pointer"
                  type="button"
                >
                  Get Started
                </button>
              </div>
              <div className="flex items-center gap-x-16">
                <img src={Intuit} alt="Klarna" height={120} width={120} />
                <img src={Coinbase} alt="coinbase" height={120} width={120} />
                <img src={Lyft} alt="lyft" height={60} width={60} />
              </div>
            </div>
            <div>
              <div>
                <div className="w-[70%] mx-auto p-6 bg-white rounded-2xl">
                  <div className="flex items-center gap-x-3 mb-6">
                    <div className="bg-[#2A8E9E] rounded-xl p-2.5">
                      <img
                        src={DepositPhotos}
                        alt="DepositPhotos"
                        height={25}
                        width={25}
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold">Dipa Inhouse</p>
                      <p className="text-sm">dipainhouse@gmail.com</p>
                    </div>
                  </div>
                  <div className="border-1 border-[#b9bfc7] p-4 rounded-2xl mb-2">
                    <p className="text-[#8792AA] text-xs font-medium mb-1">
                      Invoice
                    </p>
                    <p className="font-bold text-4xl mb-1">$1,876,580</p>
                    <p className="text-[#8792AA] text-xs font-medium">
                      April 21, 2024
                    </p>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between border-2 border-[#2A8E9E] p-4 rounded-2xl mb-2">
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                          <path
                            fillRule="evenodd"
                            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <label htmlFor="creditCard">Credit Card</label>
                      </div>

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={true}
                      />
                    </div>

                    <div className="flex justify-between border-1 border-[#b9bfc7] p-4 rounded-2xl mb-4">
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
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

                        <label htmlFor="bankAccount">Bank Account</label>
                      </div>

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankAccount"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="bg-[#213547] text-white text-center rounded-xl py-3 text-sm">
                    Pay
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
