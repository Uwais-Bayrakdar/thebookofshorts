import { chapters } from "../data/content";

export default function ChaptersList() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
          Table of Contents
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Forty standalone chapters. No filler, no required order—flip to any topic and apply it immediately.
        </p>
      </div>

      {/* 
        Responsive layout:
        - Mobile: 1 column
        - Small screens: 2 columns
        - Tablet/Laptop: 5 columns
        - Desktop: 10 columns (exactly 4 rows of 10)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-10 gap-2 sm:gap-2.5">
        {chapters.map((title, i) => (
          <div
            key={title}
            className="flex flex-col justify-start items-start rounded-lg border border-white/[0.08] bg-zinc-900/60 p-3.5 transition hover:border-zinc-600"
          >
            <span className="font-mono text-[11px] leading-none text-zinc-500 mb-2.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-xs font-medium leading-snug text-zinc-200">
              {title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}