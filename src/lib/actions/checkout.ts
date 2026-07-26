"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db";
import { orders, products } from "@/db/schema";
import { getCatalogProduct } from "@/lib/catalog";
import { sendOrderEmails } from "@/lib/email";

const checkoutSchema = z
  .object({
    productSlug: z.string().min(1),
    quantity: z.coerce.number().int().min(1).max(20),
    customerName: z.string().trim().min(2),
    customerEmail: z.string().trim().email(),
    customerPhone: z.string().trim().min(6),
    deliveryType: z.enum(["office", "address"]),
    city: z.string().trim().min(2),
    postCode: z.string().trim().min(3),
    econtOfficeCode: z.string().trim().optional(),
    econtOfficeName: z.string().trim().optional(),
    street: z.string().trim().optional(),
    streetNumber: z.string().trim().optional(),
    addressExtra: z.string().trim().optional(),
    paymentMethod: z.enum(["cod", "bank"]),
    notes: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryType === "office") {
      if (!data.econtOfficeCode) {
        ctx.addIssue({
          code: "custom",
          path: ["econtOfficeCode"],
          message: "Econt office code is required",
        });
      }
      if (!data.econtOfficeName) {
        ctx.addIssue({
          code: "custom",
          path: ["econtOfficeName"],
          message: "Econt office name is required",
        });
      }
    }
    if (data.deliveryType === "address") {
      if (!data.street) {
        ctx.addIssue({
          code: "custom",
          path: ["street"],
          message: "Street is required",
        });
      }
      if (!data.streetNumber) {
        ctx.addIssue({
          code: "custom",
          path: ["streetNumber"],
          message: "Street number is required",
        });
      }
    }
  });

export type CheckoutActionState = {
  ok: boolean;
  message: string;
  orderId?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function placeOrder(
  _prev: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const parsed = checkoutSchema.safeParse({
    productSlug: formData.get("productSlug"),
    quantity: formData.get("quantity") || 1,
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
    deliveryType: formData.get("deliveryType"),
    city: formData.get("city"),
    postCode: formData.get("postCode"),
    econtOfficeCode: formData.get("econtOfficeCode") || undefined,
    econtOfficeName: formData.get("econtOfficeName") || undefined,
    street: formData.get("street") || undefined,
    streetNumber: formData.get("streetNumber") || undefined,
    addressExtra: formData.get("addressExtra") || undefined,
    paymentMethod: formData.get("paymentMethod"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const catalogItem = getCatalogProduct(parsed.data.productSlug);
  if (!catalogItem || catalogItem.pricing.type !== "fixed") {
    return {
      ok: false,
      message: "This product can’t be ordered online. Please request a quote instead.",
    };
  }

  if (!hasDatabaseUrl()) {
    return {
      ok: false,
      message: "Orders are temporarily unavailable. Please email the workshop.",
    };
  }

  try {
    const db = getDb();
    const productRows = await db
      .select({ id: products.id, name: products.name })
      .from(products)
      .where(eq(products.slug, parsed.data.productSlug))
      .limit(1);

    const unit = catalogItem.pricing.amountEur;
    const total = unit * parsed.data.quantity;
    const productName = catalogItem.name.en;

    const [inserted] = await db
      .insert(orders)
      .values({
        productId: productRows[0]?.id ?? null,
        productSlug: parsed.data.productSlug,
        productName,
        quantity: parsed.data.quantity,
        unitPriceEur: unit.toFixed(2),
        totalEur: total.toFixed(2),
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail,
        customerPhone: parsed.data.customerPhone,
        deliveryType: parsed.data.deliveryType,
        city: parsed.data.city,
        postCode: parsed.data.postCode,
        econtOfficeCode: parsed.data.econtOfficeCode ?? null,
        econtOfficeName: parsed.data.econtOfficeName ?? null,
        street: parsed.data.street ?? null,
        streetNumber: parsed.data.streetNumber ?? null,
        addressExtra: parsed.data.addressExtra ?? null,
        paymentMethod: parsed.data.paymentMethod,
        notes: parsed.data.notes ?? null,
        status: "new",
      })
      .returning({ id: orders.id });

    const orderId = inserted.id;

    await sendOrderEmails({
      orderId,
      productName,
      quantity: parsed.data.quantity,
      totalEur: total.toFixed(2),
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      customerPhone: parsed.data.customerPhone,
      deliveryType: parsed.data.deliveryType,
      city: parsed.data.city,
      postCode: parsed.data.postCode,
      econtOfficeCode: parsed.data.econtOfficeCode,
      econtOfficeName: parsed.data.econtOfficeName,
      street: parsed.data.street,
      streetNumber: parsed.data.streetNumber,
      addressExtra: parsed.data.addressExtra,
      paymentMethod: parsed.data.paymentMethod,
      notes: parsed.data.notes,
    });

    return {
      ok: true,
      message: "Order placed.",
      orderId,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Something went wrong saving the order. Please try again.",
    };
  }
}
