import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { getDb } from "./index";
import { products } from "./schema";
import { parseGalleryImages } from "../lib/images";

config({ path: ".env.local" });
config();

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function isFilePath(src: string) {
  return src.startsWith("/") && !src.startsWith("//") && !src.startsWith("/data:");
}

async function pathToDataUrl(publicPath: string) {
  const absolute = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const ext = path.extname(absolute).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) {
    throw new Error(`Unsupported image type for ${publicPath}`);
  }
  try {
    const buffer = await readFile(absolute);
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(`File missing: ${publicPath}`);
    }
    throw error;
  }
}

async function embedIfNeeded(src: string) {
  if (!src) return src;
  if (src.startsWith("data:image/")) return src;
  if (!isFilePath(src)) return src;
  return pathToDataUrl(src);
}

async function main() {
  const db = getDb();
  const rows = await db.select().from(products);
  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    try {
      const gallery = parseGalleryImages(row.galleryImages);
      const nextHero = await embedIfNeeded(row.heroImage);
      const nextGallery: string[] = [];
      for (const image of gallery) {
        if (image === row.heroImage) continue;
        nextGallery.push(await embedIfNeeded(image));
      }

      const heroChanged = nextHero !== row.heroImage;
      const galleryChanged =
        JSON.stringify(nextGallery) !== JSON.stringify(gallery);

      if (!heroChanged && !galleryChanged) {
        skipped += 1;
        console.log(`Skip (already embedded or remote): ${row.slug}`);
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
