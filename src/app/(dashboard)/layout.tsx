import { redirect } from "next/navigation";
import { Logo } from "@/components/brand";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLinks } from "@/components/dashboard/nav-links";
import { CreditMeter } from "@/components/dashboard/credit-meter";
import { getUser } from "@/lib/supabase/server";
import { getCredits } from "@/lib/credits";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");

  const credits = await getCredits(user.id);
  const initial = (user.email ?? "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r-[1.5px] border-line bg-card p-5 lg:flex">
        <Logo href="/dashboard" />
        <NavLinks />
        <div className="mt-auto space-y-4">
          <CreditMeter {...credits} />
          <div className="flex items-center gap-2.5 border-t-[1.5px] border-border pt-4">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-line bg-highlight font-display text-base font-semibold text-ink"
            >
              {initial}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm" title={user.email ?? undefined}>
              {user.email}
            </span>
            <ThemeToggle className="!size-9" />
            <LogoutButton className="!px-2" />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b-[1.5px] border-line bg-background/90 px-4 backdrop-blur-md lg:hidden">
          <Logo href="/dashboard" />
          <div className="flex items-center gap-1.5">
            <span className="rounded-md border-[1.5px] border-line bg-highlight px-2 py-1 font-mono text-xs font-semibold text-ink">
              {credits.remaining} cr
            </span>
            <ThemeToggle className="!size-9" />
            <LogoutButton />
          </div>
        </header>

        <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-5 py-8 sm:px-8 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
