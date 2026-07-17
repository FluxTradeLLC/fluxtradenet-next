import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Trading Software Subscriptions",
  description:
    "Choose the perfect FluxTrade subscription plan for your trading needs. Access automated strategies, indicators, and professional trading tools for NinjaTrader.",
  keywords: [
    "trading software pricing",
    "ninjatrader subscription",
    "automated trading subscription",
    "prop firm trading tools pricing",
  ],
  openGraph: {
    title: "FluxTrade Pricing — Trading Software Subscriptions",
    description:
      "Flexible monthly, quarterly, and yearly plans for automated strategies and professional indicators.",
    url: "https://fluxtrade.net/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <PricingContent />
      </main>
      <Footer />
    </>
  );
}
