import WhyUs from "./pages/Why-Us";
import Features from "./pages/Features";
import Hero from "./pages/Hero";
import Steps from "./pages/Steps";
import Stats from "./pages/Stats";
import CTA from "./pages/CTA";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3 }}
      >
        <Hero />
        <div className="bg-[#FEFEFE] pt-20 pb-4">
          <Features />
          <WhyUs />
          <Steps />
          <Stats />
          <CTA />
          <Footer />
        </div>
      </motion.div>
    </>
  );
}

export default App;
