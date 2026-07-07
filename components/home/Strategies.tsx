import Link from "next/link";

const strategies = [
  {
    name: "Flux Trident",
    type: "Multi-timeframe Confluence",
    tags: ["Trend", "Momentum"],
    href: "https://fluxtrade.net/backtests/flux-trident",
  },
  {
    name: "Flux Lightning",
    type: "High-Speed Momentum",
    tags: ["Scalping", "Momentum"],
    href: "https://fluxtrade.net/backtests/flux-lightning",
  },
  {
    name: "Flux Signal",
    type: "Trend Reversal & Continuation",
    tags: ["Signals", "Trend"],
    href: "https://fluxtrade.net/backtests/flux-signal-strat",
  },
  {
    name: "Centauri",
    type: "Prop Firm Focused",
    tags: ["Prop-firm-safe", "Conservative"],
    href: "https://fluxtrade.net/backtests/centauri",
    badge: "NEW",
  },
  {
    name: "ORB",
    type: "Opening Range Breakout",
    tags: ["Volatility", "Scalping"],
    href: "https://fluxtrade.net/backtests/orb",
  },
  {
    name: "Cointegrated Pairs",
    type: "Statistical Arbitrage",
    tags: ["Mean Reversion", "Conservative"],
    href: "https://fluxtrade.net/backtests/cointegrated-pairs",
  },
];

export function Strategies() {
  return (
    <section id="strategies" className="relative border-y border-border bg-surface py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="label-accent text-sm">
              Automated Strategies
            </p>
            <h2 className="mt-3 text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
              Backtested. Battle-ready.
            </h2>
            <p className="mt-4 text-lg text-muted">
              30+ automated strategies with full backtest transparency. Filter
              by style, risk profile, and prop firm compatibility.
            </p>
          </div>
          <Link
            href="https://fluxtrade.net/backtests/explorer"
            className="shrink-0 text-sm font-medium text-[#39ff14] transition-colors hover:text-white"
          >
            View all strategies →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <Link
              key={strategy.name}
              href={strategy.href}
              className="glass-card group relative rounded-2xl p-6 transition-all duration-300 hover:border-flux-green/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]"
            >
              {strategy.badge && (
                <span className="badge-new absolute right-4 top-4">
                  {strategy.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-white group-hover:text-flux-green transition-colors">
                {strategy.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{strategy.type}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {strategy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-[#111111] px-2.5 py-0.5 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#39ff14] opacity-0 transition-opacity group-hover:opacity-100">
                View backtest
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
