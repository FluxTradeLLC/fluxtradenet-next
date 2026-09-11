import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RedirectIfSignedIn } from "@/components/auth/RedirectIfSignedIn";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — FluxTrade",
  description:
    "Reset the password for your FluxTrade account with a verification code sent to your email.",
  openGraph: {
    title: "Reset Password — FluxTrade",
    description: "Reset the password for your FluxTrade account.",
    url: "https://fluxtrade.net/forgot-password",
  },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main>
        <RedirectIfSignedIn />
        <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
          <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />
          <div className="relative mx-auto max-w-md px-6 lg:px-8">
            <ForgotPasswordForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
