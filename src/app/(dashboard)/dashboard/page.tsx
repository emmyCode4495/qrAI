import type { Metadata } from "next";
import { FileStack } from "lucide-react";
import { getUser } from "@/lib/supabase/server";
import { UploadZone } from "@/components/dashboard/upload-zone";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getUser();
  const name = user?.email?.split("@")[0] ?? "there";

  return (
    <div className="space-y-14">
      <header>
        <p className="eyebrow">§ Overview</p>
        <h1 className="rise mt-3 font-display text-5xl leading-[1] font-semibold tracking-[-0.035em] sm:text-6xl">
          Welcome, <span className="mark italic break-all">{name}</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Upload a document to extract insights, flag risks and ask questions.
        </p>
      </header>

      <UploadZone />

      <section aria-labelledby="recent-title">
        <h2 id="recent-title" className="mb-5 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
          <FileStack className="size-5 text-accent" aria-hidden="true" />
          Recent documents
        </h2>
        <div className="card flex flex-col items-center px-6 py-14 text-center">
          {/* stack of papers */}
          <div className="relative mb-6 h-16 w-14" aria-hidden="true">
            <span className="paper absolute inset-0 -rotate-6 rounded-md border-[1.5px] border-line" />
            <span className="paper absolute inset-0 rotate-3 rounded-md border-[1.5px] border-line" />
            <span className="paper absolute inset-0 flex flex-col justify-center gap-1.5 rounded-md border-[1.5px] border-line px-2.5">
              <i className="block h-1 rounded bg-highlight" />
              <i className="block h-1 w-3/4 rounded bg-muted" />
              <i className="block h-1 w-1/2 rounded bg-muted" />
            </span>
          </div>
          <p className="font-display text-xl font-semibold">Nothing marked up yet</p>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            Your analyzed documents will appear here with their summaries and flags.
          </p>
        </div>
      </section>
    </div>
  );
}
