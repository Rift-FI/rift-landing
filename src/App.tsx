import WhyUs from "./pages/Why-Us";
import Features from "./pages/Features";
import Hero from "./pages/Hero";
import Steps from "./pages/Steps";

function App() {
  return (
    <>
      <Hero />
      <div className="bg-[#FEFEFE] py-20">
        <Features />
        <WhyUs />
        <Steps />
      </div>
    </>
  );
}

export default App;
