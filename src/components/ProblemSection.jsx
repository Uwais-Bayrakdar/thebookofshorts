import { Gauge, Hammer, Lock } from "lucide-react";
import { problem } from "../data/content";

const ICONS = { Lock, Gauge, Hammer };

export default function ProblemSection() {
  return (
    <section className="border-y border-white/[0.06] bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{problem.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">{problem.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problem.cards.map(({ icon, title, advice, reality }) => {
            const Icon = ICONS[icon];
            return (
              <article key={title} className="flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/60 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.08] bg-zinc-950 text-amber-200/90">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-zinc-100">{title}</h3>

                <div className="mt-6">
                  <p className="text-sm text-zinc-500">{problem.adviceLabel}</p>
                  <p className="mt-1 text-zinc-500">{advice}</p>
                </div>

                <div className="mt-5 border-t border-white/[0.08] pt-5">
                  <p className="text-sm text-amber-200/90">{problem.realityLabel}</p>
                  <p className="mt-1 leading-relaxed text-zinc-300">{reality}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}