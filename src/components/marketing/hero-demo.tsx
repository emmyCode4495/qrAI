"use client";

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, FileText, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCENARIOS, type Scenario } from "./hero-data";

/* ---- shared state: the headline word and the demo stay in sync ---- */

type HeroState = {
  index: number;
  auto: boolean;
  select: (i: number) => void;
  next: () => void;
};

const HeroCtx = createContext<HeroState>({
  index: 0,
  auto: false,
  select: () => {},
  next: () => {},
});

export function HeroProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const value: HeroState = {
    index,
    auto,
    select: (i) => {
      setIndex(i);
      setAuto(false); // once a visitor takes control, stop auto-cycling
    },
    next: () => setIndex((i) => (i + 1) % SCENARIOS.length),
  };
  return <HeroCtx.Provider value={value}>{children}</HeroCtx.Provider>;
}

const useHero = () => useContext(HeroCtx);
const at = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/* ---- the cycling word inside the H1 ---- */

export function HeroWord() {
  const { index } = useHero();
  return (
    <>
      <span className="sr-only">document</span>
      <span aria-hidden="true" className="inline-grid align-baseline">
        {SCENARIOS.map((s, i) => (
          <span
            key={s.key}
            className={cn("col-start-1 row-start-1", i === index ? "word-in" : "invisible")}
          >
            <span className="mark italic">{s.word}</span>
          </span>
        ))}
      </span>
    </>
  );
}

/* ---- the live demo ---- */

function Mark({ id, t, i, hover }: { id: number; t: string; i: number; hover: number | null }) {
  const d = 0.7 + i * 0.4;
  return (
    <span className={cn("hl", hover === id && "hl-on")} style={at(d)}>
      {t}
      <sup className="pin rise" style={at(d + 0.35)}>{id}</sup>
    </span>
  );
}

const flagStyle = {
  danger: { box: "border-danger bg-danger-soft", icon: ShieldAlert, color: "text-danger" },
  warn: { box: "border-warning bg-warning-soft", icon: AlertTriangle, color: "text-warning" },
  ok: { box: "border-success bg-success-soft", icon: CheckCircle2, color: "text-success" },
} as const;

function Sheet({ s, hover }: { s: Scenario; hover: number | null }) {
  return (
    <div className="relative">
      <div className="paper relative overflow-hidden rounded-[14px] border-[1.5px] border-line p-5 shadow-[6px_6px_0_var(--shadow-color)] sm:p-7 lg:-rotate-[0.7deg]">
        <div className="scanner" aria-hidden="true" />
        <div className="flex items-center gap-2 border-b border-dashed border-border pb-3 font-mono text-[11px] text-muted-foreground">
          <FileText className="size-3.5" aria-hidden="true" />
          <span className="truncate">{s.file}</span>
          <span className="ml-auto shrink-0">p.1 / {s.pages}</span>
        </div>
        <div className="mt-5 space-y-4 font-display text-[15px] leading-[1.8] sm:text-base">
          {s.paras.map((p, pi) => {
            return (
              <p key={pi}>
                {p.map((seg, si) => {
                  if (typeof seg === "string") return seg;
                  return <Mark key={si} id={seg.id} t={seg.t} i={seg.id - 1} hover={hover} />;
                })}
              </p>
            );
          })}
        </div>
      </div>
      <div
        className="stamp slam absolute -right-2 -bottom-5 z-10 bg-card/90 text-danger sm:right-5"
        style={{ ...at(3.1), "--r": "-7deg" } as CSSProperties}
        aria-hidden="true"
      >
        {s.stamp}
      </div>
    </div>
  );
}

export function HeroDemo() {
  const { index, auto, select, next } = useHero();
  const [hover, setHover] = useState<number | null>(null);
  const s = SCENARIOS[index];

  return (
    <div className="demo">
      <div role="tablist" aria-label="Example documents" className="mb-6 flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-2 hidden sm:inline">Try it →</span>
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.key}
            role="tab"
            type="button"
            aria-selected={i === index}
            onClick={() => select(i)}
            className="tab"
          >
            {sc.tab}
            {i === index && auto && <span className="progress" onAnimationEnd={next} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div key={s.key} role="tabpanel" className="grid items-start gap-9 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <Sheet s={s} hover={hover} />

        <div className="flex flex-col gap-6">
          <section className="card p-5" aria-label="Extracted fields">
            <h3 className="eyebrow flex items-center">
              Extracted
              <span className="ml-auto tracking-normal normal-case">{s.fields.length} fields</span>
            </h3>
            <ol className="mt-3 divide-y divide-border">
              {s.fields.map((f, i) => (
                <li
                  key={f.id}
                  tabIndex={0}
                  onMouseEnter={() => setHover(f.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(f.id)}
                  onBlur={() => setHover(null)}
                  className="rise flex items-center gap-3 rounded-md py-2.5 outline-offset-2"
                  style={at(0.95 + i * 0.4)}
                >
                  <span className="pin-lg">{f.id}</span>
                  <span className="text-sm text-muted-foreground">{f.label}</span>
                  <span className="ml-auto text-right font-mono text-[13px] font-medium">{f.value}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="card p-5" aria-label="Risk flags">
            <h3 className="eyebrow">Flags</h3>
            <ul className="mt-3 space-y-2.5">
              {s.flags.map((f, i) => {
                const st = flagStyle[f.level];
                const Icon = st.icon;
                return (
                  <li
                    key={f.text}
                    className={cn("rise flex items-start gap-2.5 rounded-md border-l-4 px-3 py-2 text-[13px] leading-snug", st.box)}
                    style={at(2.4 + i * 0.3)}
                  >
                    <Icon className={cn("mt-px size-4 shrink-0", st.color)} aria-hidden="true" />
                    {f.text}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
