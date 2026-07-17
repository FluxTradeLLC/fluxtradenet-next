import type { ReactNode } from "react";

export const contentLinkClass =
  "text-flux-green underline hover:text-flux-green-dim";
export const contentCardClass = "glass-card rounded-2xl p-6 sm:p-8";
export const contentInputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-flux-green/50 focus:outline-none";
export const contentSectionHeading =
  "text-2xl font-bold text-white sm:text-3xl";
export const contentSubheading = "text-xl font-bold text-white sm:text-2xl";
export const contentBodyClass = "leading-relaxed text-muted";
export const contentListClass =
  "ml-4 list-inside list-disc space-y-2 text-muted";

type ContentPageLayoutProps = {
  label?: string;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "max-w-3xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl";
  centered?: boolean;
};

export function ContentPageLayout({
  label,
  title,
  description,
  children,
  maxWidth = "max-w-3xl",
  centered = true,
}: ContentPageLayoutProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 glow-orb" />

      <div
        className={`relative mx-auto ${maxWidth} px-6 lg:px-8 ${
          centered ? "text-center" : ""
        }`}
      >
        {label ? <p className="label-accent text-sm">{label}</p> : null}
        <h1
          className={`${
            label ? "mt-3" : ""
          } text-4xl font-bold italic tracking-tight text-white sm:text-5xl`}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={`mt-4 text-lg text-muted ${
              centered ? "mx-auto max-w-2xl" : "max-w-3xl"
            }`}
          >
            {description}
          </p>
        ) : null}
        <div className={`${centered ? "mt-10" : "mt-10 text-left"}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
