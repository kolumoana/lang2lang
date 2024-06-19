import { ScrollArea } from "../../components/ScrollArea";
import { Separator } from "../../components/Separator";

interface DebugInfoProps {
  selectedText: string;
  translatedText: string;
  cursorPosition: { x: number; y: number };
  innerWidth: number;
  width: number;
  height: number;
  overflowX: boolean;
}

export const Debug = ({
  selectedText,
  translatedText,
  cursorPosition,
  innerWidth,
  width,
  height,
  overflowX,
}: DebugInfoProps) => {
  const logs = [
    {
      label: "selectedText",
      value: selectedText,
    },
    {
      label: "translatedText",
      value: translatedText,
    },
    {
      label: "cursorPosition.x",
      value: cursorPosition.x,
    },
    {
      label: "cursorPosition.y",
      value: cursorPosition.y,
    },
    {
      label: "innerWidth",
      value: innerWidth,
    },
    {
      label: "width",
      value: width,
    },
    {
      label: "height",
      value: height,
    },
    {
      label: "cursorPosition.x + boxWidth",
      value: cursorPosition.x + width,
    },
    {
      label: "cp.x + boxWidth > innerWidth",
      value: cursorPosition.x + width > innerWidth,
    },
    {
      label: "overflowX",
      value: overflowX.toString(),
    },
  ];

  return (
    <div style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 999999999 }}>
      <ScrollArea
        style={{
          height: "18rem",
          width: "18rem",
          borderRadius: "0.375rem",
          border: "1px solid",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        {logs.map((log) => (
          <span key={log.label}>
            <div style={{ fontSize: "0.875rem" }}>
              {log.label}: {log.value.toString()}
            </div>
            <Separator style={{ margin: "0.5rem 0" }} />
          </span>
        ))}
      </ScrollArea>
    </div>
  );
};
