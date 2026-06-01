import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "../components/rift/Hero";
import {
  Capabilities,
  ChainSwitcher,
  WalletShowcase,
  DevSection,
  UseCases,
  Coverage,
  Security,
  Pricing,
  FinalCTA,
} from "../components/rift/sections";

export const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Rift — Stablecoin infrastructure for fintechs & builders</title>
        <meta
          name="description"
          content="Rift is the infrastructure layer for fintechs, neobanks and startups to embed wallets, on/off-ramps and stablecoin payments across 10+ chains and 150+ countries. Gas, signing and chains abstracted."
        />
        <link rel="canonical" href="https://riftfi.xyz/" />
      </Helmet>
      <Hero />
      <Capabilities />
      <ChainSwitcher />
      <WalletShowcase />
      <DevSection />
      <UseCases />
      <Coverage />
      <Security />
      <Pricing />
      <FinalCTA />
    </Fragment>
  );
};
