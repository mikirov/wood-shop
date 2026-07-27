export function parseGalleryImages(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function collectProductImages(heroImage: string, galleryRaw: string) {
  const gallery = parseGalleryImages(galleryRaw);
  const images = [heroImage, ...gallery].filter(Boolean);
  return Array.from(new Set(images));
}

export function isDataImage(src: string) {
  return src.startsWith("data:image/");
}
