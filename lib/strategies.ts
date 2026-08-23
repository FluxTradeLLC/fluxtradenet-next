/** Strategy keys hidden from public website UI (pricing, backtests, downloads, etc.). */
export const HIDDEN_STRATEGY_KEYS = ["ORMS"] as const;

/** Backtest / settings slugs hidden from public website UI. */
export const HIDDEN_BACKTEST_SLUGS = ["orms"] as const;

export function isHiddenStrategyKey(key: string): boolean {
  return (HIDDEN_STRATEGY_KEYS as readonly string[]).includes(key);
}

export function isHiddenBacktestSlug(slug: string): boolean {
  return (HIDDEN_BACKTEST_SLUGS as readonly string[]).includes(slug.toLowerCase());
}
