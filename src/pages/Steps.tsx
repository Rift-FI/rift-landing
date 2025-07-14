function Steps() {
  return (
    <section className="bg-[#213547] mt-20 py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2">
            <p className="text-[#2A8E9E] text-sm font-medium mb-3">STEPS</p>
            <h2 className="text-3xl md:text-5xl/tight font-medium text-white">
              Maximize your returns with a reserve account that generates
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="space-y-2 bg-[#0b3a4f] rounded-2xl p-6">
            <p className="text-8xl text-[#aab5c2] font-semibold">1</p>
            <p className="text-white text-xl md:text-2xl font-medium">
              Open your account
            </p>
            <p className="text-[#aab5c2] text-sm md:text-base">
              Sign up to Paylio and set up your account from the dashboard.
            </p>
          </div>
          <div className="space-y-2 bg-[#0b3a4f] rounded-2xl p-6">
            <p className="text-8xl text-[#aab5c2] font-semibold">2</p>
            <p className="text-white text-xl md:text-2xl font-medium">
              Transfer your money
            </p>
            <p className="text-[#aab5c2] text-sm md:text-base">
              Move money into your account and start earning up.
            </p>
          </div>
          <div className="space-y-2 bg-[#0b3a4f] rounded-2xl p-6">
            <p className="text-8xl text-[#aab5c2] font-semibold">3</p>
            <p className="text-white text-xl md:text-2xl font-medium">
              Watch your balance grow
            </p>
            <p className="text-[#aab5c2] text-sm md:text-base">
              Move money into your account and start earning up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
