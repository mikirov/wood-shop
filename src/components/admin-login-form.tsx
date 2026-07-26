"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/lib/actions/admin";

const initialState: AdminLoginState = {
  ok: false,
  message: "",
};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mx-auto w-full max-w-sm space-y-6">
      <div>
        <label htmlFor="password">Admin password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      {state.message ? (
        <p className="text-sm text-accent-strong">{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer w-full border border-accent bg-accent px-7 py-3 text-xs tracking-[0.2em] text-background uppercase hover:bg-accent-strong disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Enter atelier"}
      </button>
    </form>
  );
}
