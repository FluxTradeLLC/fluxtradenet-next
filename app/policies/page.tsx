import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PoliciesContent } from "@/components/legal/PoliciesContent";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policies — FluxTrade",
  description:
    "FluxTrade refund and cancellation policies for trading software subscriptions.",
  openGraph: {
    title: "FluxTrade Refund & Cancellation Policies",
    url: "https://fluxtrade.net/policies",
  },
};

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main>
        <PoliciesContent />
      </main>
      <Footer />
    </>
  );
}
