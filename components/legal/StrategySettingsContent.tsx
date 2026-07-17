"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import { contentBodyClass } from "@/lib/content-ui";
import {
  formatConstraints,
  formatDefaultValue,
  formatPossibleValues,
  isStrategySettingsSlug,
  sortProperties,
  STRATEGY_SETTINGS_FILES,
  type StrategySettingsDoc,
  type StrategySettingsSlug,
} from "@/lib/strategy-settings";
import { s } from "@/lib/strings";

type StrategySettingsContentProps = {
  docs: StrategySettingsDoc[];
};

export function StrategySettingsContent({ docs }: StrategySettingsContentProps) {
  const searchParams = useSearchParams();
  const strategyParam = searchParams.get("strategy");

  const docsBySlug = useMemo(() => {
    const map = new Map<StrategySettingsSlug, StrategySettingsDoc>();
    STRATEGY_SETTINGS_FILES.forEach(({ slug }, index) => {
      map.set(slug, docs[index]);
    });
    return map;
  }, [docs]);

  const [selectedSlug, setSelectedSlug] = useState<StrategySettingsSlug>(() => {
    if (strategyParam && isStrategySettingsSlug(strategyParam)) {
      return strategyParam;
    }
    return "hydra";
  });
  const selectedDoc = docsBySlug.get(selectedSlug);

  return (
    <ContentPageLayout
      label={s("strategySettings.label")}
      title={s("strategySettings.title")}
      description={s("strategySettings.description")}
      maxWidth="max-w-6xl"
      centered={false}
    >
      <div className="flex flex-wrap gap-2">
        {STRATEGY_SETTINGS_FILES.map(({ slug, label }) => (
          <button
            key={slug}
            type="button"
            onClick={() => setSelectedSlug(slug)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedSlug === slug
                ? "border-flux-green/50 bg-flux-green/10 text-flux-green"
                : "border-border text-muted hover:border-flux-green/30 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {selectedDoc ? (
        <div className="mt-8 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">{selectedDoc.strategy}</h2>
            <p className={`${contentBodyClass} mt-3`}>{selectedDoc.description}</p>
            <p className="mt-4 text-xs text-muted/70">
              {s("strategySettings.sourceFile")}:{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 text-muted">
                {selectedDoc.sourceFile}
              </code>
            </p>
          </div>

          <div className="space-y-4">
            {selectedDoc.parameterGroups.map((group) => {
              const properties = sortProperties(group.properties);
              if (properties.length === 0) return null;

              return (
                <details
                  key={group.name}
                  className="group glass-card rounded-2xl p-6 open:pb-6 [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {properties.length}{" "}
                        {properties.length === 1
                          ? s("strategySettings.property")
                          : s("strategySettings.properties")}
                      </p>
                    </div>
                    <svg
                      className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>

                  <div className="mt-6 overflow-x-auto border-t border-border pt-6">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                          <th className="pb-3 pr-4 font-semibold">
                            {s("strategySettings.table.property")}
                          </th>
                          <th className="pb-3 pr-4 font-semibold">
                            {s("strategySettings.table.type")}
                          </th>
                          <th className="pb-3 pr-4 font-semibold">
                            {s("strategySettings.table.default")}
                          </th>
                          <th className="pb-3 pr-4 font-semibold">
                            {s("strategySettings.table.range")}
                          </th>
                          <th className="pb-3 font-semibold">
                            {s("strategySettings.table.description")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((property) => {
                          const constraints = formatConstraints(property.constraints);
                          const possibleValues = formatPossibleValues(
                            property.possibleValues,
                          );
                          const range =
                            constraints ??
                            possibleValues ??
                            (property.format ? property.format : "—");

                          return (
                            <tr
                              key={property.property}
                              className="border-b border-border/60 align-top last:border-b-0"
                            >
                              <td className="py-3 pr-4">
                                <div className="font-medium text-white">
                                  {property.displayName}
                                </div>
                                <div className="mt-1 font-mono text-xs text-muted/70">
                                  {property.property}
                                </div>
                              </td>
                              <td className="whitespace-nowrap py-3 pr-4 text-muted">
                                {property.type}
                                {property.enumType ? (
                                  <div className="mt-1 text-xs text-muted/70">
                                    {property.enumType}
                                  </div>
                                ) : null}
                              </td>
                              <td className="whitespace-nowrap py-3 pr-4 font-medium text-white">
                                {formatDefaultValue(property.default)}
                              </td>
                              <td className="py-3 pr-4 text-muted">{range}</td>
                              <td className="py-3 text-muted">
                                {property.description ?? "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      ) : null}
    </ContentPageLayout>
  );
}
