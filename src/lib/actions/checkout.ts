"use server";

import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/db";
import { orders, products } from "@/db/schema";
import { sendOrderEmails } from "@/lib/email";
import { nextInvoiceNumber } from "@/lib/invoice";
import { dbRowToCatalog } from "@/lib/products";

const lineSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

const checkoutSchema = z
  .object({
    linesJson: z.string().min(2),
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
  invoiceNumber?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function placeOrder(
  _prev: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const parsed = checkoutSchema.safeParse({
    linesJson: formData.get("linesJson"),
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

  let requestedLines: z.infer<typeof lineSchema>[] = [];
  try {
    const raw = JSON.parse(parsed.data.linesJson) as unknown;
    const result = z.array(lineSchema).min(1).safeParse(raw);
    if (!result.success) {
      return { ok: false, message: "Your basket is empty or invalid." };
    }
    requestedLines = result.data;
  } catch {
    return { ok: false, message: "Your basket is empty or invalid." };
  }

  if (!hasDatabaseUrl()) {
    return {
      ok: false,
      message: "Orders are temporarily unavailable. Please email the workshop.",
    };
  }

  try {
    const db = getDb();
    const resolved: Array<{
      productId: string;
      slug: string;
      name: string;
      quantity: number;
      unitPriceEur: number;
      lineTotalEur: number;
    }> = [];

    for (const line of requestedLines) {
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.slug, line.slug))
        .limit(1);
      const row = rows[0];
      if (!row || !row.active || row.category !== "shop") {
        return {
          ok: false,
          message: `Product “${line.slug}” is not available for checkout.`,
        };
      }
      if (row.stockQty < line.quantity) {
        return {
          ok: false,
          message:
            row.stockQty <= 0
              ? `“${row.name}” is sold out.`
              : `Only ${row.stockQty} left of “${row.name}”.`,
        };
      }
      const catalog = dbRowToCatalog(row);
      if (catalog.pricing.type !== "fixed") {
        return {
          ok: false,
          message: `“${catalog.name.en}” needs a quote, not checkout.`,
        };
      }
      resolved.push({
        productId: row.id,
        slug: row.slug,
        name: catalog.name.en,
        quantity: line.quantity,
        unitPriceEur: catalog.pricing.amountEur,
        lineTotalEur: catalog.pricing.amountEur * line.quantity,
      });
    }

    const total = resolved.reduce((sum, line) => sum + line.lineTotalEur, 0);
    const quantity = resolved.reduce((sum, line) => sum + line.quantity, 0);
    const summaryName =
      resolved.length === 1 ? resolved[0].name : `${resolved.length} items`;
    const primary = resolved[0];
    const invoiceNumber = await nextInvoiceNumber();

    const [inserted] = await db
      .insert(orders)
      .values({
        productId: primary.productId,
        productSlug: primary.slug,
        productName: summaryName,
        quantity,
        unitPriceEur: primary.unitPriceEur.toFixed(2),
        totalEur: total.toFixed(2),
        lineItemsJson: JSON.stringify(
          resolved.map((line) => ({
            slug: line.slug,
            name: line.name,
            quantity: line.quantity,
            unitPriceEur: line.unitPriceEur,
            lineTotalEur: line.lineTotalEur,
          })),
        ),
        invoiceNumber,
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

    for (const line of resolved) {
      await db
        .update(products)
        .set({
          stockQty: sql`${products.stockQty} - ${line.quantity}`,
          updatedAt: new Date(),
        })
        .where(eq(products.id, line.productId));
    }

    const orderId = inserted.id;
    const linesText = resolved
      .map(
        (line) =>
          `- ${line.name} × ${line.quantity} @ €${line.unitPriceEur.toFixed(2)} = €${line.lineTotalEur.toFixed(2)}`,
      )
      .join("\n");

    await sendOrderEmails({
      orderId,
      invoiceNumber,
      productName: summaryName,
      quantity,
      totalEur: total.toFixed(2),
      linesText,
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
      invoiceNumber,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Something went wrong saving the order. Please try again.",
    };
  }
}
