import { getBucket } from "@extend-chrome/storage";

type apiKey = string;
type SourceLang = "English" | "Korean" | "Chinese" | "Japanese";
type TargetLang = "English" | "Korean" | "Chinese" | "Japanese";

export interface Settings {
  debug: boolean;
  enabled: boolean;
  apiKey: apiKey;
  sourceLang: SourceLang;
  targetLang: TargetLang;
}

const bucket = getBucket<Settings>("my_bucket", "sync");

export const loadSettings = async (): Promise<Settings> => {
  const value = await bucket.get();
  return value;
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  await bucket.set(settings);
};
