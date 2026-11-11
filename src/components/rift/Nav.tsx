import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_URL, CONTACT_HREF, DOCS_URL } from "../../lib/links";

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
      <a className="announce" href={APP_URL} data-testid="announce-app">
        <span>
          <strong>Rift Payments is live.</strong>
          <span className="announce-sub"> Send, receive and cash out stablecoins.</span>
        </span>
        <span className="announce-cta">Open the app <span aria-hidden="true">→</span></span>
      </a>
      <div className="wrap nav-in">
        <Link className="brand" to="/" onClick={closeMenu}>
          <img className="mark" src="/assets/rift-logo.png" alt="" />
          <span className="wm">Rift</span>
        </Link>
        <div className="nav-links">
          <a href={anchor("payments")}>Payments</a>
          <a href={anchor("walletos")}>WalletOS</a>
          <a href={DOCS_URL}>Docs</a>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="nav-cta">
          <a className="btn btn-app hide-xs" href={APP_URL}>
            Open app
          </a>
          <a className="btn btn-primary hide-xs" href={CONTACT_HREF}>
            Talk to us
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
          <a href={anchor("payments")} onClick={closeMenu}>Payments</a>
          <a href={anchor("walletos")} onClick={closeMenu}>WalletOS</a>
          <a href={DOCS_URL} onClick={closeMenu}>Docs</a>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <a href={APP_URL} onClick={closeMenu}>Open the app</a>
          <a href={CONTACT_HREF} onClick={closeMenu}>
            Talk to us
          </a>
        </div>
      </div>
    </nav>
  );
};
