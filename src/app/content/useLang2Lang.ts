import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";
import { loadSettings } from "../../lib/settings";

export const useLang2Lang = (popupWidth: number) => {
  const { selectedText } = useSelectedText();
  const [translatedText, setTranslatedText] = useState("");
  const { cursorPosition, overflowX, innerWidth } = useCursorPosition(popupWidth + 15);

  useEffect(() => {
    if (isTarget(selectedText)) {
      streamTranslateText(selectedText);
      return;
    }
    setTranslatedText("");
  }, [selectedText]);

  const streamTranslateText = async (text: string) => {
    const settings = await loadSettings();
    if (!settings.enabled) {
      setTranslatedText("");
      return;
    }

    if (!settings.apiKey) {
      setTranslatedText("");
      return;
    }
    const openai = new OpenAI({
      apiKey: settings.apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that translates ${settings.sourceLang} to ${settings.targetLang}. No explanation. Only translation.`,
        },
        { role: "user", content: text },
      ],
      max_tokens: 4096,
      stream: true,
    });

    for await (const chunk of response) {
      setTranslatedText((prev) => prev + (chunk.choices[0].delta.content || ""));
    }
  };

  const isOpen = selectedText.length > 0 && translatedText.length > 0;

  return { isOpen, selectedText, translatedText, cursorPosition, overflowX, innerWidth };
};

const isTarget = (text: string) => {
  const alphaCount = text.replace(/[^a-zA-Z]/g, "").length;
  const alphaPercentage = (alphaCount / text.length) * 100;
  return text.length > 4 && alphaPercentage > 70;
};

const useSelectedText = () => {
  const [selectedText, setSelectedText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelection = () => {
    const selectionObj = window.getSelection();
    if (selectionObj) {
      const text = selectionObj.toString();
      if (text) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setSelectedText(text), 1000);
        return;
      }
    }
    setSelectedText("");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSelectedText(""), 1000);
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { selectedText };
};

const useCursorPosition = (boxWidth: number) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [overflowX, setOverflowX] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateCursorPosition = (event: MouseEvent) => {
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setCursorPosition({ x: event.clientX + scrollX, y: event.clientY + scrollY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  useEffect(() => {
    const updateInnerWidth = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", updateInnerWidth);
    return () => window.removeEventListener("resize", updateInnerWidth);
  }, []);

  useEffect(() => {
    setOverflowX(cursorPosition.x + boxWidth > innerWidth);
  }, [cursorPosition, boxWidth, innerWidth]);

  return { cursorPosition, overflowX, innerWidth };
};
