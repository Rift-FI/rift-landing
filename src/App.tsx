import { Fragment } from "react";
import { Navbar } from "./components/Nav";
import { Header } from "./components/Header";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Partners } from "./components/Partners";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <About />
      <Features />
      <HowItWorks />
      <Partners />
      <Footer />
    </Fragment>
  );
}

export default App;
