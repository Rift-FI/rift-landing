import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPost, posts } from "../lib/posts";

const ORIGIN = "https://riftfi.com";
const IMAGE = `${ORIGIN}/brand/rift-capital-sculpture.png`;
const pages: Record<string, { title: string; description: string; name: string }> = {
  "/": { name: "Home", title: "Rift | Settlement Liquidity for Payment Companies", description: "Dollar liquidity before settlement arrives. Explore USDC financing against verified settlement receivables for remittance companies, cross-border payment apps and PSPs." },
  "/how-it-works": { name: "How Rift works", title: "How Rift Works | Receivables Financing and Investor Income", description: "Learn how Rift plans to finance verified short-term receivables, bridge business settlement gaps and distribute borrower-paid interest to eligible investors." },
  "/businesses": { name: "Business financing", title: "Settlement Financing for Remittance Companies & PSPs | Rift", description: "Request short-term USDC liquidity against eligible processor and settlement-partner receivables. Keep your payout network moving while incoming funds settle." },
  "/blog": { name: "Journal", title: "Rift Journal | Money, Trade and Emerging Markets", description: "Essays from Rift on money, stablecoins, cross-border trade and emerging markets. Read perspectives on the financial systems supporting Africa's economy." },
  "/brand": { name: "Brand assets", title: "Rift Brand Assets | Logos, Colours and Icons", description: "Download Rift's brand kit, logo and SVG icons. Explore the colour palette, typography and guidance for using the Rift visual identity." },
  "/terms": { name: "Terms of Service", title: "Terms of Service | Rift", description: "Read Rift's website terms for individuals, institutions and businesses, including enquiry conditions, investment risks and separate product agreements." },
  "/privacy": { name: "Privacy Policy", title: "Privacy Policy | Rift", description: "Learn how Rift handles website visits, Tally enquiry forms and related communications, including data sharing, retention and your privacy rights." },
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
  const organization = { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "Rift", legalName: "Sphere Ramp Ltd", url: `${ORIGIN}/`, logo: `${ORIGIN}/assets/rift-logo.png`, email: "amschel@riftfi.com", sameAs: ["https://x.com/tryrift"] };
  const breadcrumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` }];
  if (post) breadcrumbs.push({ "@type": "ListItem", position: 2, name: "Journal", item: `${ORIGIN}/blog` });
  if (path !== "/") breadcrumbs.push({ "@type": "ListItem", position: breadcrumbs.length + 1, name: page.name, item: url });
  const graph: unknown[] = [organization, { "@type": "WebSite", "@id": `${ORIGIN}/#website`, url: `${ORIGIN}/`, name: "Rift", publisher: { "@id": `${ORIGIN}/#organization` } }, { "@type": post ? "WebPage" : path === "/blog" ? "CollectionPage" : "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { "@id": `${ORIGIN}/#website` }, inLanguage: "en" }];
  if (path !== "/") graph.push({ "@type": "BreadcrumbList", itemListElement: breadcrumbs });
  if (post) graph.push({ "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Person", name: post.author || "Rift Team" }, publisher: { "@id": `${ORIGIN}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` }, url, image: [image], keywords: post.tags?.join(", "), wordCount: post.content.trim().split(/\s+/).length });
  if (path === "/blog") graph.push({ "@type": "Blog", name: "Rift Journal", url, publisher: { "@id": `${ORIGIN}/#organization` }, blogPost: posts.map(p => ({ "@type": "BlogPosting", headline: p.title, url: `${ORIGIN}/blog/${p.slug}`, datePublished: p.date, author: { "@type": "Person", name: p.author || "Rift Team" } })) });
  return <Helmet>
    <html lang="en" /><title>{page.title}</title><meta name="description" content={page.description} /><link rel="canonical" href={url} />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="alternate" type="application/rss+xml" title="Rift Journal" href={`${ORIGIN}/feed.xml`} />
    <meta property="og:type" content={post ? "article" : "website"} /><meta property="og:site_name" content="Rift" /><meta property="og:locale" content="en_KE" />
    <meta property="og:title" content={page.title} /><meta property="og:description" content={page.description} /><meta property="og:url" content={url} /><meta property="og:image" content={image} /><meta property="og:image:alt" content={post ? post.title : "Rift architectural artwork representing connected capital"} />
    {post && <meta property="article:published_time" content={post.date} />}
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:site" content="@tryrift" /><meta name="twitter:title" content={page.title} /><meta name="twitter:description" content={page.description} /><meta name="twitter:image" content={image} /><meta name="twitter:image:alt" content={post ? post.title : "Rift architectural brand artwork"} />
    <script type="application/ld+json">{json({ "@context": "https://schema.org", "@graph": graph })}</script>
  </Helmet>;
}
