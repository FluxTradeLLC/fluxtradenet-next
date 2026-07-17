import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — FluxTrade",
  description:
    "Create your FluxTrade account and start your free trial. Access automated NinjaTrader strategies and professional indicators.",
  openGraph: {
    title: "Sign Up — FluxTrade",
    description: "Create your FluxTrade account and start your free trial.",
    url: "https://fluxtrade.net/signup",
  },
};

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
          <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />
          <div className="relative mx-auto max-w-md px-6 lg:px-8">
            <SignUpForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
