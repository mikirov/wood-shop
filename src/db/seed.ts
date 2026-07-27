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

    const priceEur =
      item.pricing.type === "fixed" ? item.pricing.amountEur.toFixed(2) : null;

    const keepImages =
      existing[0]?.heroImage?.startsWith("data:image/") ?? false;

    const payload = {
      slug: item.slug,
      category: item.category,
      family: item.family ?? null,
      resin: item.resin ?? null,
      name: item.name.en,
      nameBg: item.name.bg,
      tagline: item.tagline.en,
      taglineBg: item.tagline.bg,
      description: item.description.en,
      descriptionBg: item.description.bg,
      materials: item.materials.en,
      materialsBg: item.materials.bg,
      dimensions: item.dimensions.en,
      dimensionsBg: item.dimensions.bg,
      leadTime: item.leadTime.en,
      leadTimeBg: item.leadTime.bg,
      pricingType: item.pricing.type,
      priceEur,
      priceFrom: priceEur ? `€${item.pricing.type === "fixed" ? item.pricing.amountEur : ""}` : null,
      heroImage: keepImages ? existing[0].heroImage : item.heroImage,
      galleryImages: keepImages
        ? existing[0].galleryImages
        : JSON.stringify(item.galleryImages),
      sortOrder: item.sortOrder,
      stockQty: existing[0]?.stockQty ?? (item.category === "shop" ? 10 : 0),
      active: true,
      updatedAt: new Date(),
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
