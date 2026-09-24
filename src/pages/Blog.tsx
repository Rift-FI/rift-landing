import { useMemo, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";


import { FiSearch } from "react-icons/fi";

import { RiftIcon } from "../components/rift/RiftIcon";

import { CoverArt } from "../components/blog/CoverArt";

import { posts } from "../lib/posts";



function formatDate(iso: string) {

  try {

    return new Date(iso).toLocaleDateString("en-GB", {

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





  return (

    <main id="main" className="r-journal">





      <section className="r-page-intro"><div className="r-shell"><h1>Rift Journal</h1><p>Ideas on money, emerging markets and the businesses building Africa’s economy.</p></div></section>

      <div className="r-shell r-journal-content">

        <div className="r-journal-tools"><label className="r-search"><FiSearch aria-hidden="true" /><input type="search" placeholder="Search articles" value={query} onChange={e => onSearch(e.target.value)} aria-label="Search blog posts" /></label>

          <div className="r-filter-tabs" aria-label="Filter articles by topic"><button aria-pressed={activeTag === null} onClick={() => onTag(null)}>All articles</button>{allTags.map(t => <button key={t} aria-pressed={activeTag === t} onClick={() => onTag(t)}>{t}</button>)}</div>

        </div>

        {filtered.length === 0 ? <div className="r-empty" role="status"><h2>No articles found.</h2><p>Try another search or clear your filters.</p><button className="r-button r-button-outline" onClick={() => { setQuery(""); setActiveTag(null); setSearchParams({}); }}>Clear filters</button></div> :

          <div className="r-editorial-list">{filtered.map(p => <Link to={`/blog/${p.slug}`} className="r-editorial-row" key={p.slug}>

            <div className="r-editorial-image"><CoverArt cover={p.cover || "/brand/rift-capital-sculpture.png"} /></div>

            <div className="r-editorial-copy"><div className="r-article-meta"><time dateTime={p.date}>{formatDate(p.date)}</time><span>{p.readingTime}</span></div><h2>{p.title}</h2><p>{p.description}</p><span className="r-link">Read article <RiftIcon name="arrow" /></span></div>

          </Link>)}</div>}

      </div>

    </main>

  );

};

