"use client";

import { useActionState } from "react";
import {
  submitQuote,
  type QuoteActionState,
} from "@/lib/actions/quote";
import type { CatalogProduct } from "@/lib/catalog";

const initialState: QuoteActionState = {
  ok: false,
  message: "",
};

type QuoteFormProps = {
  products: CatalogProduct[];
  selectedSlug?: string;
};

export function QuoteForm({ products, selectedSlug }: QuoteFormProps) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);

  if (state.ok) {
    return (
      <div className="border border-accent/40 bg-surface px-6 py-10">
        <p className="font-serif text-3xl text-foreground">Request received</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" />
          {state.fieldErrors?.name?.[0] ? (
            <p className="mt-2 text-sm text-accent-strong">
              {state.fieldErrors.name[0]}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
          {state.fieldErrors?.email?.[0] ? (
            <p className="mt-2 text-sm text-accent-strong">
              {state.fieldErrors.email[0]}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="productSlug">Piece of interest</label>
          <select
            id="productSlug"
            name="productSlug"
            defaultValue={selectedSlug ?? ""}
          >
            <option value="">General inquiry</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferredDimensions">Preferred dimensions</label>
        <input
          id="preferredDimensions"
          name="preferredDimensions"
          placeholder='e.g. 108" × 42"'
        />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us about the room, timeline, and any wood or resin preferences."
        />
        {state.fieldErrors?.message?.[0] ? (
          <p className="mt-2 text-sm text-accent-strong">
            {state.fieldErrors.message[0]}
          </p>
        ) : null}
      </div>

      {state.message && !state.ok ? (
        <p className="text-sm text-accent-strong">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer border border-accent bg-accent px-8 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong hover:border-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
