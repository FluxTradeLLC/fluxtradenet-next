import Link from "next/link";

const strategies = [
  {
    name: "Hydra",
    icon: "/icons/hydra.svg",
    type: "Renko Patterns",
    tags: ["Renko", "Patterns"],
    href: "/backtests/hydra",
  },
  {
    name: "Ignition",
    icon: "/icons/ignition.svg",
    type: "Opening Range Break",
    tags: ["Volatility", "Breakout"],
    href: "/backtests/ignition",
  },
  {
    name: "ORMS",
    icon: "/icons/orms.svg",
    type: "Opening Range Momentum Scalping",
    tags: ["Scalping", "Momentum"],
    href: "/backtests/orms",
  },
  {
    name: "Kraken",
    icon: "/icons/kraken.svg",
    type: "Compression Breakout",
    tags: ["Breakout", "Volatility"],
    href: "/backtests/kraken",
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
              Four automated strategies with full backtest transparency — from
              Renko patterns to opening range momentum and compression breakouts.
            </p>
          </div>
          <Link
            href="/backtests/explorer"
            className="shrink-0 text-sm font-medium text-[#02C064] transition-colors hover:text-white"
          >
            View all strategies →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strategies.map((strategy) => (
            <Link
              key={strategy.name}
              href={strategy.href}
              className="glass-card group relative flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:border-flux-green/30 hover:shadow-[0_0_30px_rgba(2,192,100,0.08)]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-flux-green-icon/30 bg-black p-2 transition-colors group-hover:border-flux-green-icon/50">
                <img
                  src={strategy.icon}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-flux-green transition-colors">
                {strategy.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{strategy.type}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {strategy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-[#111111] px-2.5 py-0.5 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-flux-green-dim transition-colors group-hover:text-flux-green-icon">
                View backtest
                <svg className="h-3 w-3 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
