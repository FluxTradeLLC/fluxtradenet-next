import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Trading Strategy Blog & Educational Content",
  description:
    "Learn trading strategies, understand prop firm challenges, and discover proven backtested approaches. Educational content covering Flux Trident, Flux Signal, Flux Pivot, and more.",
  keywords: [
    "trading blog",
    "trading strategies",
    "prop firm trading",
    "trading education",
    "backtested strategies",
  ],
  openGraph: {
    title: "FluxTrade Trading Strategy Blog",
    description:
      "Educational trading content covering strategies, prop firms, and backtested approaches.",
    url: "https://fluxtrade.net/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
