import { site, footer } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>&copy; {new Date().getFullYear()} {site.author}. All rights reserved.</p>
          <p>
            {footer.privacy}{" "}
            <a href={site.privacyUrl} className="underline underline-offset-4 hover:text-zinc-300 focus:ring-1 focus:ring-zinc-400 focus:outline-none">
              {footer.privacyLink}
            </a>
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex gap-5">
            {site.socials.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-200/90 focus:ring-1 focus:ring-zinc-400 focus:outline-none">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}