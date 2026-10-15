import Link from "next/link";
import {
  ArrowRight,
  Coins,
  FileSearch,
  FileText,
  MessageSquareText,
  ScanText,
  ShieldAlert,
  TriangleAlert,
  UploadCloud,
  Wand2,
} from "lucide-react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroDemo, HeroProvider, HeroWord } from "@/components/marketing/hero-demo";
import { Marquee } from "@/components/marketing/marquee";

const steps = [
  {
    n: "01",
    icon: UploadCloud,
    title: "Upload",
    body: "Drop in a PDF, a Word file or a photo of a page. Scans are read just as well as digital files.",
  },
  {
    n: "02",
    icon: Wand2,
    title: "Analyze",
    body: "Claude reads the whole document, then returns a summary, key fields, entities and flags.",
  },
  {
    n: "03",
    icon: MessageSquareText,
    title: "Review & ask",
    body: "Check each result against the source, then ask follow-up questions in plain language.",
  },
];

function StepVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="grid h-full min-h-32 place-items-center rounded-xl border-2 border-dashed border-line bg-card">
        <div className="float paper flex items-center gap-2 rounded-lg border-[1.5px] border-line px-3 py-2 font-mono text-xs shadow-[3px_3px_0_var(--shadow-color)] [--r:-3deg]">
          <FileText className="size-4" aria-hidden="true" /> contract.pdf
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="paper relative h-full min-h-32 space-y-2.5 overflow-hidden rounded-xl border-[1.5px] border-line p-4">
        <div className="scanner scanner-loop !h-10" aria-hidden="true" />
        {[100, 88, 94, 70, 82].map((w, k) => (
          <div
            key={k}
            style={{ width: `${w}%` }}
            className={k === 1 || k === 3 ? "h-2 rounded bg-highlight" : "h-2 rounded bg-muted"}
          />
        ))}
      </div>
    );
  return (
    <div className="flex h-full min-h-32 flex-col justify-center gap-2.5 rounded-xl border-[1.5px] border-line bg-card p-4 text-xs">
      <p className="self-end rounded-xl rounded-br-sm bg-foreground px-3 py-2 text-background">
        What&apos;s the notice period?
      </p>
      <p className="self-start rounded-xl rounded-bl-sm border-[1.5px] border-line bg-muted px-3 py-2">
        90 days before term end{" "}
        <span className="ml-1 rounded bg-highlight px-1.5 py-0.5 font-mono text-[10px] text-ink">p.4 ¶2</span>
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b-[1.5px] border-line bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-6">
          <Logo />
          <nav aria-label="Primary" className="flex items-center gap-2">
            <a href="#how" className="btn btn-ghost hidden md:inline-flex">How it works</a>
            <a href="#features" className="btn btn-ghost hidden md:inline-flex">Capabilities</a>
            <Link href="/login" className="btn btn-ghost hidden sm:inline-flex">Log in</Link>
            <ThemeToggle />
            <Link href="/signup" className="btn btn-primary">
              Get started<span className="hidden sm:inline"> free</span>
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* ───────── Hero ───────── */}
        <section className="relative overflow-hidden">
          <div className="grid-paper" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-6 lg:pt-20 lg:pb-28">
            <HeroProvider>
              <div className="max-w-4xl">
              
                <h1 className="rise mt-6 font-display text-[clamp(2.7rem,7.4vw,5.9rem)] leading-[0.98] font-semibold tracking-[-0.035em] [--d:0.05s]">
                  Turn any <HeroWord /> into answers you can{" "}
                  <span className="mark italic">trust</span>.
                </h1>
                <p className="rise mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground [--d:0.12s]">
                  Upload contracts, invoices or scanned reports. DocuMind marks up the fields that
                  matter, flags the risky terms, and answers your questions, with every result tied
                  back to the source.
                </p>
                <div className="rise mt-9 flex flex-col gap-3.5 [--d:0.2s] sm:flex-row sm:items-center">
                  <Link href="/signup" className="btn btn-primary btn-lg">
                    Analyze a document <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <a href="#how" className="btn btn-secondary btn-lg">See how it works</a>
                </div>
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  Free credits to start · No credit card
                </p>
              </div>

              <div className="mt-16 lg:mt-20">
                <HeroDemo />
              </div>
            </HeroProvider>
          </div>
        </section>

        <Marquee />

        {/* ───────── § 01 How it works ───────── */}
        <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-6 lg:py-32">
          <div className="reveal max-w-3xl">
            <p className="eyebrow">§ 01 — Process</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
              From a pile of PDFs to a <span className="mark italic">clear answer</span>
            </h2>
          </div>

          <ol className="mt-16 border-t-[1.5px] border-line">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="group reveal grid items-center gap-6 border-b-[1.5px] border-line py-9 md:grid-cols-[150px_1fr_300px] md:gap-10"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-7xl leading-none font-semibold text-transparent transition-colors duration-200 [-webkit-text-stroke:1.5px_var(--foreground)] group-hover:text-highlight md:text-8xl"
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 font-display text-3xl font-semibold tracking-tight">
                    <s.icon className="size-6 text-accent" aria-hidden="true" />
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                <StepVisual i={i} />
              </li>
            ))}
          </ol>
        </section>

        {/* ───────── § 02 Capabilities ───────── */}
        <section id="features" className="scroll-mt-20 border-t-[1.5px] border-line bg-muted/60 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="reveal max-w-3xl">
              <p className="eyebrow">§ 02 — Capabilities</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl">
                Built for real document work
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-6">
              {/* Extraction */}
              <article className="card card-hover reveal p-7 md:col-span-4">
                <FileSearch className="size-6 text-accent" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Intelligent extraction</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Parties, dates, amounts, obligations and clauses, returned as clean structured
                  data you can copy, export or build on.
                </p>
                <pre className="paper mt-6 overflow-x-auto rounded-xl border-[1.5px] border-line p-4 font-mono text-[12.5px] leading-relaxed">
                  <code>
{`{
  "document_type": `}<span className="text-success">&quot;contract&quot;</span>{`,
  "parties": [`}<span className="text-success">&quot;Acme Corp&quot;</span>{`, `}<span className="text-success">&quot;Northwind Ltd&quot;</span>{`],
  "effective_date": `}<span className="text-success">&quot;2026-03-01&quot;</span>{`,
  "annual_value": `}<span className="text-accent">48000</span>{`,
  "renewal": `}<span className="text-success">&quot;auto_12_months&quot;</span>{`
}`}<span className="caret ml-1" aria-hidden="true" />
                  </code>
                </pre>
              </article>

              {/* Flags */}
              <article className="card card-hover reveal relative overflow-hidden p-7 md:col-span-2">
                <ShieldAlert className="size-6 text-danger" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Risk flags</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Missing clauses, hidden renewals and unusual terms, caught before you sign.
                </p>
                <div className="mt-6 space-y-2.5 text-[13px]">
                  <p className="flex items-center gap-2 rounded-md border-l-4 border-danger bg-danger-soft px-3 py-2">
                    <TriangleAlert className="size-4 shrink-0 text-danger" aria-hidden="true" /> Liability uncapped
                  </p>
                  <p className="flex items-center gap-2 rounded-md border-l-4 border-warning bg-warning-soft px-3 py-2">
                    <TriangleAlert className="size-4 shrink-0 text-warning" aria-hidden="true" /> 90-day cancel window
                  </p>
                </div>
                <span
                  className="stamp float absolute right-4 bottom-4 text-danger opacity-90 [--r:-9deg]"
                  aria-hidden="true"
                >
                  Flagged
                </span>
              </article>

              {/* Q&A */}
              <article className="card card-hover reveal p-7 md:col-span-2">
                <MessageSquareText className="size-6 text-accent" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Ask anything</h3>
                <div className="mt-5 space-y-2.5 text-xs">
                  <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-foreground px-3 py-2 text-background">
                    Who owns the IP?
                  </p>
                  <div className="relative h-[68px]">
                    <p
                      className="absolute left-0 flex gap-1 rounded-xl rounded-bl-sm border-[1.5px] border-line bg-muted px-3.5 py-3"
                      style={{ animation: "cycle-dots 9s infinite" }}
                      aria-hidden="true"
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-1.5 rounded-full bg-muted-foreground"
                          style={{ animation: "bounce-dot 1s infinite", animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </p>
                    <p
                      className="absolute left-0 max-w-[92%] rounded-xl rounded-bl-sm border-[1.5px] border-line bg-muted px-3 py-2 leading-snug"
                      style={{ animation: "cycle-answer 9s infinite" }}
                    >
                      The client owns all deliverables on payment.{" "}
                      <span className="rounded bg-highlight px-1.5 py-0.5 font-mono text-[10px] text-ink">§7.1</span>
                    </p>
                  </div>
                </div>
              </article>

              {/* Scans */}
              <article className="card card-hover reveal p-7 md:col-span-2">
                <ScanText className="size-6 text-accent" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Scans welcome</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Photos and scanned pages are read like digital files.
                </p>
                <div className="paper relative mt-5 h-20 -rotate-2 rounded-lg border-[1.5px] border-line p-3">
                  <div className="h-1.5 w-4/5 rounded bg-muted" />
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-4 w-14 rounded border-2 border-dashed border-accent" />
                    <span className="font-mono text-[9px] text-accent">date</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-4 w-20 rounded border-2 border-dashed border-accent" />
                    <span className="font-mono text-[9px] text-accent">total</span>
                  </div>
                </div>
              </article>

              {/* Credits */}
              <article className="card card-hover reveal p-7 md:col-span-2">
                <Coins className="size-6 text-accent" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Pay as you go</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Usage-based credits. No seat licenses. Top up only when you need more.
                </p>
                <div className="mt-6 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, k) => (
                    <span
                      key={k}
                      className={`h-6 flex-1 origin-bottom rounded-[3px] border-[1.5px] border-line ${k < 9 ? "bg-highlight" : "bg-card"}`}
                      style={{ animation: "rise 0.5s both", animationDelay: `${k * 0.05}s` }}
                    />
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="relative overflow-hidden border-t-[1.5px] border-line bg-highlight text-ink">
          <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-6 lg:py-32">
            <h2 className="mx-auto max-w-4xl font-display text-5xl leading-[0.98] font-semibold tracking-[-0.035em] sm:text-7xl">
              Stop skimming.<br />
              Start <span className="mark-ink italic">knowing</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-ink/75">
              Your first documents are on us. Upload one and watch it get marked up.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/signup" className="btn btn-ink btn-lg">
                Create free account <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <span
            className="stamp float absolute top-8 right-[6%] hidden text-ink/80 md:inline-block [--r:9deg]"
            aria-hidden="true"
          >
            Free to start
          </span>
        </section>
      </main>

      <footer className="border-t-[1.5px] border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <Logo className="text-foreground" />
          <p>© {new Date().getFullYear()} DocuMind AI. Built for teams that live in documents.</p>
          <div className="flex items-center gap-1">
            <Link href="/login" className="btn btn-ghost">Log in</Link>
            <Link href="/signup" className="btn btn-ghost">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
