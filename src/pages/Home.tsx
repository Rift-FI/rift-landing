import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import {
 InstitutionalHero,
 InstitutionalProducts,
 Deployment,
 InstitutionalPartners,
 InstitutionalProof,
 InstitutionalContact,
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
 Rift, wallet and liquidity infrastructure for African financial services
 </title>
 <meta
 name="description"
 content="Rift is the wallet and liquidity infrastructure for African financial services. One stack, wallets, ramps, settlement, for banks, PSPs, fintechs, stablecoin issuers and neobanks. Use our hosted API, or deploy on your own infrastructure."
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
 content="Rift, wallet and liquidity infrastructure for African financial services"
 />
 <meta
 property="og:description"
 content="One stack for banks, PSPs, fintechs, stablecoin issuers and neobanks. Use our hosted API, or deploy on your own infrastructure."
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
 content="Rift, wallet and liquidity infrastructure for African financial services"
 />
 <meta
 name="twitter:description"
 content="One stack for banks, PSPs, fintechs, stablecoin issuers and neobanks. Use our hosted API, or self-host."
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
 "Wallet and liquidity infrastructure for African financial services. One stack, wallets, ramps, settlement, for banks, PSPs, fintechs, stablecoin issuers and neobanks. Available as a hosted API or self-hosted deployment.",
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
 name: "Rift, wallet and liquidity infrastructure for African financial services",
 description:
 "One stack, wallets, ramps, settlement, for banks, PSPs, fintechs, stablecoin issuers and neobanks moving money across African markets. Available as a hosted API or self-hosted deployment.",
 primaryImageOfPage: {
 "@type": "ImageObject",
 url: "https://riftfi.xyz/og-image.png",
 width: 1200,
 height: 630,
 },
 isPartOf: { "@id": "https://riftfi.xyz/#website" },
 about: { "@id": "https://riftfi.xyz/#org" },
 })}</script>

 {/* Products, three individual entries so search results can
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
 "White-label wallet widget. ERC-4337 smart accounts. Keys generated inside AWS Nitro Enclaves and encrypted under a KMS key policy pinned to the enclave build measurement, neither Rift nor AWS can extract them. Deployable on your own servers.",
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

 {/* FAQPage, indexes the "why self-hosted" answers so procurement
 researchers hit our page for the exact questions their vendor
 committees ask. */}
 <script type="application/ld+json">{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [
 {
 "@type": "Question",
 name: "Can I use Rift as a hosted API, or do I have to self-host?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Both. Use the hosted API to get to production fastest, Rift runs the stack, you make API calls. Or run the same stack on your own infrastructure (your VPC, your KMS) when data residency, sovereignty or vendor-committee sign-off make foreign SaaS a non-starter. The API surface is identical, so you can move from one to the other later.",
 },
 },
 {
 "@type": "Question",
 name: "Who does Rift serve?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Banks, licensed payment service providers, fintechs, stablecoin issuers and neobanks moving money across African markets. The stack is the same regardless, wallets, ramps and settlement, deployed hosted or self-hosted.",
 },
 },
 {
 "@type": "Question",
 name: "Who holds the private keys in Rift Wallet?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Keys are generated inside AWS Nitro Enclaves and encrypted under a KMS key policy pinned to the enclave build measurement (PCR0 attestation). Neither Rift nor AWS can extract them, only the specific enclave binary matching the pinned measurement can decrypt.",
 },
 },
 {
 "@type": "Question",
 name: "What does Rift Settlement actually compress?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Dollar liquidity. Instead of settling every cross-border payment individually through the dollar (which requires holding dollar float on both sides of every corridor), Rift matches offsetting obligations on a shared ledger and only settles the residual, typically 40 to 60 percent less dollar float per corridor.",
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
 <Deployment />
 <InstitutionalProof />
 <InstitutionalPartners />
 <InstitutionalContact />
 <InstitutionalFooter />
 </Fragment>
);
