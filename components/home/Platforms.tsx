import Link from "next/link";

const platforms = [
  {
    name: "NinjaTrader",
    description:
      "The best desktop trading platform for backtesting and live execution. Official FluxTrade ecosystem vendor.",
    cta: "Get NinjaTrader",
    href: "https://ninjatrader.com",
    highlight: true,
  },
  {
    name: "TradingView",
    description:
      "Run FluxTrade strategies and indicators directly on TradingView. Cloud-based, accessible anywhere.",
    cta: "Start on TradingView",
    href: "https://fluxtrade.net/signup",
    highlight: false,
  },
];

export function Platforms() {
  return (
    <section id="platforms" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-accent text-sm">
            Platforms
          </p>
          <h2 className="mt-3 text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your platform. Your edge.
          </h2>
          <p className="mt-4 text-lg text-muted">
            FluxTrade works on the platforms you already use. Pick one or run
            both with a single subscription.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className={`relative overflow-hidden rounded-2xl border p-8 sm:p-10 ${
                platform.highlight
                  ? "border-flux-green/30 bg-gradient-to-br from-flux-green/5 to-transparent"
                  : "border-border glass-card"
              }`}
            >
              {platform.highlight && (
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-flux-green/10 blur-3xl" />
              )}
              <h3 className="text-2xl font-bold italic text-white">{platform.name}</h3>
              <p className="mt-3 max-w-md text-muted">{platform.description}</p>
              <Link
                href={platform.href}
                target={platform.highlight ? "_blank" : undefined}
                rel={platform.highlight ? "noopener noreferrer" : undefined}
                className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  platform.highlight
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {platform.cta}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
