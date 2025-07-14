import WhyUs from "./pages/Why-Us";
import Features from "./pages/Features";
import Hero from "./pages/Hero";
import Steps from "./pages/Steps";
import Stats from "./pages/Stats";
import CTA from "./pages/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Hero />
      <div className="bg-[#FEFEFE] pt-20 pb-4">
        <Features />
        <WhyUs />
        <Steps />
        <Stats />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default App;
