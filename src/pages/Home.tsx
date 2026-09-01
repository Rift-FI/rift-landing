import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import {
  InstitutionalHero,
  InstitutionalProducts,
  WhySelfHosted,
  InstitutionalProof,
  InstitutionalContact,
  InstitutionalFooter,
} from "../components/rift/institutional";

/**
 * Home — post-2026-08 pivot. Institutional-first pitch: banks,
 * licensed VASPs, PSP fintechs. The audience is a CTO, head of digital
 * or compliance officer, NOT a retail user and NOT a crypto developer.
 *
 * Copy, section order and SEO are governed by the positioning brief
 * (2026-08). If you paraphrase any of the hero, product proof, or
 * self-hosted points, you'll drift away from wording that has been
 * reviewed for regulatory tone — get sign-off before editing.
 *
 * The old business-first hero + eleven-section stack now lives at
 * /businesses (see pages/Businesses.tsx). Nav's "For businesses" link
 * routes there.
 *
 * Six sections total (per brief cap):
 *   1. Hero              Settlement infrastructure headline
 *   2. Products          Wallet / Ramps / Settlement
 *   3. Why self-hosted   Three numbered points
 *   4. Proof             Live markets, volume, Circle, CBK
 *   5. Contact           Direct email — no form
 *   6. Footer            Legal + secondary nav
 */
export const Home = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>
        Rift — settlement infrastructure for African cross-border payments
      </title>
      <meta
        name="description"
        content="Rift is settlement infrastructure for African cross-border payments. Three products — Wallet, Ramps, Settlement — deployable on your own infrastructure. Built for banks, licensed VASPs and PSP fintechs that cannot use foreign SaaS."
      />
      <meta
        name="keywords"
        content="African settlement infrastructure, cross-border payments Africa, non-custodial wallet infrastructure, ERC-4337 smart accounts, AWS Nitro Enclave, KMS attestation, stablecoin on-ramp Africa, off-ramp Kenya Tanzania Ghana Nigeria, netting engine, dollar liquidity compression, VASP regulations Kenya, Circle Alliance member, self-hosted payments infrastructure, bank vendor-approved crypto infrastructure"
      />
      <meta name="author" content="Rift Finance" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <link rel="canonical" href="https://riftfi.xyz/" />

      {/* Open Graph — institutional tone. Same OG image (og-image.png)
          is reused; if it's business-shot, replace at /public before
          reindex. */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rift Finance" />
      <meta
        property="og:title"
        content="Rift — settlement infrastructure for African cross-border payments"
      />
      <meta
        property="og:description"
        content="Three products — Wallet, Ramps, Settlement — deployable on your own infrastructure. For institutions that cannot use foreign SaaS."
      />
      <meta property="og:url" content="https://riftfi.xyz/" />
      <meta property="og:image" content="https://riftfi.xyz/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_KE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tryrift" />
      <meta
        name="twitter:title"
        content="Rift — settlement infrastructure for African cross-border payments"
      />
      <meta
        name="twitter:description"
        content="Three products, deployable on your own infrastructure. Built for institutions that cannot use foreign SaaS."
      />
      <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

      {/* Organization — the canonical entity graph node. Includes the
          jurisdiction fact set (Nairobi, Kenya) that regulator-facing
          rich results want to display. */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://riftfi.xyz/#org",
        name: "Rift Finance",
        alternateName: "Rift",
        url: "https://riftfi.xyz/",
        logo: "https://riftfi.xyz/assets/rift-logo.png",
        description:
          "Settlement infrastructure for African cross-border payments. Non-custodial wallets, licensed on/off ramps, and a netting engine — deployable on-premises for banks and licensed VASPs.",
        foundingLocation: {
          "@type": "Place",
          name: "Nairobi, Kenya",
        },
        areaServed: [
          { "@type": "Country", name: "Kenya" },
          { "@type": "Country", name: "Tanzania" },
          { "@type": "Country", name: "Ghana" },
          { "@type": "Country", name: "Nigeria" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "amschel@riftfi.com",
            areaServed: "Africa",
            availableLanguage: ["English", "Swahili"],
          },
        ],
        sameAs: [
          "https://twitter.com/tryrift",
          "https://www.linkedin.com/company/riftfi",
        ],
      })}</script>

      {/* WebSite — sitelinks searchbox hint + canonical name. */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://riftfi.xyz/#website",
        url: "https://riftfi.xyz/",
        name: "Rift Finance",
        publisher: { "@id": "https://riftfi.xyz/#org" },
      })}</script>

      {/* WebPage — this specific URL's metadata. Cross-links Org + Site. */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://riftfi.xyz/#home",
        url: "https://riftfi.xyz/",
        name: "Rift — settlement infrastructure for African cross-border payments",
        description:
          "Three products — Wallet, Ramps, Settlement — deployable on your own infrastructure. Built for banks, licensed VASPs and PSP fintechs that cannot use foreign SaaS.",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://riftfi.xyz/og-image.png",
          width: 1200,
          height: 630,
        },
        isPartOf: { "@id": "https://riftfi.xyz/#website" },
        about: { "@id": "https://riftfi.xyz/#org" },
      })}</script>

      {/* Products — three individual entries so search results can
          surface each by name. Rich results only render Product schema
          for retail goods, but structured entity data still improves
          ranking on named queries like "Rift Wallet" or "Rift Ramps". */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": "https://riftfi.xyz/#wallet",
            name: "Rift Wallet",
            provider: { "@id": "https://riftfi.xyz/#org" },
            serviceType: "Non-custodial wallet infrastructure",
            description:
              "White-label wallet widget. ERC-4337 smart accounts. Keys generated inside AWS Nitro Enclaves and encrypted under a KMS key policy pinned to the enclave build measurement — neither Rift nor AWS can extract them. Deployable on your own servers.",
            areaServed: "Africa",
          },
          {
            "@type": "Service",
            "@id": "https://riftfi.xyz/#ramps",
            name: "Rift Ramps",
            provider: { "@id": "https://riftfi.xyz/#org" },
            serviceType: "Fiat on/off-ramp infrastructure",
            description:
              "Bank transfer, mobile money, and card rails across Kenya, Tanzania, Ghana and Nigeria. One API, licensed partners on both ends.",
            areaServed: [
              { "@type": "Country", name: "Kenya" },
              { "@type": "Country", name: "Tanzania" },
              { "@type": "Country", name: "Ghana" },
              { "@type": "Country", name: "Nigeria" },
            ],
          },
          {
            "@type": "Service",
            "@id": "https://riftfi.xyz/#settlement",
            name: "Rift Settlement",
            provider: { "@id": "https://riftfi.xyz/#org" },
            serviceType: "Cross-border netting engine",
            description:
              "Offsetting obligations are matched on a shared ledger; only the residual settles. Compresses the dollar liquidity a corridor requires by 40 to 60 percent.",
            areaServed: "Africa",
          },
        ],
      })}</script>

      {/* FAQPage — indexes the "why self-hosted" answers so procurement
          researchers hit our page for the exact questions their vendor
          committees ask. */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why is Rift self-hosted and not SaaS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "African regulators increasingly require data residency and operational sovereignty. Foreign SaaS creates third-party risk that most bank vendor committees will not approve. Rift deploys inside your perimeter, under your control.",
            },
          },
          {
            "@type": "Question",
            name: "Who holds the private keys in Rift Wallet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Keys are generated inside AWS Nitro Enclaves and encrypted under a KMS key policy pinned to the enclave build measurement (PCR0 attestation). Neither Rift nor AWS can extract them — only the specific enclave binary matching the pinned measurement can decrypt.",
            },
          },
          {
            "@type": "Question",
            name: "What does Rift Settlement actually compress?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Dollar liquidity. Instead of settling every cross-border payment individually through the dollar (which requires holding dollar float on both sides of every corridor), Rift matches offsetting obligations on a shared ledger and only settles the residual — typically 40 to 60 percent less dollar float per corridor.",
            },
          },
          {
            "@type": "Question",
            name: "Which markets is Rift live in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Kenya, Tanzania, Ghana, and Nigeria. Bank transfer, mobile money and card rails on both the on-ramp and off-ramp sides through licensed partners.",
            },
          },
        ],
      })}</script>
    </Helmet>

    <InstitutionalHero />
    <InstitutionalProducts />
    <WhySelfHosted />
    <InstitutionalProof />
    <InstitutionalContact />
    <InstitutionalFooter />
  </Fragment>
);
