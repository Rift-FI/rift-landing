function CTA() {
  return (
    <section className="container">
      <div className=" bg-[#213547] rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-10 gap-8">
          <div className="space-y-4">
            <p className="text-[#2A8E9E] text-sm font-medium">TRY IT NOW</p>
            <h2 className="text-3xl md:text-5xl/tight font-medium text-white">
              Ready to level up your payment process?
            </h2>
            <p className="text-[#6e7a93] text-sm md:text-base font-medium mt-4">
              Supports small businesses with simple invoicing, powerful
              integrations, and cash flow management tools.
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <button className="border-1 border-[#2A8E9E] rounded-xl items-center justify-center px-5 py-3 bg-[#2A8E9E] text-white text-sm font-normal cursor-pointer">
              Get Started Now
            </button>
            <button className="border-1 border-[#2A8E9E] rounded-xl items-center justify-center px-5 py-3 text-white text-sm font-normal cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
