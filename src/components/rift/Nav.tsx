import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { I } from "../../lib/rift-data";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <nav className={"top" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-in">
        <Link className="brand" to="/" aria-label="Rift">
          <img className="mark" src="/assets/rift-logo.png" alt="Rift" />
          Rift
        </Link>
        <div className="nav-links">
          <a href={anchor("capabilities")}>Products</a>
          <a href={anchor("usecases")}>Solutions</a>
          <a href={anchor("developers")}>Developers</a>
          <a href={anchor("wallet")}>Wallet</a>
          <a href={anchor("pricing")}>Pricing</a>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost ghost-hide" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
            Docs
          </a>
          <a className="btn btn-teal" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
            Get API keys {I.arrow}
          </a>
        </div>
      </div>
    </nav>
  );
};
