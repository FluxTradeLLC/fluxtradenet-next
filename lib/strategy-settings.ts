export const STRATEGY_SETTINGS_FILES = [
  { slug: "hydra", file: "Hydra.json", label: "Hydra" },
  { slug: "ignition", file: "Ignition.json", label: "Ignition" },
  { slug: "kraken", file: "Kraken.json", label: "Kraken" },
  // { slug: "orms", file: "ORMS.json", label: "ORMS" },
] as const;

export type StrategySettingsSlug =
  (typeof STRATEGY_SETTINGS_FILES)[number]["slug"];

export function isStrategySettingsSlug(
  slug: string,
): slug is StrategySettingsSlug {
  return STRATEGY_SETTINGS_FILES.some((entry) => entry.slug === slug);
}

export function getStrategySettingsHref(slug: string): string {
  if (isStrategySettingsSlug(slug)) {
    return `/strategy-settings?strategy=${slug}`;
  }
  return "/strategy-settings";
}

export type PropertyConstraints = {
  min?: number | null;
  max?: number | null;
};

export type EnumValue = {
  name: string;
  value: string;
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
