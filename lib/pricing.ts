export type BillingPeriod = "monthly" | "quarterly" | "yearly";
export type PlanKey = "STRATEGY";

export const PRICING = {
  MONTHLY: {
    STRATEGY: 99,
  },
  QUARTERLY: {
    STRATEGY: 265,
  },
  YEARLY: {
    STRATEGY: 990,
  },
} as const;

export const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
} as const;

export type Currency = keyof typeof CURRENCY_RATES;

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF ",
  CNY: "¥",
};

export const CURRENCY_FLAGS: Record<Currency, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
};

const BILLING_PERIOD_LABELS: Record<BillingPeriod, string> = {
  monthly: "/mo",
  quarterly: "/qtr",
  yearly: "/yr",
};

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getPriceForPlan(
  planKey: PlanKey,
  monthlyPrice: number,
  billingPeriod: BillingPeriod
): number {
  if (billingPeriod === "monthly") return monthlyPrice;

  const periodKey = billingPeriod.toUpperCase() as keyof typeof PRICING;
  const setPrice = PRICING[periodKey][planKey];

  if (setPrice && setPrice > 0) return setPrice;

  const multiplier = billingPeriod === "quarterly" ? 3 : 12;
  const discount = billingPeriod === "quarterly" ? 0.1 : 0.17;
  return monthlyPrice * multiplier * (1 - discount);
}

export function formatCurrency(
  usdAmount: number,
  currency: Currency,
  showUsdInParentheses = false
): string {
  const converted = usdAmount * CURRENCY_RATES[currency];
  const rounded = Math.round(converted);
  const formatted = formatNumber(rounded);
  const symbol = CURRENCY_SYMBOLS[currency];

  if (showUsdInParentheses && currency !== "USD") {
    const usdFormatted = formatNumber(Math.round(usdAmount));
    return `${symbol}${formatted} ($${usdFormatted})`;
  }

  return `${symbol}${formatted}`;
}

export function getBillingPeriodLabel(billingPeriod: BillingPeriod): string {
  return BILLING_PERIOD_LABELS[billingPeriod];
}

export function getDiscountPercent(
  monthlyPrice: number,
  billingPeriod: BillingPeriod,
  planKey: PlanKey
): number {
  const multiplier = billingPeriod === "quarterly" ? 3 : 12;
  const basePrice = monthlyPrice * multiplier;
  const actualPrice = getPriceForPlan(planKey, monthlyPrice, billingPeriod);
  return ((basePrice - actualPrice) / basePrice) * 100;
}
