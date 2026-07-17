import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions — FluxTrade",
  description:
    "Read the FluxTrade terms and conditions covering subscriptions, refunds, cancellations, and service usage.",
  openGraph: {
    title: "FluxTrade Terms & Conditions",
    url: "https://fluxtrade.net/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
