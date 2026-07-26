import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-serif text-2xl tracking-[0.14em] text-foreground uppercase">
            Obsidian River
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Epoxy and hardwood tables forged in smoke, steel, and patience.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs tracking-[0.16em] text-muted uppercase">
          <Link href="/collection" className="cursor-pointer hover:text-accent">
            Collection
          </Link>
          <Link href="/about" className="cursor-pointer hover:text-accent">
            Atelier
          </Link>
          <Link href="/quote" className="cursor-pointer hover:text-accent">
            Request a Quote
          </Link>
        </div>
      </div>
    </footer>
  );
}
