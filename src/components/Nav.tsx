import "../styles/components/nav.scss";

export const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="links">
        <a href="#features">Features</a>
        <a href="#forbusiness">Business</a>
        <a href="#usecases">Use Cases</a>
        <a href="#partners">Partners</a>
      </div>

      <div className="logo">
        <img src="/icon.png" alt="icon" />
        <span>Rift.</span>
      </div>

      <a
        href="https://wallet.riftfi.xyz/"
        target="_blank"
        className="getstrated"
      >
        Get Started
      </a>
    </nav>
  );
};
