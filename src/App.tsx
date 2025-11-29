import { Fragment } from "react";
import { Navbar } from "./components/Nav";
import { Header } from "./components/Header";
import { About } from "./components/About";
import { Features } from "./components/Features";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <About />
      <Features />
    </Fragment>
  );
}

export default App;
