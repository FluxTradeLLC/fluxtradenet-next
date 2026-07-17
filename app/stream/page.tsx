import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StreamingContent } from "@/components/stream/StreamingContent";

export const metadata: Metadata = {
  title: "Live Stream — FluxTrade",
  description:
    "Watch the FluxTrade live stream on Twitch. Follow along with real-time trading content and join our community.",
  openGraph: {
    title: "FluxTrade Live Stream",
    description: "Watch the FluxTrade live stream on Twitch.",
    url: "https://fluxtrade.net/stream",
  },
};

export default function StreamPage() {
  return (
    <>
      <Header />
      <main>
        <StreamingContent />
      </main>
      <Footer />
    </>
  );
}
