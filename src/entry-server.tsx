import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { posts } from "./lib/posts";
export const routes = ["/", "/businesses", "/how-it-works", "/blog", "/brand", "/terms", "/privacy", ...posts.map(p => `/blog/${p.slug}`)];
export function render(url: string) {
  const context = {};
  const html = renderToString(<HelmetProvider context={context}><StaticRouter location={url}><App /></StaticRouter></HelmetProvider>);
  return { html, context };
}
