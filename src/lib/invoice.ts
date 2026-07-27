import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orders } from "@/db/schema";

export async function nextInvoiceNumber() {
  const db = getDb();
  const year = new Date().getFullYear();
  const prefix = `OR-${year}-`;
  const rows = await db
    .select({ invoiceNumber: orders.invoiceNumber })
    .from(orders)
    .where(sql`${orders.invoiceNumber} like ${`${prefix}%`}`);

  let max = 0;
  for (const row of rows) {
    const value = row.invoiceNumber ?? "";
    const n = Number(value.slice(prefix.length));
    if (Number.isFinite(n) && n > max) max = n;
  }

  return `${prefix}${String(max + 1).padStart(4, "0")}`;
}
