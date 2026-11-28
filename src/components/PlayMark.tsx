/**
 * The Google Play mark, drawn as its four facets rather than loaded as an
 * image: crisp at any size, inherits whatever metrics surround it, and costs
 * no extra request. Shared by the nav's announce bar and the landing CTAs.
 */
export const PlayMark = ({ size = 17, className }: { size?: number; className?: string }) => (
  <svg
    className={className}
    width={size}
    height={Math.round(size * 1.12)}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M3 1.8 13.6 12 3 22.2Z" fill="#00C3FF" />
    <path d="M3 1.8 17.2 9.9 13.6 12Z" fill="#00E676" />
    <path d="M3 22.2 13.6 12l3.6 2.1Z" fill="#FF3D47" />
    <path d="M17.2 9.9 20.8 12l-3.6 2.1L13.6 12Z" fill="#FFCE00" />
  </svg>
);
