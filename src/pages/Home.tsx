import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import {
 InstitutionalHero,
 Benefits,
 HowItWorks,
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
 Rift, pay suppliers across East Africa in minutes
 </title>
 <meta
 name="description"
 content="Pay a supplier in Kenya, Uganda or Tanzania in US dollars, settle in minutes, and they take payout in local currency on mobile money. 0.5% to transfer, 1.0% to 1.5% to convert, against 3% to 8% through a correspondent bank."
 />
 <meta
 name="keywords"
 content="cross border payments East Africa, pay supplier Kenya Uganda Tanzania, B2B payments East Africa, import export payments Kenya, stablecoin settlement East Africa, cheaper than correspondent bank, M-Pesa business payout, EAC trade payments"
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
 content="Rift, pay suppliers across East Africa in minutes"
 />
 <meta
 property="og:description"
 content="Pay a supplier in Kenya, Uganda or Tanzania in US dollars, settle in minutes, and they take payout in local currency on mobile money. 0.5% to transfer, 1.0% to 1.5% to convert, against 3% to 8% through a correspondent bank."
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
 content="Rift, pay suppliers across East Africa in minutes"
 />
 <meta
 name="twitter:description"
 content="Pay a supplier in Kenya, Uganda or Tanzania in US dollars, settle in minutes, and they take payout in local currency on mobile money. 0.5% to transfer, 1.0% to 1.5% to convert, against 3% to 8% through a correspondent bank."
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
 name: "Rift, pay suppliers across East Africa in minutes",
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

 {/* FAQPage, the questions a trader actually asks. */}
 <script type="application/ld+json">{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [
 {
 "@type": "Question",
 name: "How do I pay a supplier in another East African country with Rift?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "You pay in from your bank or mobile money and it becomes a US dollar stablecoin on the way in. The payment settles to your supplier in minutes, with no correspondent bank in between. Your supplier either holds the dollars or takes payout in local currency on mobile money, whenever they choose.",
 },
 },
 {
 "@type": "Question",
 name: "What does it cost compared with a bank wire?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Transfers cost 0.5 percent, and converting into or out of local currency costs 1.0 to 1.5 percent. The same payment through a correspondent bank typically runs 3 to 8 percent all in, plus a fixed fee at every hop.",
 },
 },
 {
 "@type": "Question",
 name: "Does my supplier need a dollar account or a crypto wallet?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "No. They can take payout in local currency on mobile money, including M-Pesa. They do not need a dollar account, a bank that holds one, or any knowledge of crypto.",
 },
 },
 {
 "@type": "Question",
 name: "Does Rift hold my money?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "No. The architecture is non-custodial: your business holds its own keys, so Rift cannot move your funds.",
 },
 },
 ],
 })}</script>
 </Helmet>

 <InstitutionalHero />
 <Benefits />
 <HowItWorks />
 <Contact />
 <InstitutionalFooter />
 </Fragment>
);
