import { useState } from "react";
import { BookOpen, Check, ChevronDown, Target, Timer, ToggleRight } from "lucide-react";
import { chapters } from "../data/content";

const ICONS = { ToggleRight, Target, Timer, BookOpen };

export default function ChaptersList() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{chapters.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{chapters.intro}</p>
      </div>

      <div className="flex flex-col gap-3">
        {chapters.items.map(({ icon, title, summary, points }, i) => {
          const Icon = ICONS[icon];
          const isOpen = open === i;
          return (
            <div
              key={title}
              className={`rounded-xl border bg-zinc-900/60 transition-colors ${isOpen ? "border-amber-200/25" : "border-white/[0.08]"}`}
            >
              <h3>
                <button
                  type="button"
                  id={`chapter-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`chapter-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 rounded-xl p-5 text-left focus:ring-1 focus:ring-zinc-400 focus:outline-none"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-zinc-950 text-amber-200/90">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-lg font-semibold leading-snug text-zinc-100">{title}</span>
                    <span className="mt-0.5 block text-sm text-zinc-500">{summary}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <div
                id={`chapter-panel-${i}`}
                role="region"
                aria-labelledby={`chapter-btn-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-3 px-5 pb-5 pl-[4.75rem]">
                    {points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed text-zinc-400">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-amber-200/70" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}