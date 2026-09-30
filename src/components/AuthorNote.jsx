import { author, site } from "../data/content";

export default function AuthorNote() {
  return (
    <section className="border-y border-white/[0.06] bg-zinc-900/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">{author.title}</h2>
          <blockquote className="mt-6 font-serif text-2xl leading-snug text-amber-200/90">
            {author.pullQuote}
          </blockquote>
        </div>

        <div>
          <div className="space-y-5 font-serif text-lg leading-8 text-zinc-300">
            {author.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-serif text-zinc-100">{site.author}</p>
        </div>
      </div>
    </section>
  );
}