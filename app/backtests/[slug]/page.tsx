import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BacktestContent } from "@/components/backtests/BacktestContent";
import {
  BACKTEST_SLUGS,
  slugToDisplayName,
} from "@/lib/backtests";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(BACKTEST_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const file = BACKTEST_SLUGS[slug];

  if (!file) {
    return { title: "Backtest Not Found" };
  }

  const displayName = slugToDisplayName(slug);

  return {
    title: `${displayName} — Backtest Results`,
    description: `View full backtest results for the ${displayName} strategy. Download CSV trade data and analyze performance.`,
    openGraph: {
      title: `${displayName} Backtest Results — FluxTrade`,
      description: `Full backtest trade log for ${displayName}.`,
      url: `https://fluxtrade.net/backtests/${slug}`,
    },
  };
}

export default async function BacktestPage({ params }: PageProps) {
  const { slug } = await params;
  const file = BACKTEST_SLUGS[slug];

  if (!file) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <BacktestContent file={file} displayName={slugToDisplayName(slug)} />
      </main>
      <Footer />
    </>
  );
}
