import { isHiddenStrategyKey } from "@/lib/strategies";

export type StrategyDownload = {
  key: string;
  name: string;
  type: string;
  icon: string;
  /** Set when the strategy zip is ready, e.g. `/downloads/hydra.zip` */
  downloadUrl: string | null;
};

export const STRATEGIES_DOWNLOAD_URL = '/downloads/FluxTrade_Strategies_v1.0.0.1.zip';

export const STRATEGY_DOWNLOADS: StrategyDownload[] = [
  {
    key: "CERBERUS",
    name: "Cerberus",
    type: "Opening Range Break",
    icon: "/icons/cerberus.svg",
    downloadUrl: STRATEGIES_DOWNLOAD_URL,
  },
  {
    key: "HYDRA",
    name: "Hydra",
    type: "Renko Patterns",
    icon: "/icons/hydra.svg",
    downloadUrl: STRATEGIES_DOWNLOAD_URL,
  },
  {
    key: "KRAKEN",
    name: "Kraken",
    type: "Compression Breakout",
    icon: "/icons/kraken.svg",
    downloadUrl: STRATEGIES_DOWNLOAD_URL,
  },
  {
    key: "ORMS",
    name: "ORMS",
    type: "Opening Range Momentum Scalping",
    icon: "/icons/orms.svg",
    downloadUrl: STRATEGIES_DOWNLOAD_URL,
  },
];

export const VISIBLE_STRATEGY_DOWNLOADS = STRATEGY_DOWNLOADS.filter(
  (strategy) => !isHiddenStrategyKey(strategy.key),
);

/** Set when the indicator pack zip is ready, e.g. `/downloads/fluxtrade-indicators.zip` */
export const INDICATOR_PACK_DOWNLOAD_URL: string | null = '/downloads/FluxTrade_Indicators_v1.0.0.1.zip';

/** Set when the templates backup is ready, e.g. `/downloads/fluxtrade-templates.nt8bk` */
export const TEMPLATES_DOWNLOAD_URL: string | null = "/downloads/FluxTrade_Templates_v1.nt8bk";
