const facts = [
  "Net 30", "Auto-renews", "Liability: uncapped", "Invoice #4821", "$12,400.00",
  "Governing law: Delaware", "Term: 24 months", "PO mismatch", "Notice: 90 days",
  "Churn +1.4 pts", "Effective 1 Mar 2026", "Late fee 5%/mo", "Indemnity: mutual",
  "Renewal: 12 mo",
];

/** Decorative ticker of "extracted facts". Pure CSS, pauses on hover. */
export function Marquee() {
  const row = facts.map((f) => (
    <span key={f} className="flex items-center gap-8 pr-8 font-mono text-sm tracking-wide uppercase">
      {f}
      <span className="text-highlight dark:text-[#14110d]">✦</span>
    </span>
  ));
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-[1.5px] border-line bg-foreground py-3.5 text-background"
    >
      <div className="marquee">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}
