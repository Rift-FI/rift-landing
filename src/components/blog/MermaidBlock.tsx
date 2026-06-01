import { useEffect, useId, useRef, useState } from "react";

let mermaidPromise: Promise<typeof import("mermaid").default> | null = null;

function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => {
      const mermaid = m.default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: {
          primaryColor: "#0093b2",
          primaryTextColor: "#121212",
          primaryBorderColor: "#0093b2",
          lineColor: "#22262b",
          secondaryColor: "#c3f709",
          tertiaryColor: "#f6faff",
          fontFamily: "Figtree, sans-serif",
          fontSize: "14px",
        },
        flowchart: { curve: "basis", htmlLabels: true },
        sequence: { useMaxWidth: true },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

interface Props {
  code: string;
}

export const MermaidBlock = ({ code }: Props) => {
  const id = useId().replace(/:/g, "_");
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const renderId = `mmd-${id}-${Math.floor(Math.random() * 100000)}`;

    (async () => {
      try {
        const mermaid = await getMermaid();
        const { svg } = await mermaid.render(renderId, code.trim());
        if (!cancelled) {
          setSvg(svg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram"
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return (
      <div className="mermaid-error">
        <p>Could not render diagram</p>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!svg) {
    return <div className="mermaid-block mermaid-loading" aria-hidden />;
  }

  return (
    <div
      ref={ref}
      className="mermaid-block"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
