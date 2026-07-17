export const authInputClassName =
  "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-flux-green/50 focus:outline-none";

export const authInputErrorClassName =
  "w-full rounded-xl border border-red-500 bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-red-500 focus:outline-none";

export function AuthDivider() {
  return (
    <div
      className="relative flex items-center py-5"
      role="separator"
      aria-label="OR"
    >
      <div className="grow border-t border-border" />
      <span className="mx-4 shrink-0 text-sm text-muted">OR</span>
      <div className="grow border-t border-border" />
    </div>
  );
}

import type { MouseEvent, ReactNode } from "react";

export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="glass-card mx-auto max-w-md rounded-2xl p-8 shadow-lg">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">{title}</h2>
      {children}
    </div>
  );
}

export function AuthError({ message }: { message: string }) {
  return (
    <p className="mb-4 text-center text-sm text-red-400" role="alert" aria-live="polite">
      {message}
    </p>
  );
}

export function TermsLinks({ prefix }: { prefix: string }) {
  const openInNewTab = (path: string) => (event: MouseEvent) => {
    event.preventDefault();
    window.open(path, "_blank", "noopener,noreferrer");
  };

  return (
    <p className="text-center text-sm text-muted">
      {prefix}{" "}
      <a
        href="/terms"
        onClick={openInNewTab("/terms")}
        className="text-flux-green underline hover:text-flux-green-dim"
      >
        Terms and Conditions
      </a>{" "}
      and{" "}
      <a
        href="/policies"
        onClick={openInNewTab("/policies")}
        className="text-flux-green underline hover:text-flux-green-dim"
      >
        Refund and Cancellation Policies
      </a>
    </p>
  );
}
