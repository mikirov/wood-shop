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

export async function filesToDataUrls(files: File[]) {
  const results: string[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (!file.type.startsWith("image/")) {
      throw new Error(`Not an image: ${file.name}`);
    }
    if (file.size > 2_500_000) {
      throw new Error(`${file.name} is over 2.5MB. Compress it and try again.`);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    results.push(`data:${file.type};base64,${buffer.toString("base64")}`);
  }
  return results;
}
