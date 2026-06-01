import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { MermaidBlock } from "./MermaidBlock";
import "highlight.js/styles/github-dark.css";

interface Props {
  content: string;
}

export const Markdown = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, rehypeHighlight]}
      components={{
        code(props) {
          const { className, children, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const lang = match?.[1];
          const text = String(children).replace(/\n$/, "");

          if (lang === "mermaid") {
            return <MermaidBlock code={text} />;
          }

          // Inline code (no language class, no newlines)
          if (!lang && !text.includes("\n")) {
            return (
              <code className="md-inline-code" {...rest}>
                {children}
              </code>
            );
          }

          return (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        },
        a({ href, children, ...rest }) {
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
              {...rest}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
