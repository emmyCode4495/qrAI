import Link from "next/link";
import { FileText, Zap, Shield, CreditCard, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <FileText className="w-6 h-6 text-primary" />
            <span>DocuMind AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Get started free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Powered by the latest Claude models
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
            Turn any document into{" "}
            <span className="text-primary">structured intelligence</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload contracts, invoices, reports or scanned PDFs. Get instant extraction,
            risk flags, Q&A, and structured data — priced by usage credits.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Start free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 border border-border bg-card px-6 py-3 rounded-lg font-medium hover:bg-muted transition"
            >
              Log in
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-muted/40 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-12">
              Built for real document work
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Intelligent Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Pull key fields, parties, dates, amounts and clauses from messy PDFs and scans with high accuracy.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Risk & Compliance Flags</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically surface missing clauses, unusual terms and potential issues before they become problems.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Credit-based Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Pay only for what you process. Start free, scale as you grow. No seat licenses.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DocuMind AI. Built for teams that live in documents.
        </div>
      </footer>
    </div>
  );
}
