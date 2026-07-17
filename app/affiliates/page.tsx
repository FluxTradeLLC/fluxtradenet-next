import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AffiliatesContent } from "@/components/affiliates/AffiliatesContent";

export const metadata: Metadata = {
  title: "Affiliate Program — FluxTrade",
  description:
    "Join the FluxTrade affiliate program. Earn commission promoting trading software subscriptions and automated strategies.",
  openGraph: {
    title: "FluxTrade Affiliate Program",
    description: "Earn commission promoting FluxTrade trading software.",
    url: "https://fluxtrade.net/affiliates",
  },
};

export default function AffiliatesPage() {
  return (
    <>
      <Header />
      <main>
        <AffiliatesContent />
      </main>
      <Footer />
    </>
  );
}
