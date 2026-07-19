import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IndicatorsDownloadContent } from "@/components/downloads/IndicatorsDownloadContent";

export const metadata: Metadata = {
  title: "Indicators Pack Download — FluxTrade",
  description: "Download the FluxTrade indicators pack for NinjaTrader.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function IndicatorsDownloadPage() {
  return (
    <>
      <Header />
      <main>
        <IndicatorsDownloadContent />
      </main>
      <Footer />
    </>
  );
}
