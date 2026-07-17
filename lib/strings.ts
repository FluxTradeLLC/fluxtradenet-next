import strings from "@/strings/en.json";

function getNested(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`,
  );
}

type StringOptions = {
  defaultValue?: string;
  returnObjects?: boolean;
} & Record<string, string | number | boolean | undefined>;

export function s(key: string, options: StringOptions = {}): string {
  const { defaultValue, returnObjects, ...vars } = options;
  const value = getNested(strings as Record<string, unknown>, key);

  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    return key;
  }

  if (typeof value === "string") {
    return interpolate(value, vars as Record<string, string | number>);
  }

  if (returnObjects && (Array.isArray(value) || typeof value === "object")) {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return key;
}

export function getStrings() {
  return strings;
}
