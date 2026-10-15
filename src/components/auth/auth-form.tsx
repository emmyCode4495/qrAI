"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleIcon } from "./google-icon";

type Mode = "login" | "signup";

// Loaded on demand so the Supabase SDK stays out of the initial page bundle.
const getSupabase = async () => (await import("@/lib/supabase/client")).createClient();

const copy = {
  login: {
    title: "Welcome back",
    subtitle: "Log in to continue to your documents.",
    submit: "Log in",
    alt: { text: "New to DocuMind?", href: "/signup", label: "Create an account" },
    autoComplete: "current-password",
  },
  signup: {
    title: "Create your account",
    subtitle: "Start with free credits. No credit card required.",
    submit: "Create account",
    alt: { text: "Already have an account?", href: "/login", label: "Log in" },
    autoComplete: "new-password",
  },
} as const;

export function AuthForm({
  mode,
  initialError,
}: {
  mode: Mode;
  initialError?: string | null;
}) {
  const c = copy[mode];
  const router = useRouter();
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy("email");
    setError(null);
    setMessage(null);

    const supabase = await getSupabase();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setBusy(null);
        return;
      }
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the confirmation link.");
    }
    setBusy(null);
  }

  async function handleGoogle() {
    setBusy("google");
    setError(null);
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setBusy(null);
    }
  }

  const disabled = busy !== null;

  return (
    <div className="rise">
      <h1 className="font-display text-5xl leading-none font-semibold tracking-[-0.03em]">{c.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>

      <div aria-live="polite" className="empty:hidden">
        {error && (
          <div role="alert" className="mt-6 flex items-start gap-2.5 rounded-lg border-l-4 border-danger bg-danger-soft p-3 text-sm text-danger">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="mt-6 flex items-start gap-2.5 rounded-lg border-l-4 border-success bg-success-soft p-3 text-sm text-success">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={disabled}
        className="btn btn-secondary mt-7 w-full py-3"
      >
        {busy === "google" ? <Loader2 className="size-4 animate-spin" /> : <GoogleIcon />}
        Continue with Google
      </button>

      <div className="my-7 flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="h-0.5 flex-1 bg-border" />
        or with email
        <span className="h-0.5 flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor={`${id}-password`} className="mb-1.5 block text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              id={`${id}-password`}
              type={showPassword ? "text" : "password"}
              autoComplete={c.autoComplete}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === "signup" ? 8 : undefined}
              aria-describedby={mode === "signup" ? `${id}-hint` : undefined}
              className="input pr-11"
              placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {mode === "signup" && (
            <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
              Use 8 or more characters.
            </p>
          )}
        </div>

        <button type="submit" disabled={disabled} className="btn btn-primary mt-2 w-full py-3">
          {busy === "email" && <Loader2 className="size-4 animate-spin" />}
          {c.submit}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {c.alt.text}{" "}
        <Link href={c.alt.href} className="font-semibold text-accent underline decoration-2 underline-offset-4 hover:decoration-highlight">
          {c.alt.label}
        </Link>
      </p>
    </div>
  );
}
