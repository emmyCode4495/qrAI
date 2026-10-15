"use client";

import { useRef, useState } from "react";
import { AlertCircle, FileText, Loader2, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 20 * 1024 * 1024;
const ACCEPT = ".pdf,.docx,.png,.jpg,.jpeg";
const ALLOWED_EXT = ["pdf", "docx", "png", "jpg", "jpeg"];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validate(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.includes(ext)) return "Unsupported file type. Use PDF, DOCX, PNG or JPG.";
  if (file.size > MAX_BYTES) return "That file is over 20 MB.";
  if (file.size === 0) return "That file is empty.";
  return null;
}

export function UploadZone({
  onAnalyze,
}: {
  /** Hook for the upload + analysis pipeline (next milestone). */
  onAnalyze?: (file: File) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [working, setWorking] = useState(false);

  function pick(f: File | undefined) {
    if (!f) return;
    const problem = validate(f);
    setError(problem);
    setFile(problem ? null : f);
  }

  function clear() {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function analyze() {
    if (!file) return;
    setWorking(true);
    try {
      await onAnalyze?.(file);
    } finally {
      setWorking(false);
    }
  }

  return (
    <section aria-labelledby="upload-title">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "rounded-2xl border-2 border-dashed border-line p-8 text-center transition-all duration-150 sm:p-12",
          dragging
            ? "-translate-y-1 bg-highlight text-ink shadow-[8px_8px_0_var(--shadow-color)]"
            : "bg-card shadow-[5px_5px_0_var(--shadow-color)] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--shadow-color)]",
        )}
      >
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => pick(e.target.files?.[0])}
        />

        {!file ? (
          <>
            <span className="float mx-auto flex size-16 items-center justify-center rounded-xl border-[1.5px] border-line bg-highlight text-ink shadow-[4px_4px_0_var(--shadow-color)] [--r:-4deg]">
              <UploadCloud className="size-7" aria-hidden="true" />
            </span>
            <h2 id="upload-title" className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em]">
              Drop a document to analyze
            </h2>
            <p className={cn("mt-2 font-mono text-xs", dragging ? "text-ink" : "text-muted-foreground")}>
              PDF, DOCX, PNG or JPG · up to 20 MB
            </p>
            <label htmlFor="file-input" className="btn btn-primary mt-6 cursor-pointer">
              Choose file
            </label>
          </>
        ) : (
          <div className="mx-auto max-w-md text-left">
            <h2 id="upload-title" className="sr-only">
              Selected document
            </h2>
            <div className="paper flex items-center gap-3 rounded-xl border-[1.5px] border-line p-3.5 shadow-[3px_3px_0_var(--shadow-color)]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-line bg-highlight">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium" title={file.name}>
                  {file.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={clear}
                disabled={working}
                aria-label="Remove file"
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <button onClick={analyze} disabled={working} className="btn btn-primary mt-4 w-full py-3">
              {working && <Loader2 className="size-4 animate-spin" />}
              Analyze document
            </button>
          </div>
        )}
      </div>

      <div aria-live="polite" className="empty:hidden">
        {error && (
          <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-danger">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
