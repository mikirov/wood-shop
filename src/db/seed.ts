import { config } from "dotenv";
import { getDb } from "./index";
import { products } from "./schema";
import { CATALOG } from "../lib/catalog";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });
config();

async function seed() {
  const db = getDb();

  for (const item of CATALOG) {
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.slug, item.slug))
      .limit(1);

    const payload = {
      slug: item.slug,
      name: item.name,
      tagline: item.tagline,
      description: item.description,
      materials: item.materials,
      dimensions: item.dimensions,
      leadTime: item.leadTime,
      priceFrom: item.priceFrom,
      heroImage: item.heroImage,
      galleryImages: JSON.stringify(item.galleryImages),
      sortOrder: item.sortOrder,
      active: true,
    };

    if (existing[0]) {
      await db
        .update(products)
        .set(payload)
        .where(eq(products.slug, item.slug));
      console.log(`Updated: ${item.slug}`);
    } else {
      await db.insert(products).values(payload);
      console.log(`Inserted: ${item.slug}`);
    }
  }

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
