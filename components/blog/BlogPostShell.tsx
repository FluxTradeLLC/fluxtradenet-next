import Link from "next/link";
import type { ReactNode } from "react";

type BlogPostShellProps = {
  backToBlog: string;
  category: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  cta?: {
    heading: string;
    description: string;
    button: string;
    href: string;
  };
};

export function BlogPostShell({
  backToBlog,
  category,
  title,
  subtitle,
  children,
  cta,
}: BlogPostShellProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 glow-orb" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-flux-green transition-colors hover:text-flux-green-dim"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backToBlog}
        </Link>

        <article className="glass-card rounded-2xl p-6 sm:p-10">
          <span className="chip">{category}</span>
          <h1 className="mt-4 text-3xl font-bold italic tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted">{subtitle}</p>

          <div className="prose prose-invert mt-8 max-w-none">{children}</div>

          {cta ? (
            <div className="mt-10 rounded-2xl border border-flux-green/30 bg-flux-green/5 p-6">
              <h3 className="text-lg font-bold text-white">{cta.heading}</h3>
              <p className="mt-2 text-muted">{cta.description}</p>
              <Link href={cta.href} className="btn-primary mt-4 px-6 py-3 text-sm">
                {cta.button}
              </Link>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export const blogHeadingClass =
  "mt-8 mb-4 text-xl font-bold text-white sm:text-2xl";
export const blogBodyClass = "mb-4 leading-relaxed text-muted";
export const blogListClass =
  "mb-4 list-inside list-disc space-y-2 text-muted";
export const blogOrderedListClass =
  "mb-4 list-inside list-decimal space-y-2 text-muted";
