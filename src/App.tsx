import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/rift/Nav";
import { Footer } from "./components/rift/sections";
import { ScrollToTop } from "./components/motion/ScrollToTop";
import { Home } from "./pages/Home";
import { Businesses } from "./pages/Businesses";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";

function App() {
  // dark theme only — no switching
  return (
    <div className="theme-dark">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
