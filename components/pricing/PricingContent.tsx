"use client";

import Link from "next/link";
import { useAppAuth } from "@/hooks/useAppAuth";
import { useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  type BillingPeriod,
  type Currency,
  type PlanKey,
  type StrategyKey,
  CURRENCY_FLAGS,
  CURRENCY_RATES,
  PRICING,
  STRATEGY_NAME_TO_KEY,
  formatCurrency,
  getBillingPeriodLabel,
  getDiscountPercent,
  getPriceForPlan,
  getPriceForSelectedStrategies,
  getPriceIdForStrategy,
} from "@/lib/pricing";

const strategies = [
  {
    name: "Hydra",
    type: "Renko Patterns",
    tags: ["Renko", "Patterns"],
  },
  {
    name: "Ignition",
    type: "Opening Range Break",
    tags: ["Volatility", "Breakout"],
  },
  {
    name: "ORMS",
    type: "Opening Range Momentum Scalping",
    tags: ["Scalping", "Momentum"],
  },
  {
    name: "Kraken",
    type: "Compression Breakout",
    tags: ["Breakout", "Volatility"],
  },
];

const includedFeatures = [
  "Full automated strategy access for NinjaTrader",
  "All indicators included free",
  "Direct access to new features",
  "Priority updates",
  "24/7 customer support",
  "Full backtest data",
];

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PriceDisplay({
  monthlyPrice,
  planKey,
  billingPeriod,
  currency,
}: {
  monthlyPrice: number;
  planKey: PlanKey;
  billingPeriod: BillingPeriod;
  currency: Currency;
}) {
  const periodLabel = getBillingPeriodLabel(billingPeriod);

  if (billingPeriod === "monthly") {
    return (
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-white">
          {formatCurrency(Math.round(monthlyPrice), currency, true)}
        </span>
        <span className="text-base text-muted">{periodLabel}</span>
      </div>
    );
  }

  const multiplier = billingPeriod === "quarterly" ? 3 : 12;
  const basePrice = monthlyPrice * multiplier;
  const actualPrice = getPriceForPlan(planKey, monthlyPrice, billingPeriod);
  const discountPercent = getDiscountPercent(monthlyPrice, billingPeriod, planKey);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-wrap items-baseline justify-center gap-2">
        <span className="text-xl font-bold text-muted line-through">
          {formatCurrency(Math.round(basePrice), currency)}
        </span>
        <span className="text-4xl font-extrabold tracking-tight text-white">
          {formatCurrency(Math.round(actualPrice), currency, true)}
        </span>
        <span className="text-base text-muted">{periodLabel}</span>
      </div>
      <span className="text-sm font-semibold text-[#02C064]">
        Save {discountPercent.toFixed(0)}%
      </span>
    </div>
  );
}

type StrategyCardProps = {
  name: string;
  type: string;
  tags: string[];
  billingPeriod: BillingPeriod;
  currency: Currency;
  selected: boolean;
  onToggle: () => void;
};

function StrategyCard({
  name,
  type,
  tags,
  billingPeriod,
  currency,
  selected,
  onToggle,
}: StrategyCardProps) {
  const monthlyPrice = PRICING.MONTHLY.STRATEGY;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`glass-card flex h-full w-full flex-col rounded-2xl px-8 py-6 text-left transition-all ${
        selected
          ? "ring-2 ring-[#02C064] ring-offset-2 ring-offset-background"
          : "hover:border-flux-green/30"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-[#02C064] bg-[#02C064] text-black"
              : "border-border text-muted"
          }`}
          aria-hidden="true"
        >
          {selected ? <CheckIcon className="h-4 w-4" /> : null}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="mt-1 text-sm text-muted">{type}</p>

      <div className="my-6">
        <PriceDisplay
          monthlyPrice={monthlyPrice}
          planKey="STRATEGY"
          billingPeriod={billingPeriod}
          currency={currency}
        />
      </div>

      <ul className="mb-2 flex-1 space-y-2">
        <li className="flex items-start gap-2 text-sm text-muted">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-flux-green-icon" />
          <span>Full {name} strategy access</span>
        </li>
        <li className="flex items-start gap-2 text-sm text-muted">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-flux-green-icon" />
          <span>All indicators included free</span>
        </li>
      </ul>

      <p className="text-center text-xs text-muted/70">
        {selected ? "Selected" : "Click to add"}
      </p>
    </button>
  );
}

function IncludedFeaturesTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-elevated">
            <th className="p-4 text-left font-semibold text-white">
              Included with every strategy
            </th>
          </tr>
        </thead>
        <tbody>
          {includedFeatures.map((feature, index) => (
            <tr
              key={feature}
              className={
                index < includedFeatures.length - 1 ? "border-b border-border" : ""
              }
            >
              <td className="flex items-center gap-3 p-4 font-medium text-white">
                <CheckIcon className="h-5 w-5 shrink-0 text-flux-green-icon" />
                {feature}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingContent() {
  const { isLoaded, isAuthenticated } = useAppAuth();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const periods: { key: BillingPeriod; label: string; badge?: string }[] = [
    { key: "monthly", label: "Monthly" },
    { key: "quarterly", label: "Quarterly", badge: "Save 10%" },
    { key: "yearly", label: "Yearly", badge: "Save 17%" },
  ];

  const selectedTotal = useMemo(
    () => getPriceForSelectedStrategies(selectedStrategies, billingPeriod),
    [selectedStrategies, billingPeriod],
  );

  const toggleStrategy = (strategyName: string) => {
    const strategyKey = STRATEGY_NAME_TO_KEY[strategyName];
    if (!strategyKey) {
      return;
    }

    setSelectedStrategies((current) =>
      current.includes(strategyKey)
        ? current.filter((key) => key !== strategyKey)
        : [...current, strategyKey],
    );
    setCheckoutError(null);
  };

  const handleCheckout = async () => {
    if (selectedStrategies.length === 0) {
      setCheckoutError("Select at least one strategy to continue.");
      return;
    }

    if (!isAuthenticated) {
      window.location.href = `/signin?redirect_url=${encodeURIComponent("/pricing")}`;
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const priceIds = selectedStrategies.map((strategyKey) =>
        getPriceIdForStrategy(strategyKey, billingPeriod),
      );

      const response = await apiFetch<{ redirect: string }>(
        "/payment/create-checkout-session",
        {
          method: "POST",
          body: JSON.stringify({
            priceIds,
            subscription: true,
            billingPeriod,
            referral:
              typeof window !== "undefined"
                ? (window as Window & { promotekit_referral?: string })
                    .promotekit_referral
                : undefined,
          }),
        },
      );

      window.location.href = response.redirect;
    } catch (error) {
      console.error("Checkout failed:", error);
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Could not start checkout. Please try again.",
      );
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 glow-orb" />

        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="label-accent text-sm">
            Pricing
          </p>
          <h1 className="mt-3 text-4xl font-bold italic tracking-tight text-white sm:text-5xl lg:text-6xl">
            Mix & match strategies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Each automated strategy is {formatCurrency(PRICING.MONTHLY.STRATEGY, "USD")}/mo.
            Subscribe to only what you need — all indicators are free.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 sm:flex-row lg:px-8">
          <div
            className="inline-flex rounded-xl border border-border bg-surface p-1"
            role="tablist"
            aria-label="Billing period"
          >
            {periods.map((period) => (
              <button
                key={period.key}
                type="button"
                role="tab"
                aria-selected={billingPeriod === period.key}
                onClick={() => setBillingPeriod(period.key)}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  billingPeriod === period.key
                    ? "bg-[#02C064] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {period.label}
                {period.badge && (
                  <span className="chip px-2 py-0.5 text-xs">
                    {period.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-white focus:border-flux-green/50 focus:outline-none"
            aria-label="Currency"
          >
            {(Object.keys(CURRENCY_RATES) as Currency[]).map((c) => (
              <option key={c} value={c}>
                {CURRENCY_FLAGS[c]} {c}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-muted">
            Automated Strategies
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted">
            Pick one strategy or stack as many as you want. Want Hydra and Kraken?
            That&apos;s {formatCurrency(PRICING.MONTHLY.STRATEGY * 2, currency, currency !== "USD")}/mo.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.name}
                name={strategy.name}
                type={strategy.type}
                tags={strategy.tags}
                billingPeriod={billingPeriod}
                currency={currency}
                selected={selectedStrategies.includes(
                  STRATEGY_NAME_TO_KEY[strategy.name],
                )}
                onToggle={() => toggleStrategy(strategy.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedStrategies.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row lg:px-8">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted">
                {selectedStrategies.length} strateg
                {selectedStrategies.length === 1 ? "y" : "ies"} selected
              </p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(Math.round(selectedTotal), currency, currency !== "USD")}
                <span className="text-base font-normal text-muted">
                  {getBillingPeriodLabel(billingPeriod)}
                </span>
              </p>
              {checkoutError ? (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {checkoutError}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              disabled
              className="btn-primary rounded-lg px-8 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              Coming soon
            </button>
          </div>
        </div>
      ) : null}

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold italic text-white sm:text-3xl">
            What&apos;s included
          </h2>
          <IncludedFeaturesTable />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold italic text-white sm:text-3xl">
            Not sure which strategy fits?
          </h2>
          <p className="mt-4 text-muted">
            Browse backtests for each strategy and subscribe to the ones that
            match your style. Start with one — add more anytime.
          </p>
          <Link
            href="/signup"
            className="btn-primary mt-8 px-10 py-4 text-base"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
