function Steps() {
  return (
    <section className="bg-[#213547] mt-20 py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2">
            <h2 className="text-3xl md:text-5xl/tight font-medium text-white">
              For Businesses
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="space-y-2 bg-[#0b3a4f] rounded-2xl p-6">
            <p className="text-8xl text-[#aab5c2] font-semibold">1</p>
            <p className="text-white text-xl md:text-2xl font-medium">
              Get liquidity and payments from anywhere
            </p>
            <p className="text-[#aab5c2] text-sm md:text-base">
              Receive instant payments and liquidity from across Africa and the
              world. Rift removes barriers to finance, so your business can
              operate globally without relying on outdated banking systems.
            </p>
          </div>

          <div className="space-y-2 bg-[#0b3a4f] rounded-2xl p-6">
            <p className="text-8xl text-[#aab5c2] font-semibold">2</p>
            <p className="text-white text-xl md:text-2xl font-medium">
              Build your onchain reputation and unlock funding opportunities
            </p>
            <p className="text-[#aab5c2] text-sm md:text-base">
              Rift helps your business establish an onchain identity that builds
              trust with global investors. The stronger your reputation, the
              easier it becomes to access capital and scale faster.
            </p>
          </div>

          <div className="space-y-2 bg-[#0b3a4f] rounded-2xl p-6">
            <p className="text-8xl text-[#aab5c2] font-semibold">3</p>
            <p className="text-white text-xl md:text-2xl font-medium">
              Become a yield-generating asset for global investors
            </p>
            <p className="text-[#aab5c2] text-sm md:text-base">
              Transform your business into an onchain asset that generates
              consistent yield. By opening access to investors worldwide, Rift
              turns your growth into a shared opportunity for profit and impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
