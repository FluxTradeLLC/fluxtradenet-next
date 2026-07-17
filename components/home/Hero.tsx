import Image from "next/image";
import Link from "next/link";

function LightningBolt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 0L4 28h8l-2 20 14-32h-8l2-16z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern animate-grid-fade" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 glow-orb animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[400px] glow-orb opacity-50" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-16 text-center lg:px-8 lg:pt-24">
        <div className="mb-8 pill-outline">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39ff14] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39ff14]" />
          </span>
          Official NinjaTrader Ecosystem Vendor
        </div>

        <div className="relative mb-8 animate-float">
          <Image
            src="/logo.png"
            alt="FluxTrade"
            width={200}
            height={200}
            className="mx-auto h-28 w-auto sm:h-36 lg:h-44"
            priority
          />
        </div>

        <h1 className="max-w-4xl text-4xl font-bold italic leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
          Understand the{" "}
          <span className="text-gradient">markets</span>
          <br />
          <span className="flex items-center justify-center gap-3 sm:gap-4">
            Gain an
            <LightningBolt className="h-10 w-5 text-flux-green sm:h-14 sm:w-7" />
            <span className="text-gradient">edge</span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          Prop-firm friendly systems built for consistency, risk management, and
          discipline. Automated strategies and professional indicators for
          serious traders.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="https://fluxtrade.net/signup"
            className="btn-primary group px-8 py-4 text-base"
          >
            Get Started
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="https://fluxtrade.net/backtests/explorer"
            className="btn-secondary px-8 py-4 text-base"
          >
            Explore Backtests
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-border pt-10">
          {[
            { value: "4", label: "Strategies" },
            { value: "10+", label: "Indicators" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[#39ff14] sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
