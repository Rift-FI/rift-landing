import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from "react-icons/fi";
import { Markdown } from "../components/blog/Markdown";
import { Reveal } from "../components/motion/Reveal";
import { getPost, posts } from "../lib/posts";
import "../styles/components/blog/blog-post.scss";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    const handler = () => {
      const scroll = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scroll / max) * 100 : 0;
      const bar = document.getElementById("bp-progress");
      if (bar) bar.style.width = `${pct}%`;
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const onShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.description, url });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <main id="blog-post">
      <Helmet>
        <html lang="en" />
        <title>{`${post.title} — Rift Blog`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://riftfi.xyz/blog/${post.slug}`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://riftfi.xyz/blog/${post.slug}`} />
        <meta property="og:image" content="https://riftfi.xyz/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Rift Finance" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:section" content="Essay" />
        {post.author && <meta property="article:author" content={post.author} />}
        {post.tags?.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tryrift" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content="https://riftfi.xyz/og-image.png" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.description,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": post.author || "Rift Team",
            "url": "https://riftfi.xyz/blog"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Rift Finance",
            "url": "https://riftfi.xyz/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://riftfi.xyz/assets/rift-logo.png",
              "width": 512,
              "height": 512
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://riftfi.xyz/blog/${post.slug}`
          },
          "url": `https://riftfi.xyz/blog/${post.slug}`,
          "image": {
            "@type": "ImageObject",
            "url": "https://riftfi.xyz/og-image.png",
            "width": 1200,
            "height": 630
          },
          "wordCount": post.content.trim().split(/\s+/).length,
          "articleSection": post.tags?.[0] || "Essay",
          "keywords": post.tags?.join(", ")
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://riftfi.xyz/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://riftfi.xyz/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://riftfi.xyz/blog/${post.slug}` }
          ]
        })}</script>
      </Helmet>

      <div id="bp-progress" className="bp-progress" />

      <div className="bp-back">
        <Link to="/blog"><FiArrowLeft /> All posts</Link>
      </div>

      <article className="bp-article">
        <Reveal>
          <header className="bp-header">
            {post.tags && post.tags.length > 0 && (
              <div className="bp-tags">
                {post.tags.map((t) => (
                  <Link key={t} to={`/blog?tag=${encodeURIComponent(t)}`}>
                    <FiTag /> {t}
                  </Link>
                ))}
              </div>
            )}
            <h1>{post.title}</h1>
            <p className="bp-desc">{post.description}</p>
            <div className="bp-meta">
              <span><FiCalendar /> {formatDate(post.date)}</span>
              <span><FiClock /> {post.readingTime}</span>
              {post.author && <span>· {post.author}</span>}
              <button className="bp-share" onClick={onShare} aria-label="Share post">
                <FiShare2 /> Share
              </button>
            </div>
          </header>
        </Reveal>

        <motion.div
          className="bp-body"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Markdown content={post.content} />
        </motion.div>
      </article>

      {others.length > 0 && (
        <section className="bp-more">
          <Reveal>
            <h3>Keep reading</h3>
          </Reveal>
          <div className="bp-more-grid">
            {others.map((p) => (
              <Reveal key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="bp-more-card">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <span className="bp-more-meta">
                    <FiClock /> {p.readingTime}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
