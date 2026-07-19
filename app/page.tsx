import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Indicators } from "@/components/home/Indicators";
import { Strategies } from "@/components/home/Strategies";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Strategies />
        <Indicators />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
