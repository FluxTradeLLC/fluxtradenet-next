import type { Metadata } from "next";
import { AuthCallbackContent } from "@/components/auth/AuthCallbackContent";

export const metadata: Metadata = {
  title: "Authenticating — FluxTrade",
  description: "Completing sign in to your FluxTrade account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthCallbackPage() {
  return <AuthCallbackContent />;
}
