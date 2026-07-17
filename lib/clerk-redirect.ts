export function getClerkOAuthRedirectUrls() {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    redirectUrl: `${origin}/account`,
    redirectCallbackUrl: `${origin}/auth/callback`,
  };
}
