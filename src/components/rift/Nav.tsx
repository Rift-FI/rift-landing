import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 6);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={"top" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-in">
        <Link className="brand" to="/" onClick={closeMenu}>
          <img className="mark" src="/assets/rift-logo.png" alt="" />
          <span className="wm">Rift</span>
        </Link>
        <div className="nav-links">
          <a href={anchor("how")}>How it works</a>
          <a href={anchor("who")}>Who it is for</a>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="nav-cta">
          <a className="btn btn-primary hide-xs" href="/#contact">
            Get in touch
          </a>
          <button
            type="button"
            className={"nav-burger" + (menuOpen ? " is-open" : "")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={"nav-mobile" + (menuOpen ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-backdrop" onClick={closeMenu} />
        <div className="nav-mobile-panel">
          <a href={anchor("how")} onClick={closeMenu}>How it works</a>
          <a href={anchor("who")} onClick={closeMenu}>Who it is for</a>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <a href="/#contact" onClick={closeMenu}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
};
