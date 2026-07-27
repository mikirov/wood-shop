"use client";

import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import {
  createProduct,
  updateProduct,
  type ProductActionState,
} from "@/lib/actions/products";
import { isDataImage } from "@/lib/images";
import type { Product } from "@/db/schema";

const initialState: ProductActionState = { ok: false, message: "" };

type ProductFormProps = {
  mode: "create" | "edit";
  product?: Product;
};

function Thumb({ src }: { src: string }) {
  if (isDataImage(src) || src.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="h-24 w-24 object-cover" />
    );
  }
  return (
    <Image src={src} alt="" width={96} height={96} className="h-24 w-24 object-cover" />
  );
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const action = mode === "create" ? createProduct : updateProduct;
  const [state, formAction, pending] = useActionState(action, initialState);
  const initialImages = useMemo(() => {
    if (!product) return [] as string[];
    let gallery: string[] = [];
    try {
      gallery = JSON.parse(product.galleryImages) as string[];
    } catch {
      gallery = [];
    }
    return [product.heroImage, ...gallery].filter(Boolean);
  }, [product]);
  const [keepImages, setKeepImages] = useState<string[]>(initialImages);
  const [pricingType, setPricingType] = useState(
    product?.pricingType ?? "fixed",
  );

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && product ? (
        <input type="hidden" name="id" value={product.id} />
      ) : null}
      <input type="hidden" name="keepImages" value={JSON.stringify(keepImages)} />

      {state.message ? (
        <p
          className={`text-sm ${state.ok ? "text-accent" : "text-red-400"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={product?.slug} error={state.fieldErrors?.slug?.[0]} required />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={String(product?.sortOrder ?? 0)} />
        <label className="block text-sm">
          <span className="text-muted">Category</span>
          <select name="category" defaultValue={product?.category ?? "shop"} className="mt-1 w-full">
            <option value="shop">Shop (buy)</option>
            <option value="custom">Custom (enquire)</option>
          </select>
        </label>
        <Field label="Family (shared variants)" name="family" defaultValue={product?.family ?? ""} placeholder="coasters" />
        <label className="block text-sm">
          <span className="text-muted">Resin</span>
          <select name="resin" defaultValue={product?.resin ?? ""} className="mt-1 w-full">
            <option value="">None</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-muted">Active</span>
          <select name="active" defaultValue={product?.active === false ? "false" : "true"} className="mt-1 w-full">
            <option value="true">Yes</option>
            <option value="false">No (hidden)</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name (EN)" name="name" defaultValue={product?.name} required error={state.fieldErrors?.name?.[0]} />
        <Field label="Name (BG)" name="nameBg" defaultValue={product?.nameBg ?? ""} />
        <Field label="Tagline (EN)" name="tagline" defaultValue={product?.tagline} required />
        <Field label="Tagline (BG)" name="taglineBg" defaultValue={product?.taglineBg ?? ""} />
      </div>

      <label className="block text-sm">
        <span className="text-muted">Description (EN)</span>
        <textarea name="description" rows={5} required defaultValue={product?.description} className="mt-1 w-full" />
      </label>
      <label className="block text-sm">
        <span className="text-muted">Description (BG)</span>
        <textarea name="descriptionBg" rows={5} defaultValue={product?.descriptionBg ?? ""} className="mt-1 w-full" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Materials (EN)" name="materials" defaultValue={product?.materials} required />
        <Field label="Materials (BG)" name="materialsBg" defaultValue={product?.materialsBg ?? ""} />
        <Field label="Dimensions (EN)" name="dimensions" defaultValue={product?.dimensions} required />
        <Field label="Dimensions (BG)" name="dimensionsBg" defaultValue={product?.dimensionsBg ?? ""} />
        <Field label="Lead time (EN)" name="leadTime" defaultValue={product?.leadTime ?? "0 days — ready to ship"} required />
        <Field label="Lead time (BG)" name="leadTimeBg" defaultValue={product?.leadTimeBg ?? ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Pricing</span>
          <select
            name="pricingType"
            value={pricingType}
            onChange={(event) =>
              setPricingType(event.target.value as "fixed" | "quote")
            }
            className="mt-1 w-full"
          >
            <option value="fixed">Fixed (shop)</option>
            <option value="quote">Quote (custom)</option>
          </select>
        </label>
        {pricingType === "fixed" ? (
          <Field
            label="Price EUR"
            name="priceEur"
            type="number"
            step="0.01"
            defaultValue={product?.priceEur ?? ""}
            error={state.fieldErrors?.priceEur?.[0]}
            required
          />
        ) : (
          <input type="hidden" name="priceEur" value="" />
        )}
      </div>

      <div>
        <p className="text-sm text-muted">Images (stored as base64 in Postgres)</p>
        <p className="mt-1 text-xs text-muted">
          First image is the hero. Add multiple for a slideshow. Max ~2.5MB each.
        </p>
        {keepImages.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-3">
            {keepImages.map((src, index) => (
              <li key={`${index}-${src.slice(0, 24)}`} className="relative border border-border">
                <Thumb src={src} />
                <button
                  type="button"
                  className="absolute inset-x-0 bottom-0 bg-background/90 py-1 text-[10px] uppercase tracking-wider text-muted hover:text-accent"
                  onClick={() =>
                    setKeepImages((current) => current.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="mt-4 block w-full text-sm text-muted"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer border border-accent bg-accent px-6 py-3 text-xs tracking-[0.16em] text-background uppercase disabled:opacity-60"
      >
        {pending ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
      </button>
    </form>
  );
}

function Field(props: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  step?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{props.label}</span>
      <input
        name={props.name}
        type={props.type ?? "text"}
        step={props.step}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        required={props.required}
        className="mt-1 w-full"
      />
      {props.error ? <span className="mt-1 block text-xs text-red-400">{props.error}</span> : null}
    </label>
  );
}
