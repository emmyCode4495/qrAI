import { FileText, ShieldAlert } from "lucide-react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

/** Split-screen frame shared by login and signup. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col px-6 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <main id="main" className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-12">
          {children}
        </main>
        <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} DocuMind AI</p>
      </div>

      {/* Decorative brand panel */}
      <aside
        aria-hidden="true"
        className="relative hidden overflow-hidden border-l-[1.5px] border-line bg-highlight text-ink lg:flex lg:flex-col lg:justify-center lg:px-16"
      >
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(#14110d 1px, transparent 1px), linear-gradient(90deg, #14110d 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative max-w-lg">
          <p className="font-display text-6xl leading-[0.98] font-semibold tracking-[-0.035em] xl:text-7xl">
            Read the <span className="mark-ink italic">fine print</span> in seconds.
          </p>
          <p className="mt-6 max-w-sm text-lg text-ink/75">
            Extract the fields, catch the risks and ask questions across every document you handle.
          </p>
        </div>

        <div className="paper float absolute right-12 bottom-24 w-64 rounded-xl border-[1.5px] border-line p-4 shadow-[6px_6px_0_rgb(20_17_13/0.85)] [--r:3deg]">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <FileText className="size-3.5" /> clause 9.2
          </div>
          <p className="mt-2.5 font-display text-sm leading-relaxed">
            Renews{" "}
            <span className="hl" style={{ animationDelay: "0.6s" }}>automatically for 12 months</span>{" "}
            unless cancelled.
          </p>
        </div>

        <div
          className="float absolute right-28 bottom-[3.5rem] flex items-center gap-2 rounded-lg border-[1.5px] border-ink bg-danger-soft px-3 py-2 text-xs font-medium text-[#c4301a] shadow-[4px_4px_0_rgb(20_17_13/0.85)] [--d:1.2s] [--r:-2deg]"
        >
          <ShieldAlert className="size-4" /> Risk: auto-renewal
        </div>
      </aside>
    </div>
  );
}
