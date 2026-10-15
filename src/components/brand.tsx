import Link from "next/link";
import { cn } from "@/lib/utils";

/** Theme-aware: the tile follows the text colour, the page follows the background. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <path
        d="M10 6.5h8l5 5v14a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-18a1 1 0 0 1 1-1z"
        className="fill-background"
      />
      <path d="M18 6.5v5h5" className="fill-border" />
      <rect x="11.5" y="14.5" width="10" height="3.6" rx="1" fill="#ffd60a" />
      <rect x="11.5" y="20.5" width="6.5" height="1.8" rx=".9" className="fill-foreground" opacity=".4" />
    </svg>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight", className)}
      aria-label="DocuMind AI home"
    >
      <LogoMark />
      <span>
        DocuMind<span className="font-normal italic text-muted-foreground"> AI</span>
      </span>
    </Link>
  );
}
