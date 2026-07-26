import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFound() {
  const d = getDictionary(defaultLocale).notFound;
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">{d.code}</p>
      <h1 className="mt-4 font-serif text-5xl text-foreground">{d.title}</h1>
      <p className="mt-4 max-w-md text-sm text-muted">{d.body}</p>
      <Link
        href={`/${defaultLocale}/shop`}
        className="mt-10 cursor-pointer border border-accent px-7 py-3 text-xs tracking-[0.2em] text-accent uppercase hover:bg-accent hover:text-background"
      >
        {d.cta}
      </Link>
    </div>
  );
}
