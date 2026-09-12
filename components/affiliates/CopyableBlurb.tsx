"use client";

import { useEffect, useRef, useState } from "react";
import { s } from "@/lib/strings";

type CopyStatus = "idle" | "copied" | "error";

const statusLabels: Record<CopyStatus, string> = {
  idle: s("affiliates.copyBlurbCopy"),
  copied: s("affiliates.copyBlurbCopied"),
  error: s("affiliates.copyBlurbCopyFailed"),
};

export function CopyableBlurb({ label, text }: { label: string; text: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  /** Fallback for browsers that block the clipboard API: select the text so Ctrl+C works. */
  function selectText() {
    const node = textRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      selectText();
      setStatus("error");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white">{label}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary shrink-0 px-4 py-1.5 text-xs"
        >
          {statusLabels[status]}
        </button>
      </div>
      <p ref={textRef} className="mt-3 text-sm leading-relaxed text-muted">
        {text}
      </p>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "idle" ? "" : statusLabels[status]}
      </span>
    </div>
  );
}
