"use client";

import Link from "next/link";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { TABLE_HEADERS, translateCellValue } from "@/lib/backtests";

type BacktestContentProps = {
  file: string;
  displayName: string;
};

export function BacktestContent({ file, displayName }: BacktestContentProps) {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [file]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/backtests/${file}`);
        const csv = await response.text();

        if (cancelled) return;

        Papa.parse<Record<string, string>>(csv, {
          header: true,
          complete: (results) => {
            if (cancelled) return;
            setHeaders(results.meta.fields ?? []);
            setData(results.data);
            setLoading(false);
          },
        });
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [file]);

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="label-accent text-sm">Backtest Results</p>
          <h1 className="mt-3 text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
            {displayName}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href={`/backtests/${file}`}
              download
              className="inline-flex items-center gap-2 font-medium text-[#39ff14] transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CSV
            </a>
            <Link
              href="/backtests/explorer"
              className="inline-flex items-center gap-2 font-medium text-muted transition-colors hover:text-[#39ff14]"
            >
              Backtest Explorer
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium text-muted transition-colors hover:text-[#39ff14]"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="glass-card flex min-h-[320px] items-center justify-center rounded-2xl">
            <p className="text-muted">Loading backtest data…</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      {TABLE_HEADERS[header] ?? header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/60 transition-colors hover:bg-surface-elevated/50"
                  >
                    {headers.map((header) => {
                      const raw = row[header] ?? "";
                      const cellValue = translateCellValue(header, raw);

                      return (
                        <td key={header} className="whitespace-nowrap px-5 py-4 text-white">
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
