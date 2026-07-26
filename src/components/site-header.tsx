import Link from "next/link";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "Atelier" },
  { href: "/quote", label: "Request a Quote" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.18em] text-foreground uppercase md:text-2xl"
        >
          Obsidian River
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 md:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-[0.65rem] tracking-[0.16em] text-muted uppercase hover:text-accent md:text-xs md:tracking-[0.18em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
