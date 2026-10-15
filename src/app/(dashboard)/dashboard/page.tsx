import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileText, Upload, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Placeholder credits – later we will fetch from DB
  const credits = 50;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="w-5 h-5 text-primary" />
            DocuMind AI
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              <span className="font-medium text-foreground">{credits}</span> credits
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Upload a document to extract insights and structured data.
          </p>
        </div>

        {/* Upload zone (placeholder for now) */}
        <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center bg-card hover:border-primary/50 transition cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold mb-1">Drop a document here</h2>
          <p className="text-sm text-muted-foreground mb-4">
            PDF, DOCX, PNG, JPG up to 20 MB
          </p>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition">
            Choose file
          </button>
        </div>

        {/* Recent documents placeholder */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Recent documents</h2>
          <div className="border border-border rounded-xl bg-card p-8 text-center text-muted-foreground text-sm">
            No documents yet. Upload your first one to get started.
          </div>
        </div>
      </main>
    </div>
  );
}
