import Link from "next/link";

const indicators = [
  {
    name: "ORMS_ORB",
    tags: ["Opening Range", "Manual Trading"],
    description:
      "Keeps track of key price levels built during the opening range, and a comprehensive confluences box used for manually trading Opening Range Momentum Scalping and Opening Range Break strategies.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M3 9h12M3 13.5h16M3 18h10" />
      </svg>
    ),
  },
  {
    name: "Trade Copier",
    tags: ["Multi-Account", "Prop Firms"],
    description:
      "Copy one account to up to 50 others — useful for copying to funded accounts. Includes the ability to turn off the copier once a maximum number of trades has been reached for the day.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    name: "VWAP",
    tags: ["Volume", "NinjaTrader"],
    description:
      "Volume-Weighted Average Price — not included in NinjaTrader. Track institutional-style fair value through the session.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 6.75l4.5 6.75L18.75 9 21.75 18H2.25z" />
      </svg>
    ),
  },
];

export function Indicators() {
  return (
    <section id="indicators" className="relative border-y border-border bg-surface py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="label-accent text-sm">Free Indicators</p>
            <h2 className="mt-3 text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trade with a plan.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Three professional NinjaTrader indicators — free to download. Built
              for manual traders and multi-account prop firm workflows.
            </p>
          </div>
          <Link
            href="/downloads/indicator-pack"
            className="shrink-0 text-sm font-medium text-[#02C064] transition-colors hover:text-white"
          >
            Get free indicators →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {indicators.map((indicator) => (
            <div
              key={indicator.name}
              className="glass-card group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-flux-green/30 hover:shadow-[0_0_30px_rgba(2,192,100,0.08)]"
            >
              <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-flux-green-icon/30 bg-black text-flux-green-icon transition-colors group-hover:border-flux-green-icon/50">
                {indicator.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{indicator.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {indicator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-[#111111] px-2.5 py-0.5 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/downloads/indicator-pack"
            className="btn-primary inline-flex px-8 py-3.5 text-sm"
          >
            Unlock the indicator pack
          </Link>
        </div>
      </div>
    </section>
  );
}
