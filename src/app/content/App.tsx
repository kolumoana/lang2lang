import { useAppState } from "./useAppState";
import { TextField } from "./TextField";
import { Debug } from "./Debug";
import { useEffect, useState } from "react";
import { loadSettings } from "../../lib/settings";

export const App = () => {
  const {
    ref,
    width,
    height,
    isOpen,
    selectedText,
    translatedText,
    cursorPosition,
    overflowX,
    innerWidth,
    textFieldMaxWidth,
    debug,
  } = useAppState(import.meta.env.DEV, 600);

  const [showDebug, setShowDebug] = useState(false);
  useEffect(() => {
    (async () => {
      const settings = await loadSettings();
      setShowDebug(debug && settings.debug && settings.enabled);
    })();
  }, [translatedText, cursorPosition, overflowX, innerWidth, textFieldMaxWidth, debug]);

  return (
    <>
      {isOpen && (
        <TextField
          ref={ref}
          translatedText={translatedText}
          cursorPosition={cursorPosition}
          overflowX={overflowX}
          innerWidth={innerWidth}
          maxWidth={textFieldMaxWidth}
        />
      )}
      {showDebug && (
        <Debug
          selectedText={selectedText}
          translatedText={translatedText}
          cursorPosition={cursorPosition}
          innerWidth={innerWidth}
          width={width}
          height={height}
          overflowX={overflowX}
        />
      )}
    </>
  );
};
