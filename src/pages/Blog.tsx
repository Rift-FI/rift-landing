import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiClock, FiTag } from "react-icons/fi";
import { Reveal, StaggerGroup, StaggerItem } from "../components/motion/Reveal";
import { CoverArt } from "../components/blog/CoverArt";
import { posts } from "../lib/posts";
import "../styles/components/blog/blog.scss";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeTag, setActiveTag] = useState<string | null>(searchParams.get("tag"));

  const allTags = useMemo(() => {
    const t = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((x) => t.add(x)));
    return Array.from(t).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      if (activeTag && !p.tags?.includes(activeTag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, activeTag]);

  const onSearch = (v: string) => {
    setQuery(v);
    const params = new URLSearchParams(searchParams);
    if (v) params.set("q", v);
    else params.delete("q");
    setSearchParams(params, { replace: true });
  };

  const onTag = (t: string | null) => {
    setActiveTag(t);
    const params = new URLSearchParams(searchParams);
    if (t) params.set("tag", t);
    else params.delete("tag");
    setSearchParams(params, { replace: true });
  };

  const [featured, ...rest] = filtered;

  return (
    <main id="blog-page">
      <Helmet>
        <title>Rift Blog — Stablecoins, emerging markets & fintech</title>
        <html lang="en" />
        <meta
          name="description"
          content="Essays, deep dives and product updates from the Rift team on stablecoins, payments, emerging markets and what we're building."
        />
        <link rel="canonical" href="https://riftfi.xyz/blog" />
        <link rel="alternate" type="application/rss+xml" title="Rift Journal" href="https://riftfi.xyz/feed.xml" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rift Journal — Notes on money without borders" />
        <meta property="og:description" content="Essays from the Rift team on stablecoins, emerging markets and the future of programmable money." />
        <meta property="og:url" content="https://riftfi.xyz/blog" />
        <meta property="og:image" content="https://riftfi.xyz/og-image.png" />
        <meta property="og:site_name" content="Rift Finance" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tryrift" />
        <meta name="twitter:title" content="Rift Journal" />
        <meta name="twitter:description" content="Essays from the Rift team on stablecoins, emerging markets and programmable money." />
        <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Rift Journal",
          "url": "https://riftfi.xyz/blog",
          "description": "Essays from the Rift team on stablecoins, emerging markets and programmable money.",
          "publisher": {
            "@type": "Organization",
            "name": "Rift Finance",
            "url": "https://riftfi.xyz/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://riftfi.xyz/assets/rift-logo.png"
            }
          },
          "blogPost": posts.slice(0, 10).map((p) => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "description": p.description,
            "datePublished": p.date,
            "dateModified": p.date,
            "author": { "@type": "Person", "name": p.author },
            "url": `https://riftfi.xyz/blog/${p.slug}`,
            "mainEntityOfPage": `https://riftfi.xyz/blog/${p.slug}`,
            "keywords": p.tags?.join(", ")
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://riftfi.xyz/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://riftfi.xyz/blog" }
          ]
        })}</script>
      </Helmet>

      <section className="bl-hero">
        <Reveal>
          <span className="bl-eyebrow">Rift Journal</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="bl-h1">
            Notes on money,<br />
            without <span>borders.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="bl-sub">
            Moving money across emerging markets where dollars are scarce. Essays and notes from the
            people building Rift.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="bl-search">
            <FiSearch />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search blog posts"
            />
          </div>
        </Reveal>

        {allTags.length > 0 && (
          <Reveal delay={0.3}>
            <div className="bl-tags">
              <button
                className={`bl-tag ${activeTag === null ? "active" : ""}`}
                onClick={() => onTag(null)}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  className={`bl-tag ${activeTag === t ? "active" : ""}`}
                  onClick={() => onTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {filtered.length === 0 ? (
        <section className="bl-empty">
          <p>No posts match your search.</p>
        </section>
      ) : (
        <>
          {featured && (
            <section className="bl-featured">
              <Reveal>
                <Link to={`/blog/${featured.slug}`} className="bl-featured-card">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="bl-featured-inner"
                  >
                    <div className="bl-featured-text">
                      <span className="bl-featured-pill">Featured</span>
                      <h2>{featured.title}</h2>
                      <p>{featured.description}</p>
                      <div className="bl-meta">
                        <span><FiCalendar /> {formatDate(featured.date)}</span>
                        <span><FiClock /> {featured.readingTime}</span>
                        {featured.author && <span>· {featured.author}</span>}
                      </div>
                    </div>
                    <div className="bl-featured-art">
                      {featured.cover ? (
                        <CoverArt cover={featured.cover} eager />
                      ) : (
                        <>
                          <div className="art-grid" />
                          <div className="art-glow a" />
                          <div className="art-glow b" />
                        </>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            </section>
          )}

          {rest.length > 0 && (
            <section className="bl-grid-section">
              <StaggerGroup className="bl-grid" stagger={0.06}>
                {rest.map((p) => (
                  <StaggerItem key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="bl-card">
                      <motion.article
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="bl-card-cover">
                          {p.cover ? (
                            <CoverArt cover={p.cover} />
                          ) : (
                            <>
                              <div className="bl-card-hue" />
                              <span className="bl-card-emoji">
                                {p.tags?.[0]?.charAt(0).toUpperCase() || "R"}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="bl-card-body">
                          <h3>{p.title}</h3>
                          <p>{p.description}</p>
                          <div className="bl-meta">
                            <span><FiCalendar /> {formatDate(p.date)}</span>
                            <span><FiClock /> {p.readingTime}</span>
                          </div>
                          {p.tags && p.tags.length > 0 && (
                            <div className="bl-card-tags">
                              {p.tags.slice(0, 3).map((t) => (
                                <span key={t}><FiTag /> {t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.article>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>
          )}
        </>
      )}
    </main>
  );
};
