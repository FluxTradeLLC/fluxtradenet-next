import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WebhookTestContent } from "@/components/pricing/WebhookTestContent";

export const metadata: Metadata = {
  title: "Webhook Test — FluxTrade",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WebhookTestPage() {
  return (
    <>
      <Header />
      <main>
        <WebhookTestContent />
      </main>
      <Footer />
    </>
  );
}
