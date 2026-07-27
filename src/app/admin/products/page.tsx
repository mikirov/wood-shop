import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { deleteProduct } from "@/lib/actions/products";
import { isAdminAuthenticated } from "@/lib/auth";
import { listAdminProducts } from "@/lib/products";
import { parseGalleryImages } from "@/lib/images";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const rows = await listAdminProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-accent uppercase">Admin</p>
          <h1 className="mt-3 font-serif text-4xl text-foreground">Products</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin"
            className="border border-border px-4 py-2 text-xs tracking-[0.16em] text-muted uppercase hover:text-accent"
          >
            Orders
          </Link>
          <Link
            href="/admin/products/new"
            className="border border-accent bg-accent px-4 py-2 text-xs tracking-[0.16em] text-background uppercase"
          >
            Add product
          </Link>
        </div>
      </div>

      <ul className="mt-10 space-y-4">
        {rows.map((row) => {
          const galleryCount = parseGalleryImages(row.galleryImages).length;
          return (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-4 border border-border bg-surface p-5"
            >
              <div>
                <p className="font-serif text-2xl text-foreground">{row.name}</p>
                <p className="mt-1 text-xs tracking-[0.12em] text-muted uppercase">
                  {row.slug} · {row.category} · {row.pricingType}
                  {row.priceEur ? ` · €${row.priceEur}` : ""} ·{" "}
                  {1 + galleryCount} image{1 + galleryCount === 1 ? "" : "s"}
                  {row.active ? "" : " · hidden"}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/products/${row.id}`}
                  className="text-xs tracking-[0.14em] text-accent uppercase"
                >
                  Edit
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={row.id} />
                  <button
                    type="submit"
                    className="cursor-pointer text-xs tracking-[0.14em] text-red-400 uppercase"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
