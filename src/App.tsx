import { Fragment } from "react";
import { Navbar } from "./components/Nav";
import { Header } from "./components/Header";

import { Features } from "./components/Features";
import { ForBusiness } from "./components/ForBusiness";
import { HowItWorks } from "./components/HowItWorks";
import { UseCases } from "./components/UseCases";
import { WhyRift } from "./components/WhyRift";
import { Coverage } from "./components/Coverage";
import { Partners } from "./components/Partners";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <Features />
      <ForBusiness />
      <HowItWorks />
      <UseCases />
      <WhyRift />
      <Coverage />
      <Partners />
      <Footer />
    </Fragment>
  );
}

export default App;
