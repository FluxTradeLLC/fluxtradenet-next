import Link from "next/link";
import { toTitleCase, type SettingsSection } from "@/lib/backtests";
import { contentLinkClass } from "@/lib/content-ui";
import { getStrategySettingsHref } from "@/lib/strategy-settings";
import { s } from "@/lib/strings";

type BacktestStrategySettingsProps = {
  strategy: string;
  sections: SettingsSection[];
};

export function BacktestStrategySettings({
  strategy,
  sections,
}: BacktestStrategySettingsProps) {
  if (sections.length === 0) return null;

  return (
    <details className="group glass-card rounded-2xl p-6 open:pb-6 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {toTitleCase(strategy)} Strategy Settings
          </h2>
          <p className="mt-1 text-sm text-muted">
            Parameters used for this backtest run
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="mt-6 space-y-6 border-t border-border pt-6">
        {sections.map((section, sectionIndex) => (
          <div key={`${sectionIndex}-${section.title || section.rows[0]?.item}`}>
            {section.title ? (
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#02C064]">
                {section.title}
              </h3>
            ) : null}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <tbody>
                  {section.rows.map((row, rowIndex) => (
                    <tr
                      key={`${sectionIndex}-${rowIndex}-${row.item}`}
                      className="border-b border-border/60 last:border-b-0"
                    >
                      <td className="whitespace-nowrap py-2 pr-6 align-top text-muted">
                        {row.item}
                      </td>
                      <td className="py-2 text-right font-medium text-white sm:text-left">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <p className="pt-2">
          <Link
            href={getStrategySettingsHref(strategy)}
            className={contentLinkClass}
          >
            {s("strategySettings.backtestLink", {
              strategy: toTitleCase(strategy),
            })}
          </Link>
        </p>
      </div>
    </details>
  );
}
