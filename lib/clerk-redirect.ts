export function getClerkOAuthRedirectUrls() {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    /** Route that completes the OAuth handshake — it mounts HandleSSOCallback. */
    ssoCallbackUrl: `${origin}/auth/callback`,
    /** Where the user lands once the sign-in is finished. */
    afterSignInUrl: `${origin}/account`,
  };
}
