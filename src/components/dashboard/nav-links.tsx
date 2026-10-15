"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, soon: false },
  { href: "#", label: "Documents", icon: FileText, soon: true },
  { href: "#", label: "Usage & billing", icon: Receipt, soon: true },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="space-y-1.5">
      {items.map(({ href, label, icon: Icon, soon }) => {
        const active = !soon && pathname === href;
        const base =
          "flex items-center gap-2.5 rounded-lg border-[1.5px] px-3 py-2 text-sm font-semibold transition";
        if (soon) {
          return (
            <span
              key={label}
              aria-disabled="true"
              className={cn(base, "cursor-not-allowed border-transparent text-muted-foreground/60")}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
              <span className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                Soon
              </span>
            </span>
          );
        }
        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              base,
              active
                ? "border-line bg-highlight text-ink shadow-[3px_3px_0_var(--shadow-color)]"
                : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
