import Image from "next/image";
import { s } from "@/lib/strings";

const NINJATRADER_AFFILIATE_URL = "https://ninjatraderus.pxf.io/APNodJ";

const freeAccessFeatures = [
  "Simulated trading with real-time futures data",
  "Advanced charting including ability to trade directly from your charts",
  "High performance backtesting engine to analyze your trading strategies on historical data",
  "Advanced Trade Management featuring automatically submitted stop orders, target orders, and trailing stops",
];

export function RecommendedResources() {
  return (
    <section
      id="recommended-resources"
      className="relative border-t border-border bg-surface py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Recommended Resources
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-8">
            <a
              href={NINJATRADER_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s("landing.signUpAriaLabel")}
            >
              <Image
                src="/logos/nt_wordmark.png"
                alt="NinjaTrader"
                width={480}
                height={96}
                className="h-auto w-full max-w-md"
              />
            </a>
            <Image
              src="/logos/nt_monitor.png"
              alt="NinjaTrader trading platform displayed on a monitor"
              width={640}
              height={480}
              className="h-auto w-full max-w-lg rounded-xl"
            />
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted">
              <span className="font-semibold text-white">NinjaTrader®</span> is
              our #1 recommended trading platform preferred by traders worldwide
              including our clients.
            </p>

            <div>
              <p className="font-medium text-white">
                Download NinjaTrader & receive immediate FREE access to:
              </p>
              <ul className="mt-4 space-y-3">
                {freeAccessFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flux-green-icon"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm leading-relaxed text-muted">
              NinjaTrader&apos;s award-winning trading platform is consistently
              voted an industry leader by the trading community. Featuring 1000s
              of Apps & Add-Ons for unlimited customization, NinjaTrader is used
              by over 1.9 million traders for advanced market analysis,
              professional charting and fast order execution.
            </p>

            <p className="text-sm leading-relaxed text-muted">
              For new traders, start preparing for the live markets with a free
              trading simulator featuring real-time market data.
            </p>

            <div>
              <a
                href={NINJATRADER_AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s("landing.signUpAriaLabel")}
                className="btn-primary inline-flex px-10 py-4 text-base"
              >
                Get Started for FREE!
              </a>
              <p className="mt-4 text-xs italic text-muted/70">
                {s("landing.ninjaTraderEndorsement")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
