import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { form } from "../data/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function EmailForm({ id }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    if (!EMAIL_RE.test(email.trim())) return setStatus("error");

    setStatus("loading");
    // TODO: replace with your email provider (ConvertKit, Beehiiv, own endpoint):
    // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-lg border border-amber-200/20 bg-zinc-900/60 p-4">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/90 text-zinc-950">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-medium text-zinc-100">{form.successTitle}</p>
          <p className="mt-1 text-sm text-zinc-400">{form.successBody.replace("{email}", email.trim())}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={form.placeholder}
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          aria-invalid={status === "error"}
          aria-describedby={`${id}-error`}
          className="h-12 w-full rounded-lg border border-white/[0.1] bg-zinc-900/60 px-4 text-base text-zinc-100 placeholder:text-zinc-500 transition-shadow focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 focus:outline-none sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 font-medium text-zinc-950 transition-shadow hover:shadow-[0_0_28px_-4px_rgba(253,230,138,0.4)] focus:ring-1 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:outline-none disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              {form.sending}
            </>
          ) : (
            <>
              {form.button}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <p id={`${id}-error`} aria-live="polite" className="mt-2 min-h-5 text-sm text-red-400">
        {status === "error" ? form.invalid : ""}
      </p>
    </form>
  );
}