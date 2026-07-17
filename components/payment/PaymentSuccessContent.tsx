"use client";

import Link from "next/link";
import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { AuthError, authInputClassName } from "@/components/auth/auth-ui";

export function PaymentSuccessContent() {
  const [discordName, setDiscordName] = useState("");
  const [email, setEmail] = useState("");
  const [ntEmail, setNtEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tradingViewUsername, setTradingViewUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiFetch("/payment/send-post-purchase-info", {
        method: "POST",
        body: JSON.stringify({
          discordName,
          email,
          ntEmail,
          firstName,
          lastName,
          tradingViewUsername,
        }),
      });
      setSuccess(true);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Failed to submit info. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />

      <div className="relative mx-auto max-w-xl px-6 text-center lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-flux-green sm:text-5xl">
          Congrats, your purchase is complete! 🎉
        </h1>
        <p className="mt-4 text-lg text-muted">
          Thank you for joining FluxTrade! Your subscription is now active and you have
          full access to all premium features. Check your email for a receipt and onboarding
          instructions. If you have any questions, our support team is here to help.
        </p>
        <p className="mt-4 text-sm text-muted">
          You can manage your account, view your subscription, and get started with our
          tools from your account dashboard.
        </p>
        <Link href="/account" className="btn-primary mt-8 inline-flex px-8 py-3 text-sm">
          Go to My Account
        </Link>

        <div className="glass-card mx-auto mt-12 max-w-md rounded-2xl p-6 text-left shadow-lg">
          <h2 className="text-2xl font-bold text-white">Get Started</h2>

          {success ? (
            <div className="mt-4 text-center text-sm text-flux-green">
              <p>
                Info submitted successfully! We&apos;ll add access for these accounts
                shortly. In the meantime, please check your email for information on how
                to download and install the Add-ons. 🚀
              </p>
              <p className="mt-6 text-muted">
                Access to TradingView scripts is semi automated, takes around 30 minutes,
                and will be started during the next business day in US Eastern. Access to
                NinjaTrader licenses is fully automated, and only takes a few minutes.
              </p>
              <p className="mt-6 text-muted">
                Join the{" "}
                <a
                  href="https://discord.gg/239t9xcrxV"
                  className="text-flux-green underline hover:text-flux-green-dim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord!
                </a>
              </p>
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm text-muted">
                Please enter your Discord username (optional) and NinjaTrader Account email
                (if different from the other email) in the form
                below, and we will get you set up with your license on our end.
              </p>
              <p className="mt-4 text-sm text-muted">
                We are using NinjaTrader&apos;s new email licensing system, and no longer
                need machine ID&apos;s.
              </p>
              <p className="mt-4 text-sm text-muted">
                Granting access and adding licenses and Discord roles is all done
                automatically, so please ensure all fields are correct before submitting.
              </p>
              <p className="mt-4 text-sm text-muted">
                Need help? Email us at{" "}
                <a
                  href="mailto:grant@fluxtrade.net"
                  className="text-flux-green underline hover:text-flux-green-dim"
                >
                  grant@fluxtrade.net
                </a>
                .
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">First Name</span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">Last Name</span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">Purchase Email</span>
                  <input
                    type="email"
                    className={authInputClassName}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">
                    NinjaTrader Account Email (if different than purchase email)
                  </span>
                  <input
                    type="email"
                    className={authInputClassName}
                    placeholder="your@email.com"
                    value={ntEmail}
                    onChange={(event) => setNtEmail(event.target.value)}
                  />
                </label>
                {/* <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">
                    TradingView Username (this is not an email)
                  </span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="e.g. tradingview_user"
                    value={tradingViewUsername}
                    onChange={(event) => setTradingViewUsername(event.target.value)}
                  />
                </label> */}
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">
                    Discord Username (this is not an email)
                  </span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="e.g. Trader"
                    value={discordName}
                    onChange={(event) => setDiscordName(event.target.value)}
                  />
                </label>

                {error ? <AuthError message={error} /> : null}

                <button
                  type="submit"
                  className="btn-primary rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Info"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
