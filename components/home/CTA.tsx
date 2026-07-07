import Link from "next/link";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 glow-orb" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to trade with an edge?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Start your free 30-day trial today. No commitment — just proven
          strategies, professional tools, and a community that&apos;s got your
          back.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="https://fluxtrade.net/signup"
            className="btn-primary px-10 py-4 text-base"
          >
            Start Free Trial
          </Link>
          <Link
            href="/pricing"
            className="btn-secondary px-10 py-4 text-base"
          >
            View Pricing
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted/60">
          NinjaTrader · TradingView · Both platforms available
        </p>
      </div>
    </section>
  );
}
