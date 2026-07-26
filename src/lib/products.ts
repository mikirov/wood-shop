import { asc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db";
import { products, type Product } from "@/db/schema";
import { CATALOG, getCatalogProduct, type CatalogProduct } from "@/lib/catalog";

export type StoreProduct = CatalogProduct & { id?: string };

function fromDbRow(row: Product): StoreProduct {
  let galleryImages: string[] = [];
  try {
    galleryImages = JSON.parse(row.galleryImages) as string[];
  } catch {
    galleryImages = [row.heroImage];
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    materials: row.materials,
    dimensions: row.dimensions,
    leadTime: row.leadTime,
    priceFrom: row.priceFrom ?? "",
    heroImage: row.heroImage,
    galleryImages,
    sortOrder: row.sortOrder,
  };
}

export async function listProducts(): Promise<StoreProduct[]> {
  if (!hasDatabaseUrl()) {
    return [...CATALOG].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.active, true))
      .orderBy(asc(products.sortOrder));

    if (rows.length === 0) {
      return [...CATALOG].sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return rows.map(fromDbRow);
  } catch {
    return [...CATALOG].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<StoreProduct | null> {
  if (!hasDatabaseUrl()) {
    return getCatalogProduct(slug) ?? null;
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (rows[0]) {
      return fromDbRow(rows[0]);
    }
  } catch {
    // fall through to catalog
  }

  return getCatalogProduct(slug) ?? null;
}
