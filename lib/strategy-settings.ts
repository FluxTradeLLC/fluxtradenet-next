import { isHiddenBacktestSlug } from "@/lib/strategies";

export const STRATEGY_SETTINGS_FILES = [
  { slug: "hydra", file: "Hydra.json", label: "Hydra" },
  { slug: "cerberus", file: "Cerberus.json", label: "Cerberus" },
  { slug: "kraken", file: "Kraken.json", label: "Kraken" },
  { slug: "orms", file: "ORMS.json", label: "ORMS" },
] as const;

export const VISIBLE_STRATEGY_SETTINGS_FILES = STRATEGY_SETTINGS_FILES.filter(
  ({ slug }) => !isHiddenBacktestSlug(slug),
).sort((a, b) => a.label.localeCompare(b.label));

export type StrategySettingsSlug =
  (typeof STRATEGY_SETTINGS_FILES)[number]["slug"];

export function isStrategySettingsSlug(
  slug: string,
): slug is StrategySettingsSlug {
  return VISIBLE_STRATEGY_SETTINGS_FILES.some((entry) => entry.slug === slug);
}

export function getStrategySettingsHref(slug: string): string {
  if (isStrategySettingsSlug(slug)) {
    return `/strategy-settings?strategy=${slug}`;
  }
  return "/strategy-settings";
}

export const UNIRENKO_ECOSYSTEM_URL =
  "https://ninjatraderecosystem.com/user-app-share-download/unirenko-universal-renko-bartype-8/";

export type StrategyDataSeries =
  | {
      barType: "unirenko";
      detail: string;
      instrument: string;
    }
  | {
      barType: "minute";
      period: number;
      instrument: string;
    };

export const STRATEGY_DATA_SERIES: Partial<
  Record<StrategySettingsSlug, StrategyDataSeries>
> = {
  hydra: {
    barType: "unirenko",
    detail: "7 Tick Trend, 12 Open Offset, 31 Tick Reversal",
    instrument: "MNQ",
  },
  kraken: {
    barType: "unirenko",
    detail: "7 Tick Trend, 11 Open Offset, 31 Tick Reversal",
    instrument: "MNQ",
  },
  cerberus: {
    barType: "minute",
    period: 1,
    instrument: "MNQ",
  },
};

export type PropertyConstraints = {
  min?: number | null;
  max?: number | null;
};

export type EnumValue = {
  name: string;
  value: string;
  description?: string;
};

export type StrategyProperty = {
  property: string;
  displayName: string;
  description?: string;
  order: number;
  type: string;
  enumType?: string;
  format?: string;
  possibleValues?: boolean[] | EnumValue[] | string[] | number[];
  constraints?: PropertyConstraints;
  default?: unknown;
};

export type ParameterGroup = {
  name: string;
  properties: StrategyProperty[];
};

export type StrategySettingsDoc = {
  strategy: string;
  className: string;
  description: string;
  sourceFile: string;
  parameterGroups: ParameterGroup[];
};

export function formatDefaultValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "string") return value === "" ? "(empty)" : value;
  if (typeof value === "number") return String(value);
  return String(value);
}

export function formatConstraints(
  constraints?: PropertyConstraints,
): string | null {
  if (!constraints) return null;

  const parts: string[] = [];
  if (constraints.min !== undefined && constraints.min !== null) {
    parts.push(`min ${constraints.min}`);
  }
  if (constraints.max !== undefined && constraints.max !== null) {
    parts.push(`max ${constraints.max}`);
  }

  return parts.length > 0 ? parts.join(", ") : null;
}

export function formatPossibleValues(
  possibleValues: StrategyProperty["possibleValues"],
): string | null {
  if (!possibleValues || possibleValues.length === 0) return null;

  if (typeof possibleValues[0] === "boolean") {
    return "True / False";
  }

  if (
    typeof possibleValues[0] === "object" &&
    possibleValues[0] !== null &&
    "name" in possibleValues[0]
  ) {
    return (possibleValues as EnumValue[])
      .map((entry) => entry.name)
      .join(", ");
  }

  return possibleValues.map(String).join(", ");
}

export function sortProperties(properties: StrategyProperty[]): StrategyProperty[] {
  return [...properties].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.displayName.localeCompare(b.displayName);
  });
}

function parseSemicolonEnumDescriptions(
  description?: string,
): Record<string, string> | null {
  if (!description?.includes(" = ")) return null;

  const result: Record<string, string> = {};
  for (const part of description.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const eqIndex = trimmed.indexOf(" = ");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 3).trim();
    if (key && value) result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : null;
}

export function getEnumValuesWithDescriptions(
  property: StrategyProperty,
): EnumValue[] | null {
  const possibleValues = property.possibleValues;
  if (!possibleValues?.length) return null;

  const first = possibleValues[0];
  if (typeof first !== "object" || first === null || !("name" in first)) {
    return null;
  }

  const enumValues = possibleValues as EnumValue[];
  if (enumValues.some((entry) => entry.description)) {
    return enumValues;
  }

  const parsed = parseSemicolonEnumDescriptions(property.description);
  if (!parsed) return null;

  return enumValues.map((entry) => ({
    ...entry,
    description: parsed[entry.name] ?? parsed[entry.value] ?? "—",
  }));
}
