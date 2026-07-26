"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  placeOrder,
  type CheckoutActionState,
} from "@/lib/actions/checkout";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const initialState: CheckoutActionState = {
  ok: false,
  message: "",
};

type CheckoutFormProps = {
  locale: Locale;
  dictionary: Dictionary;
  productSlug: string;
  productName: string;
  unitPriceLabel: string;
};

export function CheckoutForm({
  locale,
  dictionary,
  productSlug,
  productName,
  unitPriceLabel,
}: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [deliveryType, setDeliveryType] = useState<"office" | "address">(
    "office",
  );
  const c = dictionary.checkout;

  if (state.ok) {
    return (
      <div className="border border-accent/40 bg-surface px-6 py-10">
        <p className="font-serif text-3xl text-foreground">{c.successTitle}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {c.successBody}
        </p>
        {state.orderId ? (
          <p className="mt-3 text-xs tracking-[0.12em] text-muted uppercase">
            ID {state.orderId}
          </p>
        ) : null}
        <Link
          href={`/${locale}/shop/${productSlug}`}
          className="mt-8 inline-flex cursor-pointer text-xs tracking-[0.16em] text-accent uppercase hover:text-foreground"
        >
          {c.backToProduct}
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="productSlug" value={productSlug} />

      <div className="border border-border bg-surface p-5">
        <p className="text-xs tracking-[0.14em] text-accent uppercase">
          {c.product}
        </p>
        <p className="mt-2 font-serif text-2xl text-foreground">{productName}</p>
        <p className="mt-1 text-sm text-muted">{unitPriceLabel}</p>
      </div>

      <div>
        <label htmlFor="quantity">{c.quantity}</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={20}
          defaultValue={1}
          required
        />
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
            {state.fieldErrors?.econtOfficeCode?.[0] ? (
              <p className="mt-2 text-sm text-accent-strong">
                {state.fieldErrors.econtOfficeCode[0]}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="econtOfficeName">{c.officeName}</label>
            <input id="econtOfficeName" name="econtOfficeName" required />
            {state.fieldErrors?.econtOfficeName?.[0] ? (
              <p className="mt-2 text-sm text-accent-strong">
                {state.fieldErrors.econtOfficeName[0]}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <label htmlFor="street">{c.street}</label>
              <input id="street" name="street" required autoComplete="street-address" />
              {state.fieldErrors?.street?.[0] ? (
                <p className="mt-2 text-sm text-accent-strong">
                  {state.fieldErrors.street[0]}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="streetNumber">{c.streetNumber}</label>
              <input id="streetNumber" name="streetNumber" required />
              {state.fieldErrors?.streetNumber?.[0] ? (
                <p className="mt-2 text-sm text-accent-strong">
                  {state.fieldErrors.streetNumber[0]}
                </p>
              ) : null}
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
          <input type="radio" name="paymentMethod" value="cod" defaultChecked />
          {c.cod}
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
          <input type="radio" name="paymentMethod" value="bank" />
          {c.bank}
        </label>
      </fieldset>

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
