import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin login",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[70vh] flex-col justify-center px-6 pt-28">
      <div className="mx-auto w-full max-w-sm text-center">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">Admin</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground">Sign in</h1>
        <div className="mt-10 text-left">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
