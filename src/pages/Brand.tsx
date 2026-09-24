import { CapitalNav, CapitalFooter } from "../components/rift/CapitalChrome";
import { RiftIcon } from "../components/rift/RiftIcon";
import { sectors } from "../lib/capital-data";
import "../styles/capital.scss";

export const Brand = () => <div className="rift-site">
  <CapitalNav />
  <main id="main">
    <section className="r-brand-intro"><div className="r-shell"><h1>Rift brand assets</h1><p>A consistent identity for the connection between capital and Africa’s productive economy.</p><div className="r-actions" style={{ marginTop: 30 }}><a href="/brand/rift-brand-kit.zip" download className="r-button r-button-primary">Download brand kit <RiftIcon name="arrow" /></a></div></div></section>
    <div className="r-shell">
      <section className="r-brand-row"><div><h2>The Rift logo</h2><p>Use the existing Rift symbol with its original proportions. Keep clear space around the logo and place it on a simple background.</p><a href="/brand/rift-symbol.png" download className="r-link">Download symbol <RiftIcon name="arrow" /></a></div><div className="r-logo-sample"><div className="r-logo"><img src="/assets/rift-logo.png" alt="Rift symbol" /><span>RIFT</span></div></div></section>
      <section className="r-brand-row"><div><h2>Colour</h2><p>Midnight anchors the identity. Rift blue signals action. Ice provides a quiet background for imagery and content.</p></div><div className="r-brand-colors">{[["Midnight", "#192535"], ["Rift blue", "#007D96"], ["Ice", "#EEF4F7"]].map(([name, color]) => <div key={name}><div style={{ background: color }} /><strong>{name}</strong><span>{color}</span></div>)}</div></section>
      <section className="r-brand-row"><div><h2>Typography</h2><p>Inter gives the identity a clear, practical voice. Large headlines, readable body text and restrained weights create hierarchy without ornament.</p></div><div className="r-type-sample">Capital for Africa’s productive economy.<p style={{fontSize: 18, fontWeight: 400, letterSpacing: 0}}>Inter Regular / Medium / Semibold</p></div></section>
      <section className="r-brand-row"><div><h2>Iconography</h2><p>A single family of geometric line icons, drawn on a 24-pixel grid. Use them consistently and without decorative badges.</p><a href="/brand/rift-brand-kit.zip" download className="r-link">Download SVG icons <RiftIcon name="arrow" /></a></div><div className="r-brand-icons">{sectors.map(sector => <span key={sector.id} title={sector.name}><RiftIcon name={sector.icon} /></span>)}</div></section>
      <section className="r-brand-row"><div><h2>Imagery</h2><p>Architectural forms express connection and movement. Illustrative photography brings the productive economy and the people participating in it into view.</p><p>These images were created for Rift. They do not depict portfolio companies, customers or investment performance.</p></div><img src="/brand/rift-capital-sculpture.png" alt="Rift architectural brand artwork" width="1536" height="1024" loading="lazy" style={{width: "100%", height: "auto"}} /></section>
    </div>
  </main>
  <CapitalFooter />
</div>;
