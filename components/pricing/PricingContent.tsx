"use client";

import Link from "next/link";
import { useState } from "react";
import {
  type BillingPeriod,
  type Currency,
  type PlanKey,
  CURRENCY_FLAGS,
  CURRENCY_RATES,
  PRICING,
  formatCurrency,
  getBillingPeriodLabel,
  getDiscountPercent,
  getPriceForPlan,
} from "@/lib/pricing";

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
      <span className="text-sm font-semibold text-[#39ff14]">
        Save {discountPercent.toFixed(0)}%
      </span>
    </div>
  );
}

type PlanCardProps = {
  title: string;
  subtitle: string;
  monthlyPrice: number;
  planKey: PlanKey;
  features: string[];
  badges?: string[];
  highlighted?: boolean;
  mostPopular?: boolean;
  billingPeriod: BillingPeriod;
  currency: Currency;
};

function PlanCard({
  title,
  subtitle,
  monthlyPrice,
  planKey,
  features,
  badges = [],
  highlighted = false,
  mostPopular = false,
  billingPeriod,
  currency,
}: PlanCardProps) {
  const signupUrl = "https://fluxtrade.net/signup";
  const trialLabel =
    billingPeriod === "monthly"
      ? "Start 30-day free trial"
      : "Subscribe now";

  const card = (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-8 ${
        highlighted
          ? "border border-flux-green/40 bg-gradient-to-b from-flux-green/10 to-surface"
          : "glass-card"
      }`}
    >
      {mostPopular && (
        <div className="badge-new absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">
          MOST POPULAR
        </div>
      )}

      {badges.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {badges.map((badge) => (
            <span key={badge} className="chip">
              {badge}
            </span>
          ))}
        </div>
      )}

      <h3 className="text-center text-xl font-bold text-white">{title}</h3>
      <p className="mt-1 text-center text-sm text-muted">{subtitle}</p>

      <div className="my-6">
        <PriceDisplay
          monthlyPrice={monthlyPrice}
          planKey={planKey}
          billingPeriod={billingPeriod}
          currency={currency}
        />
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-muted">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#39ff14]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {planKey.includes("SINGLE") && !planKey.includes("AND") ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={signupUrl}
              className="btn-primary rounded-lg py-3 text-center text-xs sm:text-sm"
            >
              {billingPeriod === "monthly" ? "Trial · NT" : "Subscribe · NT"}
            </Link>
            <Link
              href={signupUrl}
              className="btn-primary rounded-lg py-3 text-center text-xs sm:text-sm"
            >
              {billingPeriod === "monthly" ? "Trial · TV" : "Subscribe · TV"}
            </Link>
          </div>
          <p className="text-center text-xs text-muted/70">
            No commitment. Cancel anytime.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <Link
            href={signupUrl}
            className="btn-primary block rounded-lg py-3 text-center text-sm"
          >
            {trialLabel}
          </Link>
          <p className="text-center text-xs text-muted/70">
            No commitment. Cancel anytime.
          </p>
        </div>
      )}
    </div>
  );

  if (highlighted) {
    return (
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-flux-green/60 via-flux-green/20 to-transparent shadow-[0_0_40px_rgba(57,255,20,0.15)]">
        {card}
      </div>
    );
  }

  return card;
}

function ComparisonTable() {
  const cols = [
    { label: "Indicators", sub: "Single Platform" },
    { label: "Indicators", sub: "Both Platforms" },
    { label: "Strategies", sub: "Single Platform", border: true },
    { label: "Strategies", sub: "Both Platforms", highlight: true, border: true },
  ];

  const rows: {
    feature: string;
    values: ("check" | "x" | string)[];
    highlightLast?: boolean;
  }[] = [
    {
      feature: "Access to all indicators",
      values: ["check", "check", "check", "check"],
    },
    {
      feature: "Platform access",
      values: ["Single", "Both Platforms", "Single", "Both Platforms"],
    },
    {
      feature: "Access to automated strategies",
      values: ["x", "x", "Strategies", "Strategies"],
    },
    {
      feature: "24/7 customer support",
      values: ["check", "check", "check", "check"],
    },
    {
      feature: "Direct access to new features",
      values: ["check", "check", "check", "check"],
    },
    {
      feature: "Priority updates",
      values: ["x", "x", "x", "Priority updates"],
      highlightLast: true,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-elevated">
            <th className="p-4 text-left font-semibold text-white">Features</th>
            {cols.map((col, i) => (
              <th
                key={i}
                className={`p-4 text-center font-semibold ${
                  col.highlight
                    ? "bg-[#39ff14]/10 text-white"
                    : "text-white"
                } ${col.border ? "border-l border-[#39ff14]/20" : ""}`}
              >
                {col.label}
                <br />
                <span className="text-xs font-normal text-muted">{col.sub}</span>
                {col.highlight && (
                  <>
                    <br />
                    <span className="mt-1 inline-block text-xs font-bold text-[#39ff14]">
                      MOST POPULAR
                    </span>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.feature}
              className={
                rowIndex < rows.length - 1 ? "border-b border-border" : ""
              }
            >
              <td className="p-4 font-medium text-white">{row.feature}</td>
              {row.values.map((value, colIndex) => {
                const isHighlightCol = colIndex === 3;
                const cellClass = `p-4 text-center ${
                  colIndex >= 2 ? "border-l border-flux-green/20" : ""
                } ${isHighlightCol ? "bg-[#39ff14]/10" : ""}`;

                if (value === "check") {
                  return (
                    <td key={colIndex} className={cellClass}>
                      <CheckIcon className="mx-auto h-5 w-5 text-[#39ff14]" />
                    </td>
                  );
                }
                if (value === "x") {
                  return (
                    <td key={colIndex} className={cellClass}>
                      <XIcon className="mx-auto h-5 w-5 text-muted/40" />
                    </td>
                  );
                }
                if (value === "Strategies" || value === "Priority updates") {
                  return (
                    <td key={colIndex} className={cellClass}>
                      <span className="chip px-3 py-1">
                        {value}
                      </span>
                    </td>
                  );
                }
                if (value === "Both Platforms") {
                  return (
                    <td key={colIndex} className={cellClass}>
                      <span className="chip px-3 py-1">
                        Both Platforms
                      </span>
                    </td>
                  );
                }
                return (
                  <td key={colIndex} className={`${cellClass} text-muted`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingContent() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");

  const periods: { key: BillingPeriod; label: string; badge?: string }[] = [
    { key: "monthly", label: "Monthly" },
    { key: "quarterly", label: "Quarterly", badge: "Save 10%" },
    { key: "yearly", label: "Yearly", badge: "Save 17%" },
  ];

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
            Choose your plan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Unlock the full potential of FluxTrade with our tailored plans.{" "}
            <span className="font-semibold text-[#39ff14]">
              Monthly plans include a 30-day free trial!
            </span>
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
                    ? "bg-[#39ff14] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {period.label}
                {period.badge && billingPeriod !== period.key && (
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

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted">
            Automated Strategies
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <PlanCard
              title="Automated Strategies"
              subtitle="Single Platform"
              monthlyPrice={PRICING.MONTHLY.STRATEGIES_SINGLE}
              planKey="STRATEGIES_SINGLE"
              features={[
                "Includes indicators for chosen platform",
                "Access to all automated strategies",
                "Direct access to new features",
              ]}
              badges={["Automated Strategies"]}
              billingPeriod={billingPeriod}
              currency={currency}
            />
            <PlanCard
              title="Automated Strategies"
              subtitle="Both Platforms"
              monthlyPrice={PRICING.MONTHLY.STRATEGIES_NT_AND_TV}
              planKey="STRATEGIES_NT_AND_TV"
              features={[
                "Includes indicators for both platforms",
                "NinjaTrader and TradingView",
                "Access to all automated strategies",
              ]}
              badges={["Automated Strategies", "Both Platforms", "Priority Updates"]}
              highlighted
              mostPopular
              billingPeriod={billingPeriod}
              currency={currency}
            />
          </div>

          <p className="mb-6 mt-12 text-center text-sm font-semibold uppercase tracking-widest text-muted">
            Indicators
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <PlanCard
              title="Indicators"
              subtitle="Single Platform"
              monthlyPrice={PRICING.MONTHLY.INDICATORS_SINGLE}
              planKey="INDICATORS_SINGLE"
              features={[
                "Access to all our indicators",
                "24/7 customer support",
                "Cancel anytime",
              ]}
              billingPeriod={billingPeriod}
              currency={currency}
            />
            <PlanCard
              title="Indicators"
              subtitle="Both Platforms"
              monthlyPrice={PRICING.MONTHLY.INDICATORS_NT_AND_TV}
              planKey="INDICATORS_NT_AND_TV"
              features={[
                "Access to all our indicators",
                "NinjaTrader and TradingView",
                "Cancel anytime",
              ]}
              badges={["Both Platforms"]}
              billingPeriod={billingPeriod}
              currency={currency}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold italic text-white sm:text-3xl">
            Compare plans & features
          </h2>
          <ComparisonTable />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold italic text-white sm:text-3xl">
            Not sure which plan fits?
          </h2>
          <p className="mt-4 text-muted">
            Start with a free 30-day trial on any monthly plan. Explore every
            strategy and indicator before you commit.
          </p>
          <Link
            href="https://fluxtrade.net/signup"
            className="btn-primary mt-8 px-10 py-4 text-base"
          >
            Start free trial
          </Link>
        </div>
      </section>
    </>
  );
}
