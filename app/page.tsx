import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
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
        <CTA />
      </main>
      <Footer />
    </>
  );
}
