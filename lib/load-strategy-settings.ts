import fs from "fs";
import path from "path";
import {
  STRATEGY_SETTINGS_FILES,
  type StrategySettingsDoc,
} from "@/lib/strategy-settings";

export function loadStrategySettingsDocs(): StrategySettingsDoc[] {
  const settingsDir = path.join(process.cwd(), "public", "settings");

  return STRATEGY_SETTINGS_FILES.map(({ file }) => {
    const filePath = path.join(settingsDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as StrategySettingsDoc;
  });
}
