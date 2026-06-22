import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "../components/rift/Hero";
import {
  MotionBand,
  Partners,
  CommerceBand,
  Outcomes,
  Platform,
  Pillars,
  Security,
  Proof,
  Wallet,
  FinalCTA,
} from "../components/rift/sections";

export const Home = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>Rift — Compliant stablecoin infrastructure for institutions</title>
      <meta
        name="description"
        content="Rift is the compliance, treasury and settlement layer banks, fintechs and governments build on to issue, hold and move money in stablecoins, and settle to local currency and dollars."
      />
      <link rel="canonical" href="https://riftfi.xyz/" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Rift — Compliant stablecoin infrastructure for institutions" />
      <meta property="og:description" content="Issue compliant wallets and move money across chains and into local currency through one API." />
      <meta property="og:url" content="https://riftfi.xyz/" />
      <meta property="og:image" content="https://riftfi.xyz/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rift Finance" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tryrift" />
      <meta name="twitter:title" content="Rift — Compliant stablecoin infrastructure" />
      <meta name="twitter:description" content="One API for compliant stablecoin issuance, custody, swaps and settlement." />
      <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Rift — Compliant stablecoin infrastructure for institutions",
        "url": "https://riftfi.xyz/",
        "description": "The compliance, treasury and settlement infrastructure for institutional stablecoin money.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://riftfi.xyz/og-image.png",
          "width": 1200,
          "height": 630
        },
        "isPartOf": {
          "@type": "WebSite",
          "name": "Rift Finance",
          "url": "https://riftfi.xyz/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Rift Finance",
          "logo": {
            "@type": "ImageObject",
            "url": "https://riftfi.xyz/assets/rift-logo.png"
          }
        }
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Rift",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web, iOS, Android",
        "description": "Compliant stablecoin infrastructure: wallets, ramps, swaps and settlement through one API.",
        "url": "https://riftfi.xyz/",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      })}</script>
    </Helmet>
    <Hero />
    <Partners />
    <MotionBand />
    <Outcomes />
    <CommerceBand />
    <Platform />
    <Pillars />
    <Security />
    <Proof />
    <Wallet />
    <FinalCTA />
  </Fragment>
);
