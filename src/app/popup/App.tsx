import { useEffect, useState, ChangeEvent } from "react";
import { Settings, loadSettings, saveSettings } from "../../lib/settings";
import { CheckBox } from "../../components/CheckBox";
// import { SelectBox } from "../../components/SelectBox";
import { TextInput } from "../../components/TextInput";
import { Separator } from "../../components/Separator";

export const App = () => {
  document.body.style.width = "25rem";
  const [settings, setSettings] = useState<Settings>({
    debug: false,
    enabled: true,
    apiKey: "",
    sourceLang: "English",
    targetLang: "Japanese",
  });

  useEffect(() => {
    (async () => {
      const value = await loadSettings();
      setSettings((prevSettings) => ({ ...prevSettings, ...value }));
    })();
  }, []);

  const saveSetting = (key: keyof Settings, value: string | boolean | null) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <div
      style={{
        // width: "90%",
        // height: "90%",
        margin: "0.25rem",
        padding: "0.5rem",
        borderRadius: "0.375rem",
        border: "1px solid",
        backgroundColor: "white",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "2.00rem",
            fontWeight: 800,
            letterSpacing: "-0.05em",
          }}
        >
          lang2lang
        </h1>
        <Separator style={{ margin: "0.5rem 0" }} />
        {import.meta.env.DEV && (
          <>
            <CheckBox
              label="Debug"
              checked={settings.debug}
              onChange={(e: ChangeEvent<HTMLInputElement>) => saveSetting("debug", e.target.checked)}
            />
            <Separator style={{ margin: "0.5rem 0" }} />
          </>
        )}
        <CheckBox
          label="有効"
          checked={settings.enabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => saveSetting("enabled", e.target.checked)}
        />
        <Separator style={{ margin: "0.5rem 0" }} />
        <TextInput
          label="OpenAI API Key"
          type="password"
          value={settings.apiKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) => saveSetting("apiKey", e.target.value)}
        />
        <Separator style={{ margin: "0.5rem 0" }} />
        {/* <SelectBox
          label="翻訳元言語"
          value={settings.sourceLang}
          options={[
            { value: "English", label: "英語" },
            { value: "Korean", label: "韓国語" },
            { value: "Chinese", label: "中国語" },
            { value: "Japanese", label: "日本語" },
          ]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => saveSetting("sourceLang", e.target.value)}
          disabled
        />
        <SelectBox
          label="翻訳先言語"
          value={settings.targetLang}
          options={[
            { value: "English", label: "英語" },
            { value: "Korean", label: "韓国語" },
            { value: "Chinese", label: "中国語" },
            { value: "Japanese", label: "日本語" },
          ]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => saveSetting("targetLang", e.target.value)}
          disabled
        /> */}
      </div>
    </div>
  );
};

export default App;
