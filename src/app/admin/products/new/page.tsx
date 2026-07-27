import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 md:px-10">
      <Link
        href="/admin/products"
        className="text-xs tracking-[0.16em] text-muted uppercase hover:text-accent"
      >
        ← Products
      </Link>
      <h1 className="mt-6 font-serif text-4xl text-foreground">New product</h1>
      <div className="mt-10">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
