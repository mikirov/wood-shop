import { eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db";
import { products } from "@/db/schema";
import {
  CATALOG,
  getCatalogProduct,
  localizeProduct,
  type CatalogProduct,
} from "@/lib/catalog";
import type { Locale } from "@/i18n/config";

export type StoreProduct = ReturnType<typeof localizeProduct> & {
  id?: string;
};

async function attachIds(
  items: CatalogProduct[],
): Promise<Array<CatalogProduct & { id?: string }>> {
  if (!hasDatabaseUrl()) {
    return items;
  }

  try {
    const db = getDb();
    const rows = await db.select().from(products);
    const bySlug = new Map(rows.map((row) => [row.slug, row.id]));
    return items.map((item) => ({
      ...item,
      id: bySlug.get(item.slug),
    }));
  } catch {
    return items;
  }
}

export async function listProducts(locale: Locale): Promise<StoreProduct[]> {
  const withIds = await attachIds(
    [...CATALOG].sort((a, b) => a.sortOrder - b.sortOrder),
  );
  return withIds.map((item) => ({
    ...localizeProduct(item, locale),
    id: item.id,
  }));
}

export async function getProductBySlug(
  slug: string,
  locale: Locale,
): Promise<StoreProduct | null> {
  const item = getCatalogProduct(slug);
  if (!item) {
    return null;
  }

  let id: string | undefined;
  if (hasDatabaseUrl()) {
    try {
      const db = getDb();
      const rows = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, slug))
        .limit(1);
      id = rows[0]?.id;
    } catch {
      id = undefined;
    }
  }

  return { ...localizeProduct(item, locale), id };
}
