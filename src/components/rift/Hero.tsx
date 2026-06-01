import { useEffect, useState } from "react";
import { I } from "../../lib/rift-data";

const ROT_WORDS = ["stablecoins", "crypto", "wallets", "yield"];

const RotatingWord = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROT_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="rot grad" key={i}>
      {ROT_WORDS[i]}
    </span>
  );
};

export const Hero = () => {
  return (
    <header className="hero dark" id="top">
      <div className="wrap hero-in">
        <h1>
          Embed <RotatingWord />
          <br />
          into anything.
        </h1>
        <p className="lede">
          Rift is the infrastructure layer for fintechs, neobanks and startups to embed wallets,
          on/off-ramps and stablecoin payments across 10+ chains and 150+ countries.
          Gas, signing and chains, fully abstracted.
        </p>
        <div className="hero-cta">
          <a className="btn btn-mint btn-lg" href="https://portal.riftfi.xyz/docs" target="_blank" rel="noopener noreferrer">
            Start building {I.arrow}
          </a>
          <a className="btn btn-ghost btn-lg" href="mailto:admin@riftfi.xyz">
            Talk to sales
          </a>
        </div>
      </div>
    </header>
  );
};
