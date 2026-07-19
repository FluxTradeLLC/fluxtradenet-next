import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IndicatorPackContent } from "@/components/downloads/IndicatorPackContent";

export const metadata: Metadata = {
  title: "Free Indicators Pack — FluxTrade",
  description:
    "Get the free FluxTrade indicators pack for NinjaTrader. Enter your email to unlock the download.",
  openGraph: {
    title: "Free FluxTrade Indicators Pack",
    description:
      "Professional NinjaTrader indicators — free. Enter your email to download.",
    url: "https://fluxtrade.net/downloads/indicator-pack",
  },
};

export default function IndicatorPackPage() {
  return (
    <>
      <Header />
      <main>
        <IndicatorPackContent />
      </main>
      <Footer />
    </>
  );
}
