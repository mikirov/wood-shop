"use client";

import { useActionState } from "react";
import {
  submitQuote,
  type QuoteActionState,
} from "@/lib/actions/quote";
import type { Dictionary } from "@/i18n/dictionaries";

const initialState: QuoteActionState = {
  ok: false,
  message: "",
};

type QuoteFormProps = {
  dictionary: Dictionary;
  products: Array<{ slug: string; name: string }>;
  selectedSlug?: string;
};

export function QuoteForm({
  dictionary,
  products,
  selectedSlug,
}: QuoteFormProps) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const q = dictionary.quote;

  if (state.ok) {
    return (
      <div className="border border-accent/40 bg-surface px-6 py-10">
        <p className="font-serif text-3xl text-foreground">{q.successTitle}</p>
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
          <label htmlFor="name">{q.name}</label>
          <input id="name" name="name" required autoComplete="name" />
          {state.fieldErrors?.name?.[0] ? (
            <p className="mt-2 text-sm text-accent-strong">
              {state.fieldErrors.name[0]}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">{q.email}</label>
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
          <label htmlFor="phone">{q.phone}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="productSlug">{q.product}</label>
          <select
            id="productSlug"
            name="productSlug"
            defaultValue={selectedSlug ?? ""}
          >
            <option value="">{q.general}</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferredDimensions">{q.dimensions}</label>
        <input
          id="preferredDimensions"
          name="preferredDimensions"
          placeholder='e.g. 240 × 100 cm'
        />
      </div>

      <div>
        <label htmlFor="message">{q.message}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder={q.messagePlaceholder}
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
        {pending ? q.sending : q.submit}
      </button>
    </form>
  );
}
