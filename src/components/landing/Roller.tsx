/**
 * Odometer number. Each digit is a 0-9 strip that slides to its value, so a
 * change reads as the number itself moving rather than one string swapped
 * for another. CSS transitions (not keyframes) so a new value mid-roll
 * retargets from wherever the strip is.
 *
 * Columns are keyed from the right: the units digit stays the same element
 * when the number grows, which is what keeps "9,999 → 10,000" calm.
 */
const STRIP = "0123456789".split("");

export const Roller = ({ text, className }: { text: string; className?: string }) => {
  const chars = text.split("");
  const n = chars.length;
  return (
    <span className={"rl-roll" + (className ? " " + className : "")}>
      <span className="rl-sr">{text}</span>
      <span className="rl-roll-v" aria-hidden="true">
        {chars.map((c, i) => {
          const pos = n - i;
          if (c >= "0" && c <= "9") {
            return (
              <span className="rl-col" key={"d" + pos} style={{ ["--i" as string]: pos }}>
                <span className="rl-strip" style={{ ["--n" as string]: c }}>
                  {STRIP.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </span>
              </span>
            );
          }
          return (
            <span className="rl-sym" key={"s" + pos + c}>
              {c}
            </span>
          );
        })}
      </span>
    </span>
  );
};
