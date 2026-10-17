import type { useClerk } from "@clerk/nextjs";
import { apiFetch } from "@/lib/api";

type Clerk = ReturnType<typeof useClerk>;

type LoginResponse = {
  ticket?: string;
};

/**
 * Email/password sign-in. The backend checks the password and returns a
 * one-time Clerk sign-in ticket, which is redeemed here for a real Clerk
 * session, so password users end up on the same session path as Google users.
 */
export async function signInWithPassword(
  clerk: Clerk,
  email: string,
  password: string,
) {
  const { ticket } = await apiFetch<LoginResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!ticket) {
    throw new Error("Sign in failed");
  }

  // client.signIn.create always starts a fresh attempt, so an attempt left on
  // the client by the forgot-password or Google flows can't interfere.
  const signIn = await clerk.client.signIn.create({
    strategy: "ticket",
    ticket,
  });

  if (signIn.status !== "complete" || !signIn.createdSessionId) {
    throw new Error("Sign-in could not be completed");
  }

  await clerk.setActive({ session: signIn.createdSessionId });
}
