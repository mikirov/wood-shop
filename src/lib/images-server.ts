import "server-only";
import sharp from "sharp";

const MAX_EDGE = 1600;
const JPEG_QUALITY = 72;

export async function compressImageToDataUrl(
  input: Buffer,
  mimeHint?: string,
): Promise<string> {
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const width = meta.width ?? MAX_EDGE;
  const height = meta.height ?? MAX_EDGE;
  const needsResize = width > MAX_EDGE || height > MAX_EDGE;

  let image = sharp(input, { failOn: "none" }).rotate();
  if (needsResize) {
    image = image.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const preferPng = mimeHint === "image/png" || meta.hasAlpha;
  if (preferPng) {
    const buffer = await image.png({ compressionLevel: 8 }).toBuffer();
    return `data:image/png;base64,${buffer.toString("base64")}`;
  }

  const buffer = await image
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export async function filesToDataUrls(files: File[]) {
  const results: string[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (!file.type.startsWith("image/")) {
      throw new Error(`Not an image: ${file.name}`);
    }
    if (file.size > 8_000_000) {
      throw new Error(`${file.name} is over 8MB.`);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    results.push(await compressImageToDataUrl(buffer, file.type));
  }
  return results;
}
