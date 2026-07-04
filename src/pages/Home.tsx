import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "../components/rift/Hero";
import {
  MotionBand,
  FlowVisuals,
  BusinessBenefits,
  BankableCredit,
  InstitutionReveal,
  OneStack,
  SecurityCards,
  Coverage,
  DesignPartners,
  Wallet,
  FinalCTA,
} from "../components/rift/sections";

/**
 * Home. Business-first order. Institution pitch is behind a click.
 *   Hero              Pay across African borders in minutes.
 *   MotionBand        Traffic video.
 *   FlowVisuals       Cross-border + commerce videos.
 *   BusinessBenefits  Short benefit tiles.
 *   InstitutionReveal Click to expand bank/fintech pitch + orchestration.
 *   OneStack          Product + trust list.
 *   SecurityCards     Four enclave/KYC/deploy/build videos.
 *   Coverage          Flags + chain logos.
 *   Vision            The clearing layer Africa never built.
 *   DesignPartners    Peoples Markets, Blockfinax.
 *   Wallet            Live rails proof.
 *   FinalCTA          Book a call.
 */
export const Home = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>
        Rift. Pay across African borders in minutes.
      </title>
      <meta
        name="description"
        content="Cross-border payments in minutes. Local currency in, local currency out. On rails your bank will sign off."
      />
      <link rel="canonical" href="https://riftfi.xyz/" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1"
      />
      <meta
        name="keywords"
        content="cross-border payments Africa, stablecoin infrastructure, bank payment infrastructure, SME credit data, liquidity infrastructure, embedded wallets"
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Rift. Pay across African borders in minutes."
      />
      <meta
        property="og:description"
        content="Cross-border payments in minutes. Local currency in, local currency out. On rails your bank will sign off."
      />
      <meta property="og:url" content="https://riftfi.xyz/" />
      <meta property="og:image" content="https://riftfi.xyz/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rift Finance" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tryrift" />
      <meta
        name="twitter:title"
        content="Rift. Pay across African borders in minutes."
      />
      <meta
        name="twitter:description"
        content="Cross-border payments in minutes. Local currency in, local currency out."
      />
      <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Rift. Pay across African borders in minutes.",
        "url": "https://riftfi.xyz/",
        "description":
          "Cross-border payments in minutes. Local currency in, local currency out. On rails your bank will sign off.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://riftfi.xyz/og-image.png",
          "width": 1200,
          "height": 630,
        },
        "isPartOf": {
          "@type": "WebSite",
          "name": "Rift Finance",
          "url": "https://riftfi.xyz/",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Rift Finance",
          "logo": {
            "@type": "ImageObject",
            "url": "https://riftfi.xyz/assets/rift-logo.png",
          },
        },
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Rift",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web, iOS, Android",
        "description":
          "Cross-border payments for African businesses. Wallets, ramps, treasury and settlement through one API.",
        "url": "https://riftfi.xyz/",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}</script>
    </Helmet>
    <Hero />
    <MotionBand />
    <FlowVisuals />
    <BusinessBenefits />
    <BankableCredit />
    <InstitutionReveal />
    <OneStack />
    <SecurityCards />
    <Coverage />
    <DesignPartners />
    <Wallet />
    <FinalCTA />
  </Fragment>
);
