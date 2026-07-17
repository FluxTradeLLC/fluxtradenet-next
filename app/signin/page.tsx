import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RedirectIfSignedIn } from "@/components/auth/RedirectIfSignedIn";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — FluxTrade",
  description: "Sign in to your FluxTrade account to access automated strategies, indicators, and subscription settings.",
  openGraph: {
    title: "Sign In — FluxTrade",
    description: "Sign in to your FluxTrade account.",
    url: "https://fluxtrade.net/signin",
  },
};

export default function SignInPage() {
  return (
    <>
      <Header />
      <main>
        <RedirectIfSignedIn />
        <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
          <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />
          <div className="relative mx-auto max-w-md px-6 lg:px-8">
            <SignInForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
