import WhyUs from "./pages/Why-Us";
import Features from "./pages/Features";
import Hero from "./pages/Hero";

function App() {
  return (
    <>
      <Hero />
      <div className="bg-[#FEFEFE] py-20">
        <Features />
        <WhyUs />
      </div>
    </>
  );
}

export default App;
