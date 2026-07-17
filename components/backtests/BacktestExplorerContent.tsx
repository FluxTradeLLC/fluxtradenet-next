"use client";

import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BACKTEST_FILES,
  type BacktestCurrency,
  CURRENCY_RATES,
  CURRENCY_SYMBOLS,
  formatBacktestCurrency,
  formatNumber,
  formatPrice,
  formatTimestamp,
  getSettingsFilename,
  parseSettingsRows,
  parseTradeRows,
  toTitleCase,
  type SettingsSection,
  type TradeRow,
} from "@/lib/backtests";
import { BacktestStrategySettings } from "@/components/backtests/BacktestStrategySettings";

const selectClassName =
  "w-full rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm text-white transition-colors focus:border-[#39ff14]/50 focus:outline-none focus:ring-1 focus:ring-[#39ff14]/30";

function StatCard({
  label,
  value,
  valueClassName = "text-white",
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-muted sm:text-sm">
        {label}
      </div>
      <div className={`mt-1 text-xl font-bold sm:text-2xl ${valueClassName}`}>
        {value}
      </div>
    </div>
  );
}

export function BacktestExplorerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allData, setAllData] = useState<TradeRow[]>([]);
  const [settingsByStrategy, setSettingsByStrategy] = useState<
    Record<string, SettingsSection[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState("All");
  const [selectedInstrument, setSelectedInstrument] = useState("All");
  const [selectedSession, setSelectedSession] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState<BacktestCurrency>("USD");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const strategyParam = searchParams.get("strategy");
    if (strategyParam && allData.length > 0) {
      const strategies = [...new Set(allData.map((d) => d.strategy))];
      if (strategies.includes(strategyParam)) {
        setSelectedStrategy(strategyParam);
      }
    }
  }, [searchParams, allData]);

  useEffect(() => {
    let cancelled = false;

    const loadAllData = async () => {
      setLoading(true);
      const tradePromises = BACKTEST_FILES.map(async (file) => {
        try {
          const response = await fetch(`/backtests/${file}`);
          const csv = await response.text();

          return new Promise<TradeRow[]>((resolve) => {
            Papa.parse<Record<string, string>>(csv, {
              header: true,
              complete: (results) => {
                resolve(parseTradeRows(results.data, file.replace(".csv", "")));
              },
            });
          });
        } catch (error) {
          console.error(`Error loading ${file}:`, error);
          return [];
        }
      });

      const settingsPromises = BACKTEST_FILES.map(async (file) => {
        const strategy = file.replace(".csv", "");
        const settingsFile = getSettingsFilename(strategy);
        if (!settingsFile) return [strategy, []] as const;

        try {
          const response = await fetch(`/settings/${settingsFile}`);
          if (!response.ok) {
            console.error(`Error loading ${settingsFile}: ${response.status}`);
            return [strategy, []] as const;
          }

          const csv = await response.text();
          return new Promise<readonly [string, SettingsSection[]]>((resolve) => {
            Papa.parse<Record<string, string>>(csv, {
              header: true,
              complete: (results) => {
                resolve([strategy, parseSettingsRows(results.data)]);
              },
            });
          });
        } catch (error) {
          console.error(`Error loading ${settingsFile}:`, error);
          return [strategy, []] as const;
        }
      });

      const [tradeResults, settingsResults] = await Promise.all([
        Promise.all(tradePromises),
        Promise.all(settingsPromises),
      ]);

      if (!cancelled) {
        setAllData(tradeResults.flat());
        setSettingsByStrategy(Object.fromEntries(settingsResults));
        setLoading(false);
      }
    };

    loadAllData();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatCurrency = (usdAmount: number) =>
    formatBacktestCurrency(usdAmount, selectedCurrency);

  const strategies = useMemo(() => {
    const unique = [...new Set(allData.map((d) => d.strategy))].sort();
    return ["All", ...unique];
  }, [allData]);

  const instruments = useMemo(() => {
    const unique = [...new Set(allData.map((d) => d.instrument).filter(Boolean))].sort();
    return ["All", ...unique];
  }, [allData]);

  const sessions = useMemo(() => {
    const unique = [...new Set(allData.map((d) => d.session).filter(Boolean))].sort();
    return ["All", ...unique];
  }, [allData]);

  const filteredData = useMemo(() => {
    return allData.filter((row) => {
      if (selectedStrategy !== "All" && row.strategy !== selectedStrategy) return false;
      if (selectedInstrument !== "All" && row.instrument !== selectedInstrument) return false;
      if (selectedSession !== "All" && row.session !== selectedSession) return false;
      return true;
    });
  }, [allData, selectedStrategy, selectedInstrument, selectedSession]);

  const visibleSettingsStrategies = useMemo(() => {
    if (selectedStrategy !== "All") {
      return settingsByStrategy[selectedStrategy] ? [selectedStrategy] : [];
    }

    return BACKTEST_FILES.map((file) => file.replace(".csv", "")).filter(
      (strategy) => (settingsByStrategy[strategy]?.length ?? 0) > 0
    );
  }, [selectedStrategy, settingsByStrategy]);

  const equityCurveData = useMemo(() => {
    const sorted = [...filteredData]
      .filter((d) => d.entryTime && !isNaN(d.profit))
      .sort((a, b) => (a.entryTime!.getTime() - b.entryTime!.getTime()));

    if (sorted.length === 0) return [];

    const curve: {
      trade: number;
      equity: number;
      drawdown: number;
      profit: number;
    }[] = [];
    let runningProfit = 0;
    let peak = 0;

    sorted.forEach((row, index) => {
      if (row.cumProfit !== undefined && !isNaN(row.cumProfit)) {
        runningProfit = row.cumProfit;
      } else {
        runningProfit += row.profit;
      }

      peak = Math.max(peak, runningProfit);
      const drawdown = peak - runningProfit;

      curve.push({
        trade: index + 1,
        equity: runningProfit,
        drawdown,
        profit: row.profit,
      });
    });

    return curve;
  }, [filteredData]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalTrades: 0,
        winRate: "0",
        totalProfit: "0",
        avgWin: "0",
        avgLoss: "0",
        maxDrawdown: "0",
        profitFactor: "0",
        largestWin: "0",
        largestLoss: "0",
      };
    }

    const profits = filteredData.map((d) => d.profit).filter((p) => !isNaN(p));
    const winningTrades = profits.filter((p) => p > 0);
    const losingTrades = profits.filter((p) => p < 0);
    const totalProfit = profits.reduce((sum, p) => sum + p, 0);
    const totalWins = winningTrades.reduce((sum, p) => sum + p, 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, p) => sum + p, 0));
    const maxDrawdown = equityCurveData.reduce((max, d) => Math.max(max, d.drawdown), 0);

    return {
      totalTrades: filteredData.length,
      winRate: ((winningTrades.length / filteredData.length) * 100).toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      avgWin: winningTrades.length > 0 ? (totalWins / winningTrades.length).toFixed(2) : "0",
      avgLoss: losingTrades.length > 0 ? (totalLosses / losingTrades.length).toFixed(2) : "0",
      maxDrawdown: maxDrawdown.toFixed(2),
      profitFactor: totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : "N/A",
      largestWin: winningTrades.length > 0 ? Math.max(...winningTrades).toFixed(2) : "0",
      largestLoss: losingTrades.length > 0 ? Math.min(...losingTrades).toFixed(2) : "0",
    };
  }, [filteredData, equityCurveData]);

  const profitDistribution = useMemo(() => {
    const profits = filteredData.map((d) => d.profit).filter((p) => !isNaN(p));
    if (profits.length === 0) return [];

    const min = Math.min(...profits);
    const max = Math.max(...profits);
    const range = max - min;
    const bins = 20;
    const binSize = range / bins;

    const distribution = Array.from({ length: bins }, (_, i) => {
      const binMin = min + i * binSize;
      const binMax = min + (i + 1) * binSize;
      const convertedMin = binMin * CURRENCY_RATES[selectedCurrency];
      const convertedMax = binMax * CURRENCY_RATES[selectedCurrency];
      const symbol = CURRENCY_SYMBOLS[selectedCurrency];
      return {
        range: `${symbol}${formatNumber(convertedMin)} - ${symbol}${formatNumber(convertedMax)}`,
        count: 0,
      };
    });

    profits.forEach((profit) => {
      const binIndex = Math.min(Math.floor((profit - min) / binSize), bins - 1);
      if (binIndex >= 0) distribution[binIndex].count++;
    });

    return distribution;
  }, [filteredData, selectedCurrency]);

  const updateStrategy = (newStrategy: string) => {
    setSelectedStrategy(newStrategy);
    const params = new URLSearchParams(searchParams.toString());
    if (newStrategy === "All") {
      params.delete("strategy");
    } else {
      params.set("strategy", newStrategy);
    }
    const query = params.toString();
    router.replace(query ? `/backtests/explorer?${query}` : "/backtests/explorer", {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center pt-28">
        <p className="text-lg text-muted">Loading backtest data…</p>
      </section>
    );
  }

  const chartTooltipStyle = {
    backgroundColor: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 glow-orb opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="label-accent text-sm">Performance Analysis</p>
          <h1 className="mt-3 text-3xl font-bold italic tracking-tight text-white sm:text-4xl lg:text-5xl">
            Backtest Explorer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Interactive analysis of backtest results. Filter by strategy, instrument, and session.
          </p>
        </div>

        <div className="glass-card mb-8 rounded-2xl p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-muted">Strategy</label>
              <select
                value={selectedStrategy}
                onChange={(e) => updateStrategy(e.target.value)}
                className={selectClassName}
              >
                {strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy === "All" ? "All" : toTitleCase(strategy)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-muted">Instrument</label>
              <select
                value={selectedInstrument}
                onChange={(e) => setSelectedInstrument(e.target.value)}
                className={selectClassName}
              >
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-muted">Session</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className={selectClassName}
              >
                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-muted">Currency</label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as BacktestCurrency)}
                className={selectClassName}
              >
                {Object.keys(CURRENCY_RATES).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {visibleSettingsStrategies.length > 0 && (
          <div className="mb-8 space-y-4">
            {visibleSettingsStrategies.map((strategy) => (
              <BacktestStrategySettings
                key={strategy}
                strategy={strategy}
                sections={settingsByStrategy[strategy] ?? []}
              />
            ))}
          </div>
        )}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard label="Total Trades" value={stats.totalTrades.toLocaleString()} />
          <StatCard label="Win Rate" value={`${stats.winRate}%`} valueClassName="text-[#39ff14]" />
          <StatCard
            label="Total Profit"
            value={formatCurrency(parseFloat(stats.totalProfit))}
            valueClassName={
              parseFloat(stats.totalProfit) >= 0 ? "text-[#39ff14]" : "text-red-400"
            }
          />
          <StatCard
            label="Max Drawdown"
            value={formatCurrency(parseFloat(stats.maxDrawdown))}
            valueClassName="text-red-400"
          />
          <StatCard label="Profit Factor" value={stats.profitFactor} />
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Avg Win"
            value={formatCurrency(parseFloat(stats.avgWin))}
            valueClassName="text-[#39ff14]"
          />
          <StatCard
            label="Avg Loss"
            value={formatCurrency(parseFloat(stats.avgLoss))}
            valueClassName="text-red-400"
          />
          <StatCard
            label="Largest Win"
            value={formatCurrency(parseFloat(stats.largestWin))}
            valueClassName="text-[#39ff14]"
          />
          <StatCard
            label="Largest Loss"
            value={formatCurrency(parseFloat(stats.largestLoss))}
            valueClassName="text-red-400"
          />
        </div>

        {equityCurveData.length > 0 && (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">Equity Curve</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={equityCurveData}>
                    <defs>
                      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39ff14" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#39ff14" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="trade" stroke="#b8b8c0" fontSize={12} />
                    <YAxis
                      stroke="#b8b8c0"
                      fontSize={12}
                      tickFormatter={(value) => {
                        const converted = value * CURRENCY_RATES[selectedCurrency];
                        return `${CURRENCY_SYMBOLS[selectedCurrency]}${formatNumber(converted)}`;
                      }}
                    />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="equity"
                      stroke="#39ff14"
                      fillOpacity={1}
                      fill="url(#colorEquity)"
                      name={`Equity (${selectedCurrency})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">Drawdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={equityCurveData}>
                    <defs>
                      <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="trade" stroke="#b8b8c0" fontSize={12} />
                    <YAxis
                      stroke="#b8b8c0"
                      fontSize={12}
                      tickFormatter={(value) => {
                        const converted = value * CURRENCY_RATES[selectedCurrency];
                        return `${CURRENCY_SYMBOLS[selectedCurrency]}${formatNumber(converted)}`;
                      }}
                    />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="drawdown"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorDrawdown)"
                      name={`Drawdown (${selectedCurrency})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {profitDistribution.length > 0 && (
              <div className="glass-card mb-8 rounded-2xl p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">Profit Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={profitDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis
                      dataKey="range"
                      stroke="#b8b8c0"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis stroke="#b8b8c0" fontSize={12} />
                    <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#fff" }} />
                    <Legend />
                    <Bar dataKey="count" fill="#39ff14" name="Trade Count" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}

        <div className="glass-card rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Trade Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {[
                    "Trade #",
                    "Strategy",
                    "Instrument",
                    "Direction",
                    "Quantity",
                    "Entry Time",
                    "Exit Time",
                    "Entry Price",
                    "Exit Price",
                    "Session",
                    "Profit",
                    "Cum. Profit",
                  ].map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 100).map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/60 transition-colors hover:bg-surface-elevated/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {row["Trade number"] || index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {toTitleCase(row.strategy)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">{row.instrument}</td>
                    <td
                      className={`whitespace-nowrap px-4 py-3 font-medium ${
                        row.direction === "Long"
                          ? "text-[#39ff14]"
                          : row.direction === "Short"
                            ? "text-red-400"
                            : "text-muted"
                      }`}
                    >
                      {row.direction || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {row.quantity !== null && row.quantity !== undefined
                        ? row.quantity.toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {row.entryTime ? formatTimestamp(row.entryTime) : row["Entry time"] || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {row.exitTime ? formatTimestamp(row.exitTime) : row["Exit time"] || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {row.entryPrice !== null && row.entryPrice !== undefined
                        ? formatPrice(row.entryPrice)
                        : "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">
                      {row.exitPrice !== null && row.exitPrice !== undefined
                        ? formatPrice(row.exitPrice)
                        : "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white">{row.session}</td>
                    <td
                      className={`whitespace-nowrap px-4 py-3 font-medium ${
                        row.profit >= 0 ? "text-[#39ff14]" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(row.profit)}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-3 font-medium ${
                        row.cumProfit >= 0 ? "text-[#39ff14]" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(row.cumProfit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length > 100 && (
              <p className="mt-4 text-center text-sm text-muted">
                Showing first 100 of {filteredData.length.toLocaleString()} trades
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
