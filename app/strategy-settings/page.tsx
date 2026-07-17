import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StrategySettingsContent } from "@/components/legal/StrategySettingsContent";
import { loadStrategySettingsDocs } from "@/lib/load-strategy-settings";

export const metadata: Metadata = {
  title: "Strategy Settings Reference — FluxTrade",
  description:
    "Reference documentation for FluxTrade automated strategy properties, defaults, and parameter groups.",
  openGraph: {
    title: "FluxTrade Strategy Settings Reference",
    url: "https://fluxtrade.net/strategy-settings",
  },
};

export default function StrategySettingsPage() {
  const docs = loadStrategySettingsDocs();

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <StrategySettingsContent docs={docs} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
