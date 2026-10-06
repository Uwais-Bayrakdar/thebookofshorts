import { useState } from "react";
import { site, footer } from "../data/content";
import { X, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} {site.author}. All rights reserved.</p>
            <p>
              {footer.privacy}{" "}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="underline underline-offset-4 hover:text-zinc-300 focus:ring-1 focus:ring-zinc-400 focus:outline-none transition-colors"
              >
                {footer.privacyLink}
              </button>
            </p>
          </div>

          <nav aria-label="Social links">
            <ul className="flex gap-5">
              {site.socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-amber-200/90 focus:ring-1 focus:ring-zinc-400 focus:outline-none"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPrivacy(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                Privacy Policy
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold tracking-tight text-white">
              Plain & Simple Privacy
            </h3>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-zinc-400">
              <p>
                This website is an informational showcase and reader bridge. We do not collect,
                harvest, track, or sell any personal data or browsing behavior.
              </p>
              <p>
                When you buy or download <span className="text-zinc-200">{site.title || "The Book of Shorts"}</span>,
                transactions and file deliveries are handled securely by external checkout
                partners (such as Rakuten Kobo). Payment details and personal contact information
                are processed directly under their respective secure encryption protocols.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}