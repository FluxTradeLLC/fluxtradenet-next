import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DisclaimersContent } from "@/components/legal/DisclaimersContent";

export const metadata: Metadata = {
  title: "Disclaimers — FluxTrade",
  description:
    "Important trading disclaimers, testimonial disclosures, and live stream disclosures for FluxTrade.",
  openGraph: {
    title: "FluxTrade Disclaimers",
    url: "https://fluxtrade.net/disclaimers",
  },
};

export default function DisclaimersPage() {
  return (
    <>
      <Header />
      <main>
        <DisclaimersContent />
      </main>
      <Footer />
    </>
  );
}
