import { useRef, useState, useEffect } from "react";
import { useLang2Lang } from "./useLang2Lang";

export const useAppState = (debug: boolean, textFieldMaxWidth: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { isOpen, selectedText, translatedText, cursorPosition, overflowX, innerWidth } = useLang2Lang(width);

  useEffect(() => {
    const updateSize = () => {
      if (translatedText.length === 0) {
        setWidth(0);
        setHeight(0);
        return;
      }

      if (ref.current) {
        setWidth(ref.current.scrollWidth);
        setHeight(ref.current.scrollHeight);
        return;
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [translatedText]);

  return {
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
  };
};
