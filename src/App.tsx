import { SEO } from "./components/SEO";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CapitalNav, CapitalFooter } from "./components/rift/CapitalChrome";
import "./styles/capital.scss";
import "./styles/capital-pages.scss";
import { ScrollToTop } from "./components/motion/ScrollToTop";
import { Home } from "./pages/Home";
import { Businesses } from "./pages/Businesses";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Brand } from "./pages/Brand";
import { HowItWorks } from "./pages/HowItWorks";

function PageRoutes() {
  const { pathname } = useLocation();
  if (pathname === "/") return <><ScrollToTop /><Home /></>;
  if (pathname === "/brand") return <><ScrollToTop /><Brand /></>;
  // dark theme only — no switching
  return (
    <div className="rift-site">
      <ScrollToTop />
      <CapitalNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CapitalFooter />
    </div>
  );
}

export default function App() { return <><SEO /><PageRoutes /></>; }
