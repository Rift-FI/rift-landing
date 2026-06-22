/** Renders a post cover as a looping video (.mp4/.webm) or an image. */
export const CoverArt = ({ cover, eager }: { cover: string; eager?: boolean }) => {
  const isVideo = /\.(mp4|webm)$/i.test(cover);

  if (isVideo) {
    return (
      <video
        className="bl-art-video"
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? "metadata" : "none"}
        poster={cover.replace(/\.(mp4|webm)$/i, "-poster.jpg")}
        aria-hidden="true"
      >
        <source src={cover} type="video/mp4" />
      </video>
    );
  }

  return (
    <img className="bl-art-img" src={cover} alt="" loading={eager ? "eager" : "lazy"} />
  );
};
