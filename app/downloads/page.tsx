import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadsContent } from "@/components/downloads/DownloadsContent";

export const metadata: Metadata = {
  title: "Downloads — FluxTrade",
  description:
    "Download FluxTrade automated strategy packages and the free NinjaTrader indicators pack.",
  openGraph: {
    title: "FluxTrade Downloads",
    description:
      "Strategy zips and free professional indicators for NinjaTrader.",
    url: "https://fluxtrade.net/downloads",
  },
};

export default function DownloadsPage() {
  return (
    <>
      <Header />
      <main>
        <DownloadsContent />
      </main>
      <Footer />
    </>
  );
}
