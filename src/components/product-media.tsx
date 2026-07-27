import Image from "next/image";
import { isDataImage } from "@/lib/images";

type ProductMediaProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProductMedia({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
}: ProductMediaProps) {
  if (isDataImage(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
