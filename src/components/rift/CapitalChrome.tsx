import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ENQUIRY_LINKS } from "../../lib/enquiry-config";
import { RiftIcon } from "./RiftIcon";

type Menu = "invest" | "company";

export function CapitalNav() {
  const [active, setActive] = useState<Menu | null>(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const anchor = (id: string) => pathname === "/" ? `#${id}` : `/#${id}`;
  const close = () => { setActive(null); setMobile(false); };

  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setActive(null);
        setMobile(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);

  function toggle(menu: Menu) { setActive(active === menu ? null : menu); }

  return <>
    <a className="r-skip" href="#main">Skip to content</a>
    <header className="r-header" ref={root} onKeyDown={e => {
      if (e.key === "Escape") {
        const trigger = active ? `r-nav-${active}` : "r-mobile-toggle";
        close(); document.getElementById(trigger)?.focus();
      }
    }}>
      <div className="r-shell r-nav">
        <Link to="/" className="r-logo" aria-label="Rift home" onClick={close}>
          <img src="/assets/rift-logo.png" width="34" height="34" alt="" /><span>RIFT</span>
        </Link>
        <nav className={`r-navigation ${mobile ? "is-open" : ""}`} id="r-navigation" aria-label="Main navigation">
          <div className="r-nav-item">
            <button id="r-nav-invest" onClick={() => toggle("invest")} aria-expanded={active === "invest"} aria-controls="r-menu-invest">Invest <RiftIcon name="chevron" /></button>
            <div className="r-dropdown r-invest-menu" id="r-menu-invest" hidden={active !== "invest"}>
              <a href="https://wallet.riftfi.com" onClick={close}><RiftIcon name="wallet" /><div><strong>Rift Wallet</strong><p>Your access to real-economy investments.</p></div><RiftIcon name="arrow" /></a>
              <a href={ENQUIRY_LINKS.investor} onClick={close}><RiftIcon name="institution" /><div><strong>Institutional investment</strong><p>Connect your mandate to productive opportunities.</p></div><RiftIcon name="arrow" /></a>
              <Link className="r-menu-bottom" to="/how-it-works" onClick={close}>Understand how Rift works <RiftIcon name="arrow" /></Link>
            </div>
          </div>
          <a href={anchor("fx-liquidity")} onClick={close}>Settlement liquidity</a>
          <Link to="/businesses" onClick={close}>For payment companies</Link>
          <div className="r-nav-item">
            <button id="r-nav-company" onClick={() => toggle("company")} aria-expanded={active === "company"} aria-controls="r-menu-company">Company <RiftIcon name="chevron" /></button>
            <div className="r-dropdown r-company-menu" id="r-menu-company" hidden={active !== "company"}>
              <a href={anchor("vision")} onClick={close}>Our vision <RiftIcon name="arrow" /></a>
              <Link to="/blog" onClick={close}>Journal <RiftIcon name="arrow" /></Link>
              <Link to="/brand" onClick={close}>Brand assets <RiftIcon name="arrow" /></Link>
              <a href="mailto:amschel@riftfi.com" onClick={close}>Contact us <RiftIcon name="arrow" /></a>
            </div>
          </div>
          <Link to="/how-it-works" onClick={close}>How it works</Link>
        </nav>
        <div className="r-nav-right">
          <a href={ENQUIRY_LINKS.financing} className="r-button r-button-dark">Request liquidity</a>
          <button className="r-mobile-toggle" id="r-mobile-toggle" aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile} aria-controls="r-navigation" onClick={() => { setMobile(!mobile); setActive(null); }}><RiftIcon name={mobile ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  </>;
}

export function CapitalFooter() {
  return <footer className="r-footer">
    <div className="r-shell">
      <div className="r-footer-grid">
        <div className="r-footer-brand">
          <Link to="/" className="r-logo" aria-label="Rift home"><img src="/assets/rift-logo.png" width="36" height="36" alt="" /><span>RIFT</span></Link>
          <p>Stablecoin liquidity for payment companies. Before settlement arrives.</p>
        </div>
        <div><h3>Invest</h3><a href="https://wallet.riftfi.com">Rift Wallet</a><a href={ENQUIRY_LINKS.investor}>Institutional investors</a><Link to="/how-it-works">How it works</Link></div>
        <div><h3>Finance</h3><a href={ENQUIRY_LINKS.financing}>Request financing</a><Link to="/how-it-works#settlement">Receivables financing</Link><Link to="/businesses">For payment companies</Link></div>
        <div><h3>Company</h3><a href="/#vision">Our vision</a><Link to="/blog">Journal</Link><Link to="/brand">Brand assets</Link><a href="mailto:amschel@riftfi.com">Contact</a></div>
      </div>
      <div className="r-footer-bottom"><span>© {new Date().getFullYear()} Rift Finance. Sphere Ramp LTD.</span><div><a href="https://x.com/tryrift">X / Twitter</a><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>

    </div>
  </footer>;
}
