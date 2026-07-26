import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl text-foreground">
        This river runs dry
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted">
        The piece you sought is not in the collection.
      </p>
      <Link
        href="/collection"
        className="mt-10 cursor-pointer border border-accent px-7 py-3 text-xs tracking-[0.2em] text-accent uppercase hover:bg-accent hover:text-background"
      >
        Back to collection
      </Link>
    </div>
  );
}
