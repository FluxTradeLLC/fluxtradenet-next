import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BacktestExplorerContent } from "@/components/backtests/BacktestExplorerContent";

export const metadata: Metadata = {
  title: "Backtest Explorer — Strategy Performance Analysis",
  description:
    "Explore comprehensive backtest results for FluxTrade strategies. Analyze performance metrics, profit distributions, and strategy comparisons across different instruments and market conditions.",
  keywords: [
    "backtest results",
    "trading strategy performance",
    "strategy analysis",
    "trading metrics",
    "backtest explorer",
    "strategy comparison",
  ],
  openGraph: {
    title: "FluxTrade Backtest Explorer",
    description:
      "Interactive analysis of backtest results across FluxTrade strategies.",
    url: "https://fluxtrade.net/backtests/explorer",
  },
};

function ExplorerFallback() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center pt-28">
      <p className="text-lg text-muted">Loading backtest data…</p>
    </section>
  );
}

export default function BacktestExplorerPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<ExplorerFallback />}>
          <BacktestExplorerContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
