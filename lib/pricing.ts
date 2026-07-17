export type BillingPeriod = "monthly" | "quarterly" | "yearly";
export type PlanKey = "STRATEGY";
export type StrategyKey = "HYDRA" | "KRAKEN" | "IGNITION" | "ORMS";

export const STRATEGY_KEYS: StrategyKey[] = [
  "HYDRA",
  "KRAKEN",
  "IGNITION",
  "ORMS",
];

export const STRATEGY_NAME_TO_KEY: Record<string, StrategyKey> = {
  Hydra: "HYDRA",
  Ignition: "IGNITION",
  ORMS: "ORMS",
  Kraken: "KRAKEN",
};

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

export const STRIPE_PRICE_IDS = {
  LOCAL: {
    MONTHLY: {
      HYDRA: "price_1Tu0dKDHqntRcM5iI8rIA9Sx",
      KRAKEN: "price_1Tu0d0DHqntRcM5i6mVv7r4k",
      IGNITION: "price_1Tu0dXDHqntRcM5iyFoNfoax",
      ORMS: "price_1Tu0djDHqntRcM5iZw8nDUzv"
    },
    QUARTERLY: {
      HYDRA: "price_1Tu0elDHqntRcM5iaQ1oRPiR",
      KRAKEN: "price_1Tu0eGDHqntRcM5i4jIagthy",
      IGNITION: "price_1Tu0f1DHqntRcM5iCTMUOyuD",
      ORMS: "price_1Tu0fKDHqntRcM5iSGXIjkPq"
    },
    YEARLY: {
      HYDRA: "price_1Tu0esDHqntRcM5iLhauZu7v",
      KRAKEN: "price_1Tu0eQDHqntRcM5iMsV5AtW2",
      IGNITION: "price_1Tu0f9DHqntRcM5iAfl18QDg",
      ORMS: "price_1Tu0fSDHqntRcM5i5j1EF0HB"
    }
  },
  PRODUCTION: {
    MONTHLY: {
      HYDRA: "price_1Tu0lLDHqntRcM5i1p9fwD8t",
      KRAKEN: "price_1Tu0lIDHqntRcM5iWFvcmiST",
      IGNITION: "price_1Tu0lMDHqntRcM5iJbHIcUiQ",
      ORMS: "price_1Tu0lNDHqntRcM5i9SlN91I7"
    },
    QUARTERLY: {
      HYDRA: "price_1Tu0lLDHqntRcM5ijNndAMg7",
      KRAKEN: "price_1Tu0lIDHqntRcM5ioEjAXouI",
      IGNITION: "price_1Tu0lMDHqntRcM5ieX72NfcH",
      ORMS: "price_1Tu0lNDHqntRcM5i4yEiVh3t"
    },
    YEARLY: {
      HYDRA: "price_1Tu0lIDHqntRcM5iM6WX9wUO",
      KRAKEN: "price_1Tu0eQDHqntRcM5iMsV5AtW2",
      IGNITION: "price_1Tu0lMDHqntRcM5idXWBeE53",
      ORMS: "price_1Tu0lNDHqntRcM5i9Q3bm1Yn"
    }
  }
}

export function getStripeEnv(): "LOCAL" | "PRODUCTION" {
  return process.env.NEXT_PUBLIC_STRIPE_ENV === "PRODUCTION"
    ? "PRODUCTION"
    : "LOCAL";
}

export function getPriceIdForStrategy(
  strategyKey: StrategyKey,
  billingPeriod: BillingPeriod,
): string {
  const periodKey = billingPeriod.toUpperCase() as keyof typeof STRIPE_PRICE_IDS.LOCAL;
  return STRIPE_PRICE_IDS[getStripeEnv()][periodKey][strategyKey];
}

export function getPriceForSelectedStrategies(
  strategyKeys: StrategyKey[],
  billingPeriod: BillingPeriod,
): number {
  const monthlyPrice = PRICING.MONTHLY.STRATEGY;
  const perStrategyPrice = getPriceForPlan(
    "STRATEGY",
    monthlyPrice,
    billingPeriod,
  );

  return perStrategyPrice * strategyKeys.length;
}

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
