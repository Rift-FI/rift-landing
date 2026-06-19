import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export const Reveal = ({ children, className = "", style, as: Tag = "div" }: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`rv ${shown ? "in " : ""}${className}`} style={style}>
      {children}
    </Tag>
  );
};
