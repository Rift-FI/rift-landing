import WhyUs from "./pages/Why-Us";
import Features from "./pages/Features";
import Hero from "./pages/Hero";
import Steps from "./pages/Steps";
import Stats from "./pages/Stats";
import CTA from "./pages/CTA";

function App() {
  return (
    <>
      <Hero />
      <div className="bg-[#FEFEFE] py-20">
        <Features />
        <WhyUs />
        <Steps />
        <Stats />
        <CTA />
      </div>
    </>
  );
}

export default App;
