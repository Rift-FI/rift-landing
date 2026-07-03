import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "../components/rift/Hero";
import {
  Problem,
  InstitutionBenefits,
  OneStack,
  DataCredit,
  Vision,
  DesignPartners,
  Wallet,
  FinalCTA,
} from "../components/rift/sections";

/**
 * Home page. Section order tracks the positioning spec:
 *   Hero            The money is already moving.
 *   Problem         Billions are moving, your institution can't see it.
 *   InstitutionBenefits  Bank pitch verbatim + 4 benefit cards.
 *   OneStack        Product + trust. Only place compliance vocabulary
 *                   appears above the fold.
 *   DataCredit      Every payment builds a financial identity.
 *   Vision          The clearing layer Africa never built.
 *   DesignPartners  Real names only. Honest framing.
 *   Wallet          Proof the rails work today.
 *   FinalCTA        Book a call.
 *
 * Compliance vocabulary does NOT appear in the hero, in any H1, or in
 * the meta title. Placement rule per the positioning spec.
 */
export const Home = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>
        Rift. The infrastructure banks use to capture Africa's cross-border flow.
      </title>
      <meta
        name="description"
        content="African businesses move billions across borders in stablecoins. Rift plugs banks and fintechs into that flow: instant payments, new fee revenue, freed capital, and the visibility to lend. Built compliant from day one."
      />
      <link rel="canonical" href="https://riftfi.xyz/" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1"
      />
      <meta
        name="keywords"
        content="cross-border payments Africa, stablecoin infrastructure, bank payment infrastructure, SME credit data, liquidity infrastructure, embedded wallets, compliant stablecoins, KYC AML stablecoins"
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Rift. The infrastructure banks use to capture Africa's cross-border flow."
      />
      <meta
        property="og:description"
        content="Rift powers businesses moving money across African borders, and gives banks the rails and the data to see, serve, and lend to them."
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
        content="Rift. Cross-border payment infrastructure for African banks."
      />
      <meta
        name="twitter:description"
        content="Rift powers businesses moving money across African borders, and gives banks the rails and the data to see, serve, and lend to them."
      />
      <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Rift. The infrastructure banks use to capture Africa's cross-border flow.",
        "url": "https://riftfi.xyz/",
        "description":
          "Rift powers businesses moving money across African borders, and gives banks the rails and the data to see, serve, and lend to them.",
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
          "Cross-border payment infrastructure for African banks and fintechs. Wallets, ramps, treasury and settlement through one API.",
        "url": "https://riftfi.xyz/",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}</script>
    </Helmet>
    <Hero />
    <Problem />
    <InstitutionBenefits />
    <OneStack />
    <DataCredit />
    <Vision />
    <DesignPartners />
    <Wallet />
    <FinalCTA />
  </Fragment>
);
