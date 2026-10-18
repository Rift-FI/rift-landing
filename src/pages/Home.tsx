import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import {
 InstitutionalHero,
 Benefits,
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
 Rift, cross-border payments for East African trade
 </title>
 <meta
 name="description"
 content="Pay suppliers in Kenya, Uganda, Tanzania and Rwanda at one all-in price, quoted before you send and settled the same day. Your bank's fee is about thirty-five dollars; the exchange rate it takes twice is one to three percent you never see."
 />
 <meta
 name="keywords"
 content="cross border payments East Africa, pay supplier Uganda Tanzania Rwanda, B2B payments Kenya, import export payments East Africa, FX spread cross border, clearing and forwarding payments, EAC trade payments, cheaper than bank wire"
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
 content="Rift, cross-border payments for East African trade"
 />
 <meta
 property="og:description"
 content="Pay suppliers in Kenya, Uganda, Tanzania and Rwanda at one all-in price, quoted before you send and settled the same day. Your bank's fee is about thirty-five dollars; the exchange rate it takes twice is one to three percent you never see."
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
 content="Rift, cross-border payments for East African trade"
 />
 <meta
 name="twitter:description"
 content="Pay suppliers in Kenya, Uganda, Tanzania and Rwanda at one all-in price, quoted before you send and settled the same day. Your bank's fee is about thirty-five dollars; the exchange rate it takes twice is one to three percent you never see."
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
 name: "Rift, cross-border payments for East African trade",
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

 {/* FAQPage. Every answer has to survive a CFO checking it. */}
 <script type="application/ld+json">{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [
 {
 "@type": "Question",
 name: "What does a cross-border payment in East Africa actually cost?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Less in fees than most people assume, and more in total. A Kenyan bank caps an outward wire at roughly thirty-five dollars, which is a tiny fraction of a large invoice. The real cost is the exchange rate, taken once when your shillings become dollars and again when those dollars become the other country's currency. All in, a commercial payment between East African countries typically runs between one and three percent, and the great majority of that is exchange rate rather than fees. It is not itemised, so most businesses never learn what they paid.",
 },
 },
 {
 "@type": "Question",
 name: "How is Rift different from sending through my bank?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "You are quoted one number before you send, which covers everything including the exchange rate, and the payment reaches your supplier the same day rather than in three to five days. Your supplier receives their own currency on the mobile money or bank account they already use.",
 },
 },
 {
 "@type": "Question",
 name: "Which countries can I pay?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Kenya, Uganda, Tanzania and Rwanda, in both directions between any two of them. We also handle payments to suppliers outside Africa, such as China and the Gulf, which works differently because those dollars have to be sourced rather than matched against regional flow.",
 },
 },
 {
 "@type": "Question",
 name: "Does my supplier need to sign up for anything?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "No. They are paid in their own currency into the mobile money or bank account they already use. They do not need a foreign currency account and they do not need to install anything.",
 },
 },
 ],
 })}</script>
 </Helmet>

 <div className="rift-home">
 <InstitutionalHero />
 <Benefits />
 <HowItWorks />
 <WhoFor />
 <Contact />
 <InstitutionalFooter />
 </div>
 </Fragment>
);
