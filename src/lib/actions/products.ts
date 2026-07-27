"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabaseUrl } from "@/db";
import { products } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/auth";
import { filesToDataUrls } from "@/lib/images-server";
import { parseGalleryImages } from "@/lib/images";
import { revalidateStorefront } from "@/lib/revalidate";

export type ProductActionState = {
  ok: boolean;
  message: string;
  productId?: string;
  fieldErrors?: Record<string, string[]>;
};

const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase slug-with-dashes"),
  category: z.enum(["shop", "custom"]),
  family: z.string().trim().optional(),
  resin: z.enum(["blue", "black", ""]).optional(),
  name: z.string().trim().min(2),
  nameBg: z.string().trim().optional(),
  tagline: z.string().trim().min(2),
  taglineBg: z.string().trim().optional(),
  description: z.string().trim().min(10),
  descriptionBg: z.string().trim().optional(),
  materials: z.string().trim().min(2),
  materialsBg: z.string().trim().optional(),
  dimensions: z.string().trim().min(2),
  dimensionsBg: z.string().trim().optional(),
  leadTime: z.string().trim().min(1),
  leadTimeBg: z.string().trim().optional(),
  pricingType: z.enum(["fixed", "quote"]),
  priceEur: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  stockQty: z.coerce.number().int().min(0).max(99999),
  active: z.enum(["true", "false"]),
});

function requireAdmin() {
  return isAdminAuthenticated();
}

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    slug: formData.get("slug"),
    category: formData.get("category"),
    family: formData.get("family") || undefined,
    resin: formData.get("resin") || undefined,
    name: formData.get("name"),
    nameBg: formData.get("nameBg") || undefined,
    tagline: formData.get("tagline"),
    taglineBg: formData.get("taglineBg") || undefined,
    description: formData.get("description"),
    descriptionBg: formData.get("descriptionBg") || undefined,
    materials: formData.get("materials"),
    materialsBg: formData.get("materialsBg") || undefined,
    dimensions: formData.get("dimensions"),
    dimensionsBg: formData.get("dimensionsBg") || undefined,
    leadTime: formData.get("leadTime"),
    leadTimeBg: formData.get("leadTimeBg") || undefined,
    pricingType: formData.get("pricingType"),
    priceEur: formData.get("priceEur") || undefined,
    sortOrder: formData.get("sortOrder") || 0,
    stockQty: formData.get("stockQty") || 0,
    active: formData.get("active") || "true",
  });
}

async function readUploadedImages(formData: FormData) {
  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);
  return filesToDataUrls(files);
}

export async function createProduct(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  if (!(await requireAdmin())) {
    return { ok: false, message: "Unauthorized" };
  }
  if (!hasDatabaseUrl()) {
    return { ok: false, message: "DATABASE_URL missing" };
  }

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (parsed.data.pricingType === "fixed") {
    const amount = Number(parsed.data.priceEur);
    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        ok: false,
        message: "Fixed-price products need a valid EUR amount.",
        fieldErrors: { priceEur: ["Enter a price in EUR"] },
      };
    }
  }

  try {
    const uploaded = await readUploadedImages(formData);
    if (uploaded.length === 0) {
      return { ok: false, message: "Upload at least one image." };
    }

    const db = getDb();
    const [row] = await db
      .insert(products)
      .values({
        slug: parsed.data.slug,
        category: parsed.data.category,
        family: parsed.data.family || null,
        resin: parsed.data.resin || null,
        name: parsed.data.name,
        nameBg: parsed.data.nameBg || null,
        tagline: parsed.data.tagline,
        taglineBg: parsed.data.taglineBg || null,
        description: parsed.data.description,
        descriptionBg: parsed.data.descriptionBg || null,
        materials: parsed.data.materials,
        materialsBg: parsed.data.materialsBg || null,
        dimensions: parsed.data.dimensions,
        dimensionsBg: parsed.data.dimensionsBg || null,
        leadTime: parsed.data.leadTime,
        leadTimeBg: parsed.data.leadTimeBg || null,
        pricingType: parsed.data.pricingType,
        priceEur:
          parsed.data.pricingType === "fixed"
            ? Number(parsed.data.priceEur).toFixed(2)
            : null,
        priceFrom:
          parsed.data.pricingType === "fixed"
            ? `€${Number(parsed.data.priceEur)}`
            : null,
        heroImage: uploaded[0],
        galleryImages: JSON.stringify(uploaded.slice(1)),
        sortOrder: parsed.data.sortOrder,
        stockQty: parsed.data.stockQty,
        active: parsed.data.active === "true",
        updatedAt: new Date(),
      })
      .returning({ id: products.id });

    revalidateStorefront();
    return {
      ok: true,
      message: "Product created.",
      productId: row.id,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Could not create product.",
    };
  }
}

export async function updateProduct(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  if (!(await requireAdmin())) {
    return { ok: false, message: "Unauthorized" };
  }
  if (!hasDatabaseUrl()) {
    return { ok: false, message: "DATABASE_URL missing" };
  }

  const id = String(formData.get("id") || "");
  if (!id) return { ok: false, message: "Missing product id." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (parsed.data.pricingType === "fixed") {
    const amount = Number(parsed.data.priceEur);
    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        ok: false,
        message: "Fixed-price products need a valid EUR amount.",
        fieldErrors: { priceEur: ["Enter a price in EUR"] },
      };
    }
  }

  try {
    const db = getDb();
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    if (!existing[0]) return { ok: false, message: "Product not found." };

    const keepRaw = formData.get("keepImages");
    let images: string[] = [];
    if (typeof keepRaw === "string" && keepRaw.trim()) {
      try {
        images = JSON.parse(keepRaw) as string[];
      } catch {
        images = [];
      }
    } else {
      images = [
        existing[0].heroImage,
        ...parseGalleryImages(existing[0].galleryImages),
      ];
    }

    const uploaded = await readUploadedImages(formData);
    images = [...images, ...uploaded].filter(Boolean);
    if (images.length === 0) {
      return { ok: false, message: "A product needs at least one image." };
    }

    await db
      .update(products)
      .set({
        slug: parsed.data.slug,
        category: parsed.data.category,
        family: parsed.data.family || null,
        resin: parsed.data.resin || null,
        name: parsed.data.name,
        nameBg: parsed.data.nameBg || null,
        tagline: parsed.data.tagline,
        taglineBg: parsed.data.taglineBg || null,
        description: parsed.data.description,
        descriptionBg: parsed.data.descriptionBg || null,
        materials: parsed.data.materials,
        materialsBg: parsed.data.materialsBg || null,
        dimensions: parsed.data.dimensions,
        dimensionsBg: parsed.data.dimensionsBg || null,
        leadTime: parsed.data.leadTime,
        leadTimeBg: parsed.data.leadTimeBg || null,
        pricingType: parsed.data.pricingType,
        priceEur:
          parsed.data.pricingType === "fixed"
            ? Number(parsed.data.priceEur).toFixed(2)
            : null,
        priceFrom:
          parsed.data.pricingType === "fixed"
            ? `€${Number(parsed.data.priceEur)}`
            : null,
        heroImage: images[0],
        galleryImages: JSON.stringify(images.slice(1)),
        sortOrder: parsed.data.sortOrder,
        stockQty: parsed.data.stockQty,
        active: parsed.data.active === "true",
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));

    revalidateStorefront();
    return { ok: true, message: "Product updated.", productId: id };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Could not update product.",
    };
  }
}

export async function deleteProduct(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  if (!hasDatabaseUrl()) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const db = getDb();
  await db.delete(products).where(eq(products.id, id));
  revalidateStorefront();
}
