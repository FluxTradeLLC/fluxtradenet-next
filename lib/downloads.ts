export type StrategyDownload = {
  key: string;
  name: string;
  type: string;
  icon: string;
  /** Set when the strategy zip is ready, e.g. `/downloads/hydra.zip` */
  downloadUrl: string | null;
};

export const STRATEGY_DOWNLOADS: StrategyDownload[] = [
  {
    key: "HYDRA",
    name: "Hydra",
    type: "Renko Patterns",
    icon: "/icons/hydra.svg",
    downloadUrl: null,
  },
  {
    key: "CERBERUS",
    name: "Cerberus",
    type: "Opening Range Break",
    icon: "/icons/cerberus.svg",
    downloadUrl: null,
  },
  {
    key: "KRAKEN",
    name: "Kraken",
    type: "Compression Breakout",
    icon: "/icons/kraken.svg",
    downloadUrl: null,
  },
  // {
  //   key: "ORMS",
  //   name: "ORMS",
  //   type: "Opening Range Momentum Scalping",
  //   icon: "/icons/orms.svg",
  //   downloadUrl: null,
  // },
];

/** Set when the indicator pack zip is ready, e.g. `/downloads/fluxtrade-indicators.zip` */
export const INDICATOR_PACK_DOWNLOAD_URL: string | null = null;

/** Set when the templates backup is ready, e.g. `/downloads/fluxtrade-templates.nt8bk` */
export const TEMPLATES_DOWNLOAD_URL: string | null = "/downloads/FluxTrade_Templates_v1.nt8bk";
