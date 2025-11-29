import { Fragment } from "react";
import { Navbar } from "./components/Nav";
import { Header } from "./components/Header";
import { About } from "./components/About";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <About />
    </Fragment>
  );
}

export default App;
