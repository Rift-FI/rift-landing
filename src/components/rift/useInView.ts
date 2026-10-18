import { useEffect, useRef, useState } from "react";

/**
 * Fires once when an element reaches the viewport. Returns a ref and a flag.
 *
 * Deliberately not framer-motion: everything it drives here is a predetermined
 * CSS animation, and CSS runs off the main thread, so it keeps its frames while
 * the page is still loading fonts and images. Framer's requestAnimationFrame
 * loop does not.
 *
 * `rootMargin` of -12% means the reveal starts a little after the element's top
 * edge appears, so content is not already animating before the reader's eye
 * reaches it.
 */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anyone who has asked for less motion gets the end state immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
