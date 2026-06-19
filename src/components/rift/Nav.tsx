import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 6);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <nav className={"top" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-in">
        <Link className="brand" to="/">
          <img className="mark" src="/assets/rift-logo.png" alt="" />
          <span className="wm">Rift</span>
        </Link>
        <div className="nav-links">
          <a href={anchor("platform")}>Platform</a>
          <a href={anchor("segments")}>Solutions</a>
          <a href={anchor("connect")}>Integrations</a>
          <a href={anchor("security")}>Security</a>
          <a href={anchor("company")}>Company</a>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="nav-cta">
          <a className="tlink hide-sm" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
            Read the docs
          </a>
          <a className="btn btn-primary" href="mailto:admin@riftfi.xyz">
            Talk to us
          </a>
        </div>
      </div>
    </nav>
  );
};
