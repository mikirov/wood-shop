import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier",
  description: "The Obsidian River craft — smoke, resin, and hardwood.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <div className="relative overflow-hidden border-b border-border">
        <div className="smoke-veil absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-xs tracking-[0.2em] text-accent uppercase">
            Atelier
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl text-foreground md:text-6xl">
            Old-school craft under a modern pour.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
            Obsidian River is a small atelier for people who want furniture that
            feels like dusk — live edges, pigmented epoxy rivers, blackened
            steel, brass that catches firelight. We work slowly. Every slab is
            selected, dried, and finished by hand.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
        {[
          {
            title: "Wood first",
            body: "Walnut, oak, and ash with character grain — never veneer, never filler boards.",
          },
          {
            title: "Resin as atmosphere",
            body: "Pours are pigmented for smoke, ember, and mist — gloss held in check, depth kept.",
          },
          {
            title: "Commission only",
            body: "No warehouse stock. You request a quote; we shape the piece to your room.",
          },
        ].map((item) => (
          <div key={item.title}>
            <h2 className="font-serif text-2xl text-foreground">{item.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
