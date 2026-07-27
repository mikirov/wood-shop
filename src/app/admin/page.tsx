import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { StatusSelect } from "@/components/status-select";
import { getDb, hasDatabaseUrl } from "@/db";
import { inquiries, orders, products } from "@/db/schema";
import { logoutAdmin } from "@/lib/actions/admin";
import { isAdminAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  if (!hasDatabaseUrl()) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-32">
        <p className="text-muted">
          DATABASE_URL is not configured. Inquiries cannot be listed.
        </p>
      </div>
    );
  }

  const db = getDb();
  const rows = await db
    .select({
      id: inquiries.id,
      name: inquiries.name,
      email: inquiries.email,
      phone: inquiries.phone,
      message: inquiries.message,
      preferredDimensions: inquiries.preferredDimensions,
      status: inquiries.status,
      createdAt: inquiries.createdAt,
      productName: products.name,
    })
    .from(inquiries)
    .leftJoin(products, eq(inquiries.productId, products.id))
    .orderBy(desc(inquiries.createdAt));

  const orderRows = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-accent uppercase">Admin</p>
          <h1 className="mt-3 font-serif text-4xl text-foreground">
            Orders & inquiries
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products"
            className="cursor-pointer border border-accent px-4 py-2 text-xs tracking-[0.16em] text-accent uppercase hover:bg-accent hover:text-background"
          >
            Products
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="cursor-pointer border border-border px-4 py-2 text-xs tracking-[0.16em] text-muted uppercase hover:border-accent hover:text-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <h2 className="mt-12 font-serif text-3xl text-foreground">Orders</h2>
      {orderRows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No orders yet.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {orderRows.map((row) => (
            <li
              key={row.id}
              className="border border-border bg-surface p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-2xl text-foreground">
                    {row.productName} × {row.quantity}
                  </p>
                  {row.invoiceNumber ? (
                    <p className="mt-1 text-xs tracking-[0.12em] text-accent uppercase">
                      Invoice {row.invoiceNumber}
                    </p>
                  ) : null}
                  {(() => {
                    try {
                      const lines = JSON.parse(row.lineItemsJson || "[]") as Array<{
                        name: string;
                        quantity: number;
                        lineTotalEur: number;
                      }>;
                      if (!Array.isArray(lines) || lines.length === 0) return null;
                      return (
                        <ul className="mt-2 space-y-1 text-sm text-muted">
                          {lines.map((line) => (
                            <li key={`${line.name}-${line.quantity}`}>
                              {line.name} × {line.quantity} · €{line.lineTotalEur}
                            </li>
                          ))}
                        </ul>
                      );
                    } catch {
                      return null;
                    }
                  })()}
                  <p className="mt-2 text-sm text-muted">
                    €{row.totalEur} · {row.customerName} · {row.customerEmail} ·{" "}
                    {row.customerPhone}
                  </p>
                </div>
                <p className="text-xs tracking-[0.14em] text-accent uppercase">
                  {row.status} · {row.paymentMethod}
                </p>
              </div>
              <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-accent uppercase">
                    Econt
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {row.deliveryType === "office"
                      ? `Office ${row.econtOfficeCode} — ${row.econtOfficeName}`
                      : `${row.street} ${row.streetNumber}, ${row.city} ${row.postCode}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-accent uppercase">
                    Received
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {row.createdAt.toLocaleString()}
                  </dd>
                </div>
              </dl>
              {row.notes ? (
                <p className="mt-4 text-sm text-muted">{row.notes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-16 font-serif text-3xl text-foreground">Inquiries</h2>
      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No inquiries yet.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {rows.map((row) => (
            <li
              key={row.id}
              className="border border-border bg-surface p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-2xl text-foreground">
                    {row.name}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {row.email}
                    {row.phone ? ` · ${row.phone}` : ""}
                  </p>
                </div>
                <StatusSelect
                  inquiryId={row.id}
                  currentStatus={row.status}
                />
              </div>
              <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-accent uppercase">
                    Piece
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {row.productName ?? "General inquiry"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-accent uppercase">
                    Dimensions
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {row.preferredDimensions ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-accent uppercase">
                    Received
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {row.createdAt.toLocaleString()}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-foreground/90">
                {row.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
