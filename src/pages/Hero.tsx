import Header from "../components/Header";
import DepositPhotos from "../assets/depositphoto.svg";
import NFC from "../assets/nfc.svg";
import { ArrowUpRight } from "lucide-react";

function Hero() {
  return (
    <>
      <div className="bg-[#E9F3F4] pt-8">
        <Header />

        <section className="container cursor-default mt-14 md:pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:px-6">
            <div>
              <div className="text-5xl md:text-6xl xl:text-7xl">
                <p className="font-bold mb-3">Complete payment</p>
                <p className="font-medium mb-3">infrastructure for</p>
                <p className="font-medium">next-level businesses.</p>
              </div>
              <div className="text-[#6e7a93] text-lg/tight md:text-xl font-normal my-8">
                <p>
                  Create invoices, get paid in USDC or M-Pesa, receive money via paybill, bank, 
                  or till numbers. Built for businesses ready to tap into new markets.
                </p>
              </div>
              <div className="mb-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScXU4NMfJmsEE0qsJ5z5ALslnUZi-9OhfrAGdTNhC-fxk4fJQ/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2A8E9E] px-8 py-4 rounded-2xl text-white text-base cursor-pointer flex gap-2 items-center inline-flex"
                >
                  Talk to Us
                  <ArrowUpRight />
                </a>
              </div>
              <div className="flex items-center gap-x-16 text-sm md:text-base font-semibold text-[#6e7a93]">
                <span>Malkia Fashion</span>
                <span>Baobab Electronics</span>
                <span>Umoja Crafts</span>
              </div>
            </div>

            <div className="size-full flex items-center justify-center cursor-default relative not-lg:mt-14 not-sm:hidden">
              <div className="w-[54%] lg:w-[75%] xl:w-[68%] p-6 md:p-8 bg-white rounded-2xl">
                <div className="flex items-center gap-x-3 mb-6">
                  <div className="bg-[#2A8E9E] rounded-xl p-2.5">
                    <img
                      src={DepositPhotos}
                      alt="DepositPhotos"
                      height={25}
                      width={25}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold">Malkia Fashion</p>
                    <p className="text-sm text-[#6e7a93] font-medium">
                      invoices@malkiafashion.ke
                    </p>
                  </div>
                </div>
                <div className="border-1 border-[#b9bfc7] p-5 rounded-2xl mb-2">
                  <p className="text-[#6e7a93] text-xs font-medium mb-1">
                    Invoice #INV-2024-001
                  </p>
                  <p className="font-bold text-4xl mb-1">KES 120,000</p>
                  <p className="text-[#6e7a93] text-xs font-medium">
                    Due: December 20, 2024
                  </p>
                </div>
                <div>
                  <div className="flex items-center border-2 border-[#2A8E9E] px-5 py-4 rounded-2xl mb-2">
                    <label
                      htmlFor="creditCard"
                      className="w-full flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                        <path
                          fillRule="evenodd"
                          d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <div className="w-full flex justify-between items-center text-sm font-medium">
                        <span>Pay with USDC</span>
                        <label className="relative w-4 h-4 flex items-center justify-center border-2 border-[#2A8E9E] rounded-full">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            className="peer appearance-none absolute w-full h-full m-0"
                            checked={true}
                          />
                          <div className="w-2 h-2 bg-[#2A8E9E] rounded-full scale-0 peer-checked:scale-100 transition-transform duration-150"></div>
                        </label>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center border-1 border-[#b9bfc7] px-5 py-4 rounded-2xl mb-2">
                    <label
                      htmlFor="creditCard"
                      className="w-full flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                        <path
                          fillRule="evenodd"
                          d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z"
                          clipRule="evenodd"
                        />
                        <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                      </svg>

                      <div className="w-full flex justify-between items-center text-sm font-medium">
                        <span>Pay with M-Pesa</span>
                        <label className="relative w-4 h-4 flex items-center justify-center border-2 border-[#b9bfc7] rounded-full">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bankAccount"
                            className="peer appearance-none absolute w-full h-full m-0"
                            disabled
                          />
                          <div className="w-2 h-2 bg-[#2A8E9E] rounded-full scale-0 peer-checked:scale-100 transition-transform duration-150"></div>
                        </label>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-[#213547] text-white text-center rounded-xl py-3 mt-4 text-sm font-medium">
                  Pay
                </div>
              </div>
              <div className="w-[30%] lg:w-[40%] xl:w-[35%] rounded-2xl overflow-hidden text-white absolute bottom-1/2 left-7/12">
                <div className="h-50 bg-[#2A8E9E] p-6">
                  <p className="text-sm font-light">USDC Wallet</p>
                  <p className="text-xl font-medium">0xA1B2 **** ****</p>
                </div>
                <div className="flex justify-between items-center py-1 px-6 bg-[#213547]">
                  <span className="text-white text-sm font-medium">USDC</span>
                  <img src={NFC} alt="NFC" width={30} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
