"use client";

import Image from "next/image";
import { useState } from "react";
import { isDataImage } from "@/lib/images";

type ProductSlideshowProps = {
  images: string[];
  alt: string;
  className?: string;
};

function SlideImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  if (isDataImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className="object-cover"
      sizes="100vw"
      unoptimized={src.startsWith("data:")}
    />
  );
}

export function ProductSlideshow({
  images,
  alt,
  className = "",
}: ProductSlideshowProps) {
  const slides = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);
  if (slides.length === 0) {
    return <div className={`bg-surface ${className}`} />;
  }

  const current = slides[Math.min(index, slides.length - 1)];
  const multi = slides.length > 1;

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <SlideImage src={current} alt={alt} priority={index === 0} />
      {multi ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer border border-border bg-background/70 px-3 py-2 text-xs tracking-[0.14em] text-foreground uppercase hover:border-accent"
            onClick={() =>
              setIndex((value) => (value - 1 + slides.length) % slides.length)
            }
          >
            Prev
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer border border-border bg-background/70 px-3 py-2 text-xs tracking-[0.14em] text-foreground uppercase hover:border-accent"
            onClick={() => setIndex((value) => (value + 1) % slides.length)}
          >
            Next
          </button>
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((src, slideIndex) => (
              <button
                key={`${slideIndex}-${src.slice(0, 20)}`}
                type="button"
                aria-label={`Go to image ${slideIndex + 1}`}
                className={`h-2 w-2 cursor-pointer rounded-full ${
                  slideIndex === index ? "bg-accent" : "bg-foreground/40"
                }`}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
