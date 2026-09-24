import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from "react-icons/fi";
import { Markdown } from "../components/blog/Markdown";
import { CoverArt } from "../components/blog/CoverArt";
import { getPost, posts } from "../lib/posts";

type AuthorInfo = { name: string; bio: string; calendly?: string; photo?: string };

const AUTHORS: Record<string, AuthorInfo> = {
  Amschel: {
    name: "Amschel",
    bio: "Cross-border trade, stablecoin and FX expert. Software engineer and CTO building derivatives and stablecoin rails.",
    calendly: "https://calendly.com/amschel-riftfi/30min",
    photo: "/amschel.jpeg",
  },
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

// old slugs that moved. Keep links alive.
const SLUG_REDIRECTS: Record<string, string> = {
  "black-market-is-a-price": "parallel-market-is-a-price",
};

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

  if (slug && SLUG_REDIRECTS[slug]) return <Navigate to={`/blog/${SLUG_REDIRECTS[slug]}`} replace />;
  if (!post) return <Navigate to="/blog" replace />;

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const authorInfo = post.author ? AUTHORS[post.author] : undefined;

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
    <main id="main" className="r-article-page">

      <div id="bp-progress" className="bp-progress" />

      <div className="bp-back">
        <Link to="/blog"><FiArrowLeft /> All posts</Link>
      </div>

      <article className="bp-article">
        <div>
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
        </div>

        {post.cover && (
          <div className="bp-art">
            <CoverArt cover={post.cover} eager />
          </div>
        )}

        <div className="bp-body">
          <Markdown content={post.content} />
        </div>
      </article>

      {authorInfo && (
        <section className="bp-author">
          <div>
            <div className="bp-author-card">
              {authorInfo.photo ? (
                <img className="bp-author-avatar" src={authorInfo.photo} alt={authorInfo.name} width="150" height="150" />
              ) : (
                <div className="bp-author-avatar" aria-hidden="true">
                  {authorInfo.name.charAt(0)}
                </div>
              )}
              <div className="bp-author-info">
                <span className="bp-author-label">Written by</span>
                <h3>{authorInfo.name}</h3>
                <p>{authorInfo.bio}</p>
                {authorInfo.calendly && (
                  <a
                    className="bp-author-cta"
                    href={authorInfo.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiCalendar /> Schedule a 30-min call
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="bp-more">
          <div>
            <h3>Keep reading</h3>
          </div>
          <div className="bp-more-grid">
            {others.map((p) => (
              <div key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="bp-more-card">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <span className="bp-more-meta">
                    <FiClock /> {p.readingTime}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
