type ClerkApiError = {
  message?: string;
  longMessage?: string;
};

type ClerkErrorLike = {
  clerkError?: boolean;
  message?: string;
  longMessage?: string;
  errors?: ClerkApiError[];
};

/**
 * Pulls a user-facing message out of a Clerk error. Clerk's top-level `message`
 * is written for developers, so prefer `longMessage` and the nested API errors.
 */
export function getClerkErrorMessage(error: unknown, fallback: string) {
  if (!error || typeof error !== "object") {
    return fallback;
  }

  const clerkError = error as ClerkErrorLike;
  const apiError = clerkError.errors?.[0];

  return (
    clerkError.longMessage ??
    apiError?.longMessage ??
    apiError?.message ??
    clerkError.message ??
    fallback
  );
}
