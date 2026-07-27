import { and, asc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db";
import { products, type Product } from "@/db/schema";
import {
  CATALOG,
  formatFixedPrice,
  getCatalogProduct,
  localizeProduct,
  type CatalogProduct,
  type ResinColor,
} from "@/lib/catalog";
import { collectProductImages, parseGalleryImages } from "@/lib/images";
import type { Locale } from "@/i18n/config";

export type StoreProduct = ReturnType<typeof localizeProduct> & {
  id?: string;
  images: string[];
};

function pickLocalized(
  locale: Locale,
  en: string,
  bg: string | null | undefined,
) {
  if (locale === "bg" && bg?.trim()) return bg;
  return en;
}

export function dbRowToCatalog(row: Product): CatalogProduct {
  const price =
    row.priceEur != null && row.priceEur !== ""
      ? Number(row.priceEur)
      : row.priceFrom
        ? Number(String(row.priceFrom).replace(/[^\d.]/g, ""))
        : NaN;

  const pricing =
    row.pricingType === "quote" || !Number.isFinite(price)
      ? ({ type: "quote" } as const)
      : ({ type: "fixed", amountEur: price } as const);

  const gallery = parseGalleryImages(row.galleryImages);

  return {
    slug: row.slug,
    category: row.category,
    family: (row.family as CatalogProduct["family"]) || undefined,
    resin: (row.resin as ResinColor | null) || undefined,
    name: {
      en: row.name,
      bg: row.nameBg?.trim() || row.name,
    },
    tagline: {
      en: row.tagline,
      bg: row.taglineBg?.trim() || row.tagline,
    },
    description: {
      en: row.description,
      bg: row.descriptionBg?.trim() || row.description,
    },
    materials: {
      en: row.materials,
      bg: row.materialsBg?.trim() || row.materials,
    },
    dimensions: {
      en: row.dimensions,
      bg: row.dimensionsBg?.trim() || row.dimensions,
    },
    leadTime: {
      en: row.leadTime,
      bg: row.leadTimeBg?.trim() || row.leadTime,
    },
    pricing,
    heroImage: row.heroImage,
    galleryImages: gallery.length > 0 ? gallery : [row.heroImage],
    sortOrder: row.sortOrder,
  };
}

function toStoreProduct(
  item: CatalogProduct,
  locale: Locale,
  id?: string,
): StoreProduct {
  const localized = localizeProduct(item, locale);
  return {
    ...localized,
    id,
    images: collectProductImages(item.heroImage, JSON.stringify(item.galleryImages)),
  };
}

async function listDbProducts(): Promise<Array<CatalogProduct & { id: string }>> {
  if (!hasDatabaseUrl()) return [];
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.active, true))
      .orderBy(asc(products.sortOrder), asc(products.name));
    return rows.map((row) => ({ ...dbRowToCatalog(row), id: row.id }));
  } catch (error) {
    console.error("listDbProducts failed", error);
    return [];
  }
}

export async function listProducts(locale: Locale): Promise<StoreProduct[]> {
  const fromDb = await listDbProducts();
  if (fromDb.length > 0) {
    return fromDb.map((item) => toStoreProduct(item, locale, item.id));
  }

  return [...CATALOG]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => toStoreProduct(item, locale));
}

export async function listShopProducts(locale: Locale) {
  return (await listProducts(locale)).filter((p) => p.category === "shop");
}

export async function listCustomProducts(locale: Locale) {
  return (await listProducts(locale)).filter((p) => p.category === "custom");
}

export async function getProductBySlug(
  slug: string,
  locale: Locale,
): Promise<StoreProduct | null> {
  if (hasDatabaseUrl()) {
    try {
      const db = getDb();
      const rows = await db
        .select()
        .from(products)
        .where(and(eq(products.slug, slug), eq(products.active, true)))
        .limit(1);
      if (rows[0]) {
        return toStoreProduct(dbRowToCatalog(rows[0]), locale, rows[0].id);
      }
    } catch (error) {
      console.error("getProductBySlug db failed", error);
    }
  }

  const item = getCatalogProduct(slug);
  if (!item) return null;
  return toStoreProduct(item, locale);
}

export async function getFamilyVariantsFromStore(
  family: string,
  locale: Locale,
) {
  return (await listShopProducts(locale)).filter((p) => p.family === family);
}

export async function listAdminProducts() {
  if (!hasDatabaseUrl()) return [];
  const db = getDb();
  return db.select().from(products).orderBy(asc(products.sortOrder), asc(products.name));
}

export async function getAdminProduct(id: string) {
  if (!hasDatabaseUrl()) return null;
  const db = getDb();
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0] ?? null;
}

export { pickLocalized, formatFixedPrice };
