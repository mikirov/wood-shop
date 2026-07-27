import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { getDb } from "./index";
import { products } from "./schema";
import { parseGalleryImages } from "../lib/images";
import { compressImageToDataUrl } from "../lib/images-server";

config({ path: ".env.local" });
config();

const recompress = process.argv.includes("--recompress");

function isFilePath(src: string) {
  return src.startsWith("/") && !src.startsWith("//") && !src.startsWith("/data:");
}

async function toCompressedDataUrl(src: string) {
  if (src.startsWith("data:image/")) {
    if (!recompress) return src;
    const base64 = src.split(",")[1] ?? "";
    return compressImageToDataUrl(Buffer.from(base64, "base64"));
  }

  if (!isFilePath(src)) return src;

  const absolute = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const buffer = await readFile(absolute);
  return compressImageToDataUrl(buffer);
}

async function main() {
  const db = getDb();
  const rows = await db.select().from(products);
  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      const gallery = parseGalleryImages(row.galleryImages);
      const nextHero = await toCompressedDataUrl(row.heroImage);
      const nextGallery: string[] = [];
      for (const image of gallery) {
        if (image === row.heroImage) continue;
        nextGallery.push(await toCompressedDataUrl(image));
      }

      const heroChanged = nextHero !== row.heroImage;
      const galleryChanged =
        JSON.stringify(nextGallery) !== JSON.stringify(gallery);

      if (!heroChanged && !galleryChanged) {
        skipped += 1;
        console.log(`Skip: ${row.slug}`);
        continue;
      }

      await db
        .update(products)
        .set({
          heroImage: nextHero,
          galleryImages: JSON.stringify(nextGallery),
          updatedAt: new Date(),
        })
        .where(eq(products.id, row.id));

      updated += 1;
      const bytes = Buffer.byteLength(nextHero, "utf8");
      console.log(
        `Embedded: ${row.slug} (hero ~${Math.round(bytes / 1024)}KB, gallery ${nextGallery.length})`,
      );
    } catch (error) {
      console.error(`Failed: ${row.slug}`, error);
    }
  }

  console.log(`Done. Updated ${updated}, skipped ${skipped}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
