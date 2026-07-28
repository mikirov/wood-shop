"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  eyebrow,
  title,
}: {
  items: FaqItem[];
  eyebrow: string;
  title: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
          {title}
        </h2>
        <div className="mt-12 max-w-3xl divide-y divide-border border-y border-border">
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="font-serif text-xl text-foreground">
                    {item.q}
                  </span>
                  <span className="text-accent" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? (
                  <p className="pb-5 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
