import { Coins } from "lucide-react";

const SEGMENTS = 20;

export function CreditMeter({ remaining, total }: { remaining: number; total: number }) {
  const filled = Math.round((Math.max(0, Math.min(total, remaining)) / total) * SEGMENTS);
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <Coins className="size-3.5 text-accent" aria-hidden="true" />
          Credits
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{remaining}</span> / {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Credits remaining"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={remaining}
        className="mt-3 flex gap-[3px]"
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <span
            key={i}
            className={`h-4 flex-1 rounded-[2px] border border-line ${i < filled ? "bg-highlight" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}
