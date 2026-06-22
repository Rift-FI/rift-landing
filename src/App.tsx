import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/rift/Nav";
import { Footer } from "./components/rift/sections";
import { ScrollToTop } from "./components/motion/ScrollToTop";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";

function App() {
  // dark theme only — no switching
  return (
    <div className="theme-dark">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
