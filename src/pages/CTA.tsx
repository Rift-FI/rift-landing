function CTA() {
  return (
    <section className="container">
      <div className=" bg-[#213547] rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-6 md:p-10 gap-8">
          <div className="space-y-4">
            <p className="text-[#2A8E9E] text-sm font-medium">TRY IT NOW</p>
            <h2 className="text-3xl md:text-5xl/tight font-medium text-white">
              Ready to transform your business with crypto payments?
            </h2>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium mt-4">
              Join hundreds of African businesses saving costs and expanding globally 
              with Rift Finance's crypto payment platform.
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScXU4NMfJmsEE0qsJ5z5ALslnUZi-9OhfrAGdTNhC-fxk4fJQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="border-1 border-[#2A8E9E] rounded-xl items-center justify-center px-5 py-3 bg-[#2A8E9E] text-white text-sm font-normal cursor-pointer inline-flex">
              Start Accepting Crypto
            </a>
            <a href="https://docs.riftfi.xyz" target="_blank" rel="noopener noreferrer" className="border-1 border-[#2A8E9E] rounded-xl items-center justify-center px-5 py-3 text-white text-sm font-normal cursor-pointer inline-flex">
              View SDK Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
