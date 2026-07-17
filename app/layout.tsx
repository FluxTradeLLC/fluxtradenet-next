import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthSessionMonitor } from "@/components/auth/AuthSessionMonitor";
import { ClerkSessionSync } from "@/components/auth/ClerkSessionSync";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxtrade.net"),
  title: "FluxTrade — Advanced Trading Software & Strategies",
  description:
    "Prop-firm friendly trading systems built for consistency, risk management, and discipline. Automated strategies and professional indicators for NinjaTrader.",
  keywords: [
    "FluxTrade",
    "trading software",
    "automated trading",
    "NinjaTrader",
    "prop firm trading",
    "backtested strategies",
  ],
  openGraph: {
    title: "FluxTrade — Advanced Trading Software & Strategies",
    description:
      "Prop-firm friendly systems built for consistency, risk management, and discipline.",
    url: "https://fluxtrade.net",
    siteName: "FluxTrade",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "FluxTrade" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FluxTrade — Advanced Trading Software & Strategies",
    description:
      "Prop-firm friendly systems built for consistency, risk management, and discipline.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClerkProvider
          signInFallbackRedirectUrl="/account"
          signUpFallbackRedirectUrl="/account"
          signInForceRedirectUrl="/account"
          signUpForceRedirectUrl="/account"
        >
          <ClerkSessionSync />
          <AuthSessionMonitor />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
