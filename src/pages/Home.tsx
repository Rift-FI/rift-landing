import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import {
 InstitutionalHero,
 HowItWorks,
 WhoFor,
 Contact,
 InstitutionalFooter,
} from "../components/rift/institutional";

/**
 * Home, post-2026-08 pivot. Institutional-first pitch: banks,
 * licensed VASPs, PSP fintechs. The audience is a CTO, head of digital
 * or compliance officer, NOT a retail user and NOT a crypto developer.
 *
 * Copy, section order and SEO are governed by the positioning brief
 * (2026-08). If you paraphrase any of the hero, product proof, or
 * self-hosted points, you'll drift away from wording that has been
 * reviewed for regulatory tone, get sign-off before editing.
 *
 * The old business-first hero + eleven-section stack now lives at
 * /businesses (see pages/Businesses.tsx). Nav's "For businesses" link
 * routes there.
 *
 * Six sections total (per brief cap):
 * 1. Hero Settlement infrastructure headline
 * 2. Products Wallet / Ramps / Settlement
 * 3. Why self-hosted Three numbered points
 * 4. Proof Live markets, volume, Circle, CBK
 * 5. Contact Direct email, no form
 * 6. Footer Legal + secondary nav
 */
export const Home = () => (
 <Fragment>
 <Helmet>
 <html lang="en" />
 <title>
 Rift, dollar settlement for African trade corridors
 </title>
 <meta
 name="description"
 content="Rift is the dollar-settlement layer for African trade corridors. Netting cancels offsetting flows so you fund the difference instead of pre-funding both ends, and the residual settles in stablecoins. For liquidity providers, DFIs, remittance companies and the banks behind them."
 />
 <meta
 name="keywords"
 content="African financial infrastructure, wallet infrastructure Africa, liquidity infrastructure Africa, cross-border payments Africa, embedded wallets for banks, stablecoin infrastructure for PSPs, on-ramp off-ramp Kenya Tanzania Ghana Nigeria, netting engine, self-hosted payments infrastructure, hosted payments API Africa, Circle Alliance member, VASP regulations Kenya"
 />
 <meta name="author" content="Rift Finance" />
 <meta
 name="robots"
 content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
 />
 <link rel="canonical" href="https://riftfi.xyz/" />

 {/* Open Graph, institutional tone. Same OG image (og-image.png)
 is reused; if it's business-shot, replace at /public before
 reindex. */}
 <meta property="og:type" content="website" />
 <meta property="og:site_name" content="Rift Finance" />
 <meta
 property="og:title"
 content="Rift, dollar settlement for African trade corridors"
 />
 <meta
 property="og:description"
 content="We net offsetting flows so most dollars never move, and settle the residual in stablecoins. Complementary to PAPSS, which clears local currency."
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
 content="Rift, dollar settlement for African trade corridors"
 />
 <meta
 name="twitter:description"
 content="Netting and stablecoin settlement for African trade corridors."
 />
 <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

 {/* Organization, the canonical entity graph node. Includes the
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
 "Settlement infrastructure for African financial institutions. Netting and stablecoin settlement for African trade corridors. Serves banks, PSPs, fintechs, stablecoin issuers and neobanks.",
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

 {/* WebSite, sitelinks searchbox hint + canonical name. */}
 <script type="application/ld+json">{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "WebSite",
 "@id": "https://riftfi.xyz/#website",
 url: "https://riftfi.xyz/",
 name: "Rift Finance",
 publisher: { "@id": "https://riftfi.xyz/#org" },
 })}</script>

 {/* WebPage, this specific URL's metadata. Cross-links Org + Site. */}
 <script type="application/ld+json">{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "WebPage",
 "@id": "https://riftfi.xyz/#home",
 url: "https://riftfi.xyz/",
 name: "Rift, dollar settlement for African trade corridors",
 description:
 "Settlement infrastructure for African financial institutions. Netting and stablecoin settlement for African trade corridors.",
 primaryImageOfPage: {
 "@type": "ImageObject",
 url: "https://riftfi.xyz/og-image.png",
 width: 1200,
 height: 630,
 },
 isPartOf: { "@id": "https://riftfi.xyz/#website" },
 about: { "@id": "https://riftfi.xyz/#org" },
 })}</script>

 {/* FAQPage, the questions a trade financier actually asks. */}
 <script type="application/ld+json">{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [
 {
 "@type": "Question",
 name: "What does Rift actually do?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Rift settles dollars across African trade corridors. Moving money across a border at volume means pre-funding both ends, which traps working capital and often means drawing on an expensive credit line. Trade runs in both directions, so a large share of what is owed one way is matched by what is owed the other way. We hold both sides for a short window and settle them against each other, so only the difference needs funding. That difference settles in stablecoins.",
 },
 },
 {
 "@type": "Question",
 name: "Is Rift competing with PAPSS?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "No. PAPSS and Pesalink clear local currency, and they already do it well. Rift clears the dollar leg. The two are complementary: we net and settle the dollars, and hand the local currency leg to the rails that already exist.",
 },
 },
 {
 "@type": "Question",
 name: "Who is Rift for?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Two groups. Development finance institutions, banks and other liquidity providers who hold dollars and have a mandate to deploy them into African trade, whose balance sheet clears more trade because the netting layer only draws on the difference. And the remittance companies, exporters, importers, banks and payment companies moving money at volume, who would rather fund the net than pre-fund both ends of every corridor.",
 },
 },
 ],
 })}</script>
 </Helmet>

 <InstitutionalHero />
 <HowItWorks />
 <WhoFor />
 <Contact />
 <InstitutionalFooter />
 </Fragment>
);
