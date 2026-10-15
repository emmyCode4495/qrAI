export type Seg = string | { id: number; t: string };

export type Scenario = {
  key: string;
  word: string;
  tab: string;
  file: string;
  pages: number;
  paras: Seg[][];
  fields: { id: number; label: string; value: string }[];
  flags: { level: "danger" | "warn" | "ok"; text: string }[];
  stamp: string;
};

/** Illustrative sample documents for the landing-page demo. */
export const SCENARIOS: Scenario[] = [
  {
    key: "contract",
    word: "contract",
    tab: "Contract",
    file: "Master Services Agreement.pdf",
    pages: 12,
    paras: [
      ["This Master Services Agreement is made on ", { id: 1, t: "1 March 2026" }, " between Acme Corp and ", { id: 2, t: "Northwind Ltd" }, "."],
      ["Client shall pay fees of ", { id: 3, t: "$48,000 per year" }, ", due within thirty (30) days of each invoice."],
      ["This Agreement renews ", { id: 4, t: "automatically for successive 12-month terms" }, " unless either party gives written notice at least ninety (90) days before the end of the then-current term."],
      ["Neither party shall be liable for indirect or consequential damages."],
    ],
    fields: [
      { id: 1, label: "Effective date", value: "1 Mar 2026" },
      { id: 2, label: "Counterparty", value: "Northwind Ltd" },
      { id: 3, label: "Annual value", value: "$48,000" },
      { id: 4, label: "Renewal", value: "Auto · 12 mo" },
    ],
    flags: [
      { level: "danger", text: "No cap on liability amount" },
      { level: "warn", text: "Auto-renews unless cancelled 90 days prior" },
      { level: "ok", text: "Payment terms: Net 30 (standard)" },
    ],
    stamp: "2 risks flagged",
  },
  {
    key: "invoice",
    word: "invoice",
    tab: "Invoice",
    file: "Harbor-Studio-INV-4821.pdf",
    pages: 1,
    paras: [
      ["INVOICE ", { id: 1, t: "#4821" }, " · Harbor Studio LLC"],
      ["Bill to: Acme Corp · Purchase order ", { id: 2, t: "PO-1180" }],
      ["Design retainer, October 2026 — $11,200.00. Rush surcharge — $1,200.00."],
      ["Total due: ", { id: 3, t: "$12,400.00" }, " by ", { id: 4, t: "November 14, 2026" }, "."],
      ["Late payments accrue interest at 5% per month."],
    ],
    fields: [
      { id: 1, label: "Invoice no.", value: "#4821" },
      { id: 2, label: "PO reference", value: "PO-1180" },
      { id: 3, label: "Amount due", value: "$12,400.00" },
      { id: 4, label: "Due date", value: "14 Nov 2026" },
    ],
    flags: [
      { level: "danger", text: "$1,200 rush charge isn't on the PO" },
      { level: "warn", text: "Late fee of 5% per month is steep" },
      { level: "ok", text: "Line items add up to the total" },
    ],
    stamp: "PO mismatch",
  },
  {
    key: "report",
    word: "report",
    tab: "Report",
    file: "Q3-Operations-Report.pdf",
    pages: 24,
    paras: [
      ["Q3 Operations Report — Finance & Growth"],
      ["Revenue reached ", { id: 1, t: "$2.4M" }, ", up ", { id: 2, t: "18% quarter over quarter" }, "."],
      ["Customer churn rose to ", { id: 3, t: "4.1%" }, " from 2.7% in Q2, driven mainly by SMB cancellations."],
      ["Headcount ended the quarter at ", { id: 4, t: "62" }, ". All figures are unaudited."],
    ],
    fields: [
      { id: 1, label: "Revenue", value: "$2.4M" },
      { id: 2, label: "QoQ growth", value: "+18%" },
      { id: 3, label: "Churn", value: "4.1%" },
      { id: 4, label: "Headcount", value: "62" },
    ],
    flags: [
      { level: "danger", text: "Churn up 1.4 pts vs Q2" },
      { level: "warn", text: "Figures are unaudited" },
      { level: "ok", text: "Growth and revenue figures agree" },
    ],
    stamp: "Review churn",
  },
];
