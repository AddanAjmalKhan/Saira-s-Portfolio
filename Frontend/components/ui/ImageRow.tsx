interface ImageRowProps {
  images?: string[] | null;
  className?: string;
}

/** A small row of up to 3 thumbnails for a content item (training, news, etc.). */
export default function ImageRow({ images, className = "" }: ImageRowProps) {
  if (!images || images.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {images.slice(0, 3).map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-36 w-full flex-1 min-w-[9rem] max-w-[15rem] rounded-xl border border-white/10 object-cover sm:h-44"
        />
      ))}
    </div>
  );
}
