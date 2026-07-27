"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  placeOrder,
  type CheckoutActionState,
} from "@/lib/actions/checkout";
import { useCart } from "@/components/cart-provider";
import { formatBankTransferInstructions } from "@/lib/company";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const initialState: CheckoutActionState = {
  ok: false,
  message: "",
};

type CheckoutFormProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CheckoutForm({ locale, dictionary }: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [deliveryType, setDeliveryType] = useState<"office" | "address">(
    "office",
  );
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("cod");
  const { lines, subtotalEur, clear, ready } = useCart();
  const c = dictionary.checkout;
  const bankDetails = formatBankTransferInstructions();

  useEffect(() => {
    if (state.ok) clear();
  }, [state.ok, clear]);

  if (!ready) {
    return <p className="text-sm text-muted">{dictionary.cart.loading}</p>;
  }

  if (state.ok) {
    return (
      <div className="border border-accent/40 bg-surface px-6 py-10">
        <p className="font-serif text-3xl text-foreground">{c.successTitle}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {c.successBody}
        </p>
        {state.invoiceNumber ? (
          <p className="mt-3 text-sm text-foreground">
            {c.invoiceLabel}: {state.invoiceNumber}
          </p>
        ) : null}
        {state.orderId ? (
          <p className="mt-2 text-xs tracking-[0.12em] text-muted uppercase">
            ID {state.orderId}
          </p>
        ) : null}
        <div className="mt-6 border border-border bg-background/40 p-4 text-sm text-muted whitespace-pre-line">
          <p className="text-xs tracking-[0.14em] text-accent uppercase">
            {c.bankDetailsTitle}
          </p>
          <p className="mt-3">{bankDetails}</p>
        </div>
        <Link
          href={`/${locale}/shop`}
          className="mt-8 inline-flex cursor-pointer text-xs tracking-[0.16em] text-accent uppercase hover:text-foreground"
        >
          {c.backToShop}
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="border border-border bg-surface px-6 py-10">
        <p className="text-sm text-muted">{dictionary.cart.empty}</p>
        <Link
          href={`/${locale}/cart`}
          className="mt-6 inline-flex text-xs tracking-[0.16em] text-accent uppercase"
        >
          {dictionary.nav.cart} →
        </Link>
      </div>
    );
  }

  const linesJson = JSON.stringify(
    lines.map((line) => ({ slug: line.slug, quantity: line.quantity })),
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="linesJson" value={linesJson} />

      <div className="border border-border bg-surface p-5">
        <p className="text-xs tracking-[0.14em] text-accent uppercase">
          {c.product}
        </p>
        <ul className="mt-3 space-y-2">
          {lines.map((line) => (
            <li
              key={line.slug}
              className="flex justify-between gap-4 text-sm text-foreground"
            >
              <span>
                {line.name} × {line.quantity}
              </span>
              <span>€{(line.unitPriceEur * line.quantity).toFixed(0)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-serif text-2xl text-foreground">
          €{subtotalEur.toFixed(0)}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="customerName">{c.name}</label>
          <input id="customerName" name="customerName" required autoComplete="name" />
          {state.fieldErrors?.customerName?.[0] ? (
            <p className="mt-2 text-sm text-accent-strong">
              {state.fieldErrors.customerName[0]}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="customerPhone">{c.phone}</label>
          <input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            required
            autoComplete="tel"
          />
          {state.fieldErrors?.customerPhone?.[0] ? (
            <p className="mt-2 text-sm text-accent-strong">
              {state.fieldErrors.customerPhone[0]}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="customerEmail">{c.email}</label>
        <input
          id="customerEmail"
          name="customerEmail"
          type="email"
          required
          autoComplete="email"
        />
        {state.fieldErrors?.customerEmail?.[0] ? (
          <p className="mt-2 text-sm text-accent-strong">
            {state.fieldErrors.customerEmail[0]}
          </p>
        ) : null}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-xs tracking-[0.14em] text-muted uppercase">
          {c.deliveryType}
        </legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name="deliveryType"
            value="office"
            checked={deliveryType === "office"}
            onChange={() => setDeliveryType("office")}
          />
          {c.office}
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name="deliveryType"
            value="address"
            checked={deliveryType === "address"}
            onChange={() => setDeliveryType("address")}
          />
          {c.address}
        </label>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="city">{c.city}</label>
          <input id="city" name="city" required autoComplete="address-level2" />
        </div>
        <div>
          <label htmlFor="postCode">{c.postCode}</label>
          <input
            id="postCode"
            name="postCode"
            required
            autoComplete="postal-code"
          />
        </div>
      </div>

      {deliveryType === "office" ? (
        <div className="space-y-6">
          <div>
            <label htmlFor="econtOfficeCode">{c.officeCode}</label>
            <input id="econtOfficeCode" name="econtOfficeCode" required />
            <p className="mt-2 text-xs text-muted">{c.officeHint}</p>
          </div>
          <div>
            <label htmlFor="econtOfficeName">{c.officeName}</label>
            <input id="econtOfficeName" name="econtOfficeName" required />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <label htmlFor="street">{c.street}</label>
              <input id="street" name="street" required autoComplete="street-address" />
            </div>
            <div>
              <label htmlFor="streetNumber">{c.streetNumber}</label>
              <input id="streetNumber" name="streetNumber" required />
            </div>
          </div>
          <div>
            <label htmlFor="addressExtra">{c.addressExtra}</label>
            <input id="addressExtra" name="addressExtra" />
          </div>
        </div>
      )}

      <fieldset className="space-y-3">
        <legend className="text-xs tracking-[0.14em] text-muted uppercase">
          {c.payment}
        </legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          {c.cod}
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={() => setPaymentMethod("bank")}
          />
          {c.bank}
        </label>
      </fieldset>

      {paymentMethod === "bank" ? (
        <div className="border border-border bg-surface p-4 text-sm text-muted whitespace-pre-line">
          <p className="text-xs tracking-[0.14em] text-accent uppercase">
            {c.bankDetailsTitle}
          </p>
          <p className="mt-3">{bankDetails}</p>
        </div>
      ) : null}

      <div>
        <label htmlFor="notes">{c.notes}</label>
        <textarea id="notes" name="notes" rows={3} />
      </div>

      {state.message && !state.ok ? (
        <p className="text-sm text-accent-strong">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer border border-accent bg-accent px-8 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong disabled:opacity-60"
      >
        {pending ? c.submitting : c.submit}
      </button>
    </form>
  );
}
