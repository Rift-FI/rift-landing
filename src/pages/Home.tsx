import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Landing } from "../components/landing/Landing";
import { CONTACT_EMAIL } from "../lib/links";

/**
 * Home, 2026-11 redesign. Sections and copy live in
 * components/landing/Landing.tsx; links in lib/links.ts.
 */
const TITLE = "Rift, send money across Africa and the world";
const DESC =
  "Send to M-Pesa and bank accounts across six African countries and buy or sell USDC with local money. With Rift Wallets, banks and fintechs give their users wallets for USDC, USDT and tokenized stocks.";

const COUNTRIES = ["Kenya", "Uganda", "Tanzania", "Ghana", "Malawi", "Nigeria"];

export const Home = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <meta name="author" content="Rift Finance" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href="https://riftfi.xyz/" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rift Finance" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content="https://riftfi.xyz/" />
      <meta property="og:image" content="https://riftfi.xyz/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_KE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tryrift" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://riftfi.xyz/#org",
        name: "Rift Finance",
        alternateName: "Rift",
        url: "https://riftfi.xyz/",
        logo: "https://riftfi.xyz/assets/rift-logo.png",
        description: DESC,
        foundingLocation: { "@type": "Place", name: "Nairobi, Kenya" },
        areaServed: COUNTRIES.map((name) => ({ "@type": "Country", name })),
        contactPoint: [{
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          areaServed: "Africa",
          availableLanguage: ["English", "Swahili"],
        }],
        sameAs: ["https://twitter.com/tryrift", "https://www.linkedin.com/company/riftfi"],
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://riftfi.xyz/#website",
        url: "https://riftfi.xyz/",
        name: "Rift Finance",
        publisher: { "@id": "https://riftfi.xyz/#org" },
      })}</script>
    </Helmet>
    <Landing />
  </Fragment>
);
