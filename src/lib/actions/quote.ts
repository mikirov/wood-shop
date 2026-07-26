"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db";
import { inquiries, products } from "@/db/schema";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().optional(),
  productSlug: z.string().trim().optional(),
  preferredDimensions: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please share a bit more detail"),
});

export type QuoteActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitQuote(
  _prev: QuoteActionState,
  formData: FormData,
): Promise<QuoteActionState> {
  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    productSlug: formData.get("productSlug") || undefined,
    preferredDimensions: formData.get("preferredDimensions") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!hasDatabaseUrl()) {
    return {
      ok: false,
      message:
        "Inquiries are temporarily unavailable. Please email the atelier directly.",
    };
  }

  try {
    const db = getDb();
    let productId: string | undefined;

    if (parsed.data.productSlug) {
      const rows = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, parsed.data.productSlug))
        .limit(1);
      productId = rows[0]?.id;
    }

    await db.insert(inquiries).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      productId: productId ?? null,
      preferredDimensions: parsed.data.preferredDimensions || null,
      message: parsed.data.message,
      status: "new",
    });

    return {
      ok: true,
      message:
        "Your request is with the atelier. We will reply within two business days.",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong saving your request. Please try again.",
    };
  }
}
