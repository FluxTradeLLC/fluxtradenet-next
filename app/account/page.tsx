import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccountContent } from "@/components/auth/AccountContent";

export const metadata: Metadata = {
  title: "Account — FluxTrade",
  description:
    "Manage your FluxTrade account, subscription settings, and sign in or sign up.",
  openGraph: {
    title: "Account — FluxTrade",
    description: "Manage your FluxTrade account and subscription.",
    url: "https://fluxtrade.net/account",
  },
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main>
        <AccountContent />
      </main>
      <Footer />
    </>
  );
}
