import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPost, posts } from "../lib/posts";

const ORIGIN = "https://riftfi.com";
const IMAGE = `${ORIGIN}/brand/rift-capital-sculpture.png`;
const pages: Record<string, { title: string; description: string; name: string }> = {
  "/": { name: "Home", title: "Settlement Liquidity for Payment Companies | Rift", description: "Rift advances USDC against verified short-term settlement receivables, so remittance companies, payment apps and PSPs can pay out before their funds arrive." },
  "/how-it-works": { name: "How Rift works", title: "How Settlement Receivables Financing Works | Rift", description: "Follow one financing round end to end: the receivable is verified, USDC is advanced, the settlement repays it, and collected interest reaches investors." },
  "/businesses": { name: "Business financing", title: "Request Financing for Remittance Companies & PSPs | Rift", description: "Tell us about the payouts you fund and the settlement receivables behind them. We will review what is eligible and reply about short-term USDC liquidity." },
  "/blog": { name: "Journal", title: "Journal: Money, Stablecoins and Trade | Rift", description: "Essays from Rift on money, stablecoins, cross-border trade and emerging markets, and the payment plumbing that decides when value actually moves." },
  "/brand": { name: "Brand assets", title: "Brand Assets: Logos, Colours and Icons | Rift", description: "Download the Rift logo, icon set and full brand kit. See the colour palette, typography and the rules for using the Rift identity in your own materials." },
  "/terms": { name: "Terms of Service", title: "Terms of Service | Rift", description: "The terms covering Rift enquiries, receivable-backed advances, digital assets and investment participation, including fees, risks and current product status." },
  "/privacy": { name: "Privacy Policy", title: "Privacy Policy | Rift", description: "How Rift handles website visits, Tally enquiry forms and related correspondence: what we collect, who we share it with, how long we keep it, your rights." },
};
const json = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
export function SEO() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "") || "/";
  const post = path.startsWith("/blog/") ? getPost(path.slice(6)) : undefined;
  const page = post ? { title: `${post.title} | Rift Journal`, description: post.description, name: post.title } : pages[path];
  if (!page) return <Helmet><meta name="robots" content="noindex, follow" /></Helmet>;
  const url = `${ORIGIN}${path === "/" ? "/" : path}`;
  const image = post?.cover && /\.(png|jpe?g|webp)$/i.test(post.cover) ? new URL(post.cover, ORIGIN).href : IMAGE;
  const organization = { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "Rift", legalName: "Sphere Ramp Ltd", url: `${ORIGIN}/`, logo: `${ORIGIN}/assets/rift-logo.png`, email: "amschel@riftfi.com", description: "Rift supplies short-term USDC liquidity to remittance companies, cross-border payment apps, payment service providers and FX businesses against verified settlement receivables.", address: { "@type": "PostalAddress", streetAddress: "Enkang, Ngong Road", addressLocality: "Nairobi", addressCountry: "KE" }, contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "amschel@riftfi.com", url: `${ORIGIN}/businesses`, availableLanguage: "en" }], sameAs: ["https://x.com/tryrift"] };
  const breadcrumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` }];
  if (post) breadcrumbs.push({ "@type": "ListItem", position: 2, name: "Journal", item: `${ORIGIN}/blog` });
  if (path !== "/") breadcrumbs.push({ "@type": "ListItem", position: breadcrumbs.length + 1, name: page.name, item: url });
  const graph: unknown[] = [organization, { "@type": "WebSite", "@id": `${ORIGIN}/#website`, url: `${ORIGIN}/`, name: "Rift", description: pages["/"].description, inLanguage: "en", publisher: { "@id": `${ORIGIN}/#organization` } }, { "@type": post ? "WebPage" : path === "/blog" ? "CollectionPage" : "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { "@id": `${ORIGIN}/#website` }, inLanguage: "en" }];
  if (path === "/" || path === "/businesses" || path === "/how-it-works") graph.push({ "@type": "Service", "@id": `${ORIGIN}/#settlement-financing`, name: "Settlement receivables financing", serviceType: "Receivables financing", url: `${ORIGIN}/how-it-works`, description: "USDC advanced against verified short-term settlement receivables owed by processors, acquirers, banks or settlement partners, repaid when the settlement arrives. Financing and investment products are in preparation. Enquiries are open.", provider: { "@id": `${ORIGIN}/#organization` }, audience: { "@type": "BusinessAudience", name: "Remittance companies, cross-border payment apps, payment service providers, FX businesses and merchants settling through a PSP" } });
  if (path !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: breadcrumbs });
  if (post) graph.push({ "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Person", name: post.author || "Rift Team" }, publisher: { "@id": `${ORIGIN}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` }, url, image: [image], keywords: post.tags?.join(", "), wordCount: post.content.trim().split(/\s+/).length });
  if (path === "/blog") graph.push({ "@type": "Blog", name: "Rift Journal", url, publisher: { "@id": `${ORIGIN}/#organization` }, blogPost: posts.map(p => ({ "@type": "BlogPosting", headline: p.title, url: `${ORIGIN}/blog/${p.slug}`, datePublished: p.date, author: { "@type": "Person", name: p.author || "Rift Team" } })) });
  return <Helmet>
    <html lang="en" /><title>{page.title}</title><meta name="description" content={page.description} /><link rel="canonical" href={url} />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="alternate" type="application/rss+xml" title="Rift Journal" href={`${ORIGIN}/feed.xml`} />
    <meta property="og:type" content={post ? "article" : "website"} /><meta property="og:site_name" content="Rift" /><meta property="og:locale" content="en_GB" />
    <meta property="og:title" content={page.title} /><meta property="og:description" content={page.description} /><meta property="og:url" content={url} /><meta property="og:image" content={image} /><meta property="og:image:alt" content={post ? post.title : "Rift architectural artwork representing connected capital"} />
    {post && <meta property="article:published_time" content={post.date} />}
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:site" content="@tryrift" /><meta name="twitter:title" content={page.title} /><meta name="twitter:description" content={page.description} /><meta name="twitter:image" content={image} /><meta name="twitter:image:alt" content={post ? post.title : "Rift architectural brand artwork"} />
    <script type="application/ld+json">{json({ "@context": "https://schema.org", "@graph": graph })}</script>
  </Helmet>;
}
