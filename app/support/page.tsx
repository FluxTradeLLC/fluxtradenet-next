import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SupportContent } from "@/components/support/SupportContent";

export const metadata: Metadata = {
  title: "Support — FluxTrade",
  description:
    "Contact FluxTrade support for help with subscriptions, billing, technical issues, and account questions.",
  openGraph: {
    title: "FluxTrade Support",
    description: "Get help with your FluxTrade account and subscriptions.",
    url: "https://fluxtrade.net/support",
  },
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        <SupportContent />
      </main>
      <Footer />
    </>
  );
}
