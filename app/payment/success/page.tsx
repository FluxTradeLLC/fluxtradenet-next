import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PaymentSuccessContent } from "@/components/payment/PaymentSuccessContent";

export const metadata: Metadata = {
  title: "Payment Successful — FluxTrade",
  description:
    "Your FluxTrade subscription is active. Submit your account details to get set up with NinjaTrader and TradingView access.",
  openGraph: {
    title: "Payment Successful — FluxTrade",
    description:
      "Your FluxTrade subscription is active. Complete onboarding to get started.",
    url: "https://fluxtrade.net/payment/success",
  },
};

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <main>
        <PaymentSuccessContent />
      </main>
      <Footer />
    </>
  );
}
