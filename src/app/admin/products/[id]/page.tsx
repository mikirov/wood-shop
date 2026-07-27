import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAdminProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEditProductPage({ params }: PageProps) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 md:px-10">
      <Link
        href="/admin/products"
        className="text-xs tracking-[0.16em] text-muted uppercase hover:text-accent"
      >
        ← Products
      </Link>
      <h1 className="mt-6 font-serif text-4xl text-foreground">Edit product</h1>
      <p className="mt-2 text-sm text-muted">{product.slug}</p>
      <div className="mt-10">
        <ProductForm mode="edit" product={product} />
      </div>
    </div>
  );
}
