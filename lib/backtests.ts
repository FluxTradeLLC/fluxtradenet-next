export const BACKTEST_FILES = [
  "hydra.csv",
  "ignition.csv",
  "kraken.csv",
  // "orms.csv",
] as const;

export const BACKTEST_SLUGS: Record<string, string> = {
  hydra: "hydra.csv",
  ignition: "ignition.csv",
  kraken: "kraken.csv",
  // orms: "orms.csv",
};

export const SETTINGS_FILES: Record<string, string> = {
  hydra: "hydra-settings.csv",
  ignition: "ignition-settinga.csv",
  kraken: "kraken-settings.csv",
  // orms: "orms-settings.csv",
};

export type SettingsRow = {
  item: string;
  value: string;
};

export type SettingsSection = {
  title: string;
  rows: SettingsRow[];
};

export type BacktestCurrency =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "CAD"
  | "AUD"
  | "CHF"
  | "CNY";

export const CURRENCY_RATES: Record<BacktestCurrency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
};

export const CURRENCY_SYMBOLS: Record<BacktestCurrency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF ",
  CNY: "¥",
};

export type TradeRow = {
  strategy: string;
  profit: number;
  cumProfit: number;
  entryTime: Date | null;
  exitTime: Date | null;
  entryPrice: number | null;
  exitPrice: number | null;
  quantity: number | null;
  direction: string | null;
  session: string;
  instrument: string;
  "Trade number"?: string;
  "Entry time"?: string;
  "Exit time"?: string;
  [key: string]: string | number | Date | null | undefined;
};

export function getCsvFilename(slug: string): string | undefined {
  return BACKTEST_SLUGS[slug];
}

export function getSettingsFilename(strategy: string): string | undefined {
  return SETTINGS_FILES[strategy];
}

export function parseSettingsRows(
  rows: Record<string, string>[]
): SettingsSection[] {
  const sections: SettingsSection[] = [];
  let current: SettingsSection = { title: "", rows: [] };

  for (const row of rows) {
    const item = (row.Item || row.item || "").trim();
    const value = (row.Value || row.value || "").trim();
    if (!item) continue;

    if (!value) {
      if (current.title || current.rows.length > 0) {
        sections.push(current);
      }
      current = { title: item, rows: [] };
      continue;
    }

    current.rows.push({ item, value });
  }

  if (current.title || current.rows.length > 0) {
    sections.push(current);
  }

  return sections;
}

export function slugToDisplayName(slug: string): string {
  const file = BACKTEST_SLUGS[slug];
  if (!file) return slug;
  return toTitleCase(file.replace(".csv", ""));
}

export function parseCurrency(str: string | undefined): number {
  if (!str || str === "") return 0;
  const cleaned = str.replace(/[$,()]/g, "");
  const num = parseFloat(cleaned);
  return str.includes("(") ? -num : num;
}

export function formatNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getSession(timeStr: string | undefined): string {
  if (!timeStr) return "Unknown";
  try {
    const timeMatch = timeStr.match(/(\d{1,2}):\d{2}/);
    if (!timeMatch) return "Unknown";

    let hour = parseInt(timeMatch[1], 10);
    const isPM = timeStr.toUpperCase().includes("PM");

    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    if (hour >= 9 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 16) return "Afternoon";
    if (hour >= 16 && hour < 20) return "Evening";
    return "Night";
  } catch {
    return "Unknown";
  }
}

export function parseDate(timeStr: string | undefined): Date | null {
  if (!timeStr) return null;
  try {
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
}

export function parsePrice(str: string | undefined): number | null {
  if (!str || str === "") return null;
  const cleaned = str.replace(/[$,()]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export function parseQuantity(str: string | undefined): number | null {
  if (!str || str === "") return null;
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

export function getTradeDirection(marketPos: string | undefined): string | null {
  if (!marketPos) return null;
  const pos = marketPos.toString().toLowerCase();
  if (pos.includes("long")) return "Long";
  if (pos.includes("short")) return "Short";
  return marketPos;
}

export function formatTimestamp(date: Date | null): string {
  if (!date) return "";
  try {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

export function toTitleCase(str: string): string {
  if (!str || str === "All") return str;
  const withSpaces = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return withSpaces
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatBacktestCurrency(
  usdAmount: number,
  currency: BacktestCurrency
): string {
  if (usdAmount === null || usdAmount === undefined || isNaN(usdAmount))
    return "0.00";
  const converted = usdAmount * CURRENCY_RATES[currency];
  return `${CURRENCY_SYMBOLS[currency]}${formatNumber(converted)}`;
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || isNaN(price)) return "N/A";
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export const TABLE_HEADERS: Record<string, string> = {
  "Trade number": "Trade number",
  Instrument: "Instrument",
  Account: "Account",
  Strategy: "Strategy",
  "Market pos.": "Market pos.",
  Qty: "Qty",
  "Entry price": "Entry price",
  "Exit price": "Exit price",
  "Entry time": "Entry time",
  "Exit time": "Exit time",
  "Entry name": "Entry name",
  "Exit name": "Exit name",
  Profit: "Profit",
  "Cum. net profit": "Cum. net profit",
  Commission: "Commission",
  "Clearing Fee": "Clearing Fee",
  "Exchange Fee": "Exchange Fee",
  "IP Fee": "IP Fee",
  "NFA Fee": "NFA Fee",
  MAE: "MAE",
  MFE: "MFE",
  ETD: "ETD",
  Bars: "Bars",
};

export const ENTRY_NAMES: Record<string, string> = {
  Buy: "Buy",
  Sell: "Sell",
  "Sell short": "Sell short",
  ShortABC: "Short ABC",
  FluxLong: "Flux Long",
  ShortKraken: "Short Kraken",
  "Short Breakdown": "Short Breakdown",
  "Long Breakout": "Long Breakout",
};

export const EXIT_NAMES: Record<string, string> = {
  Sell: "Sell",
  StopLoss: "Stop Loss",
  "Stop loss": "Stop Loss",
  TakeProfit1: "Take Profit 1",
  TakeProfit2: "Take Profit 2",
  TakeProfit3: "Take Profit 3",
  TakeProfit4: "Take Profit 4",
  "Profit target": "Profit Target",
  "Buy to cover": "Buy to Cover",
};

export function translateCellValue(header: string, cellValue: string): string {
  if (header === "Market pos." && (cellValue === "Long" || cellValue === "Short")) {
    return cellValue;
  }
  if (header === "Entry name" && cellValue) {
    return ENTRY_NAMES[cellValue] ?? cellValue;
  }
  if (header === "Exit name" && cellValue) {
    let exitKey = cellValue.trim();
    if (exitKey === "StopLoss") exitKey = "Stop loss";
    return EXIT_NAMES[exitKey] ?? cellValue;
  }
  return cellValue;
}

export function parseTradeRows(
  rows: Record<string, string>[],
  strategyName: string
): TradeRow[] {
  return rows
    .filter((row) => row["Trade number"] && row["Entry time"])
    .map((row) => ({
      ...row,
      strategy: strategyName,
      profit: parseCurrency(row.Profit || row["Profit"]),
      cumProfit: parseCurrency(row["Cum. net profit"] || row["Cum net profit"]),
      entryTime: parseDate(row["Entry time"] || row["Entry Time"]),
      exitTime: parseDate(row["Exit time"] || row["Exit Time"]),
      entryPrice: parsePrice(row["Entry price"] || row["Entry Price"]),
      exitPrice: parsePrice(row["Exit price"] || row["Exit Price"]),
      quantity: parseQuantity(row.Qty || row["Qty"]),
      direction: getTradeDirection(
        row["Market pos."] || row["Market pos"] || row["Market position"]
      ),
      session: getSession(row["Entry time"] || row["Entry Time"]),
      instrument: row.Instrument || row["Instrument"] || "",
    }));
}
