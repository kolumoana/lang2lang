import { forwardRef } from "react";

export const TextField = forwardRef<HTMLDivElement, PopupProps>(
  ({ translatedText, cursorPosition, overflowX, innerWidth, maxWidth }, ref) => (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `${cursorPosition.y}px`,
        zIndex: 9999,
        color: "#333",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        maxWidth: `${maxWidth}px`,
        whiteSpace: "pre-wrap",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: 1,
        transform: "translateY(0)",
        ...(overflowX ? { right: `${innerWidth - cursorPosition.x}px` } : { left: `${cursorPosition.x}px` }),
      }}
    >
      {translatedText}
    </div>
  )
);

interface PopupProps {
  translatedText: string;
  cursorPosition: { x: number; y: number };
  overflowX: boolean;
  innerWidth: number;
  maxWidth: number;
}
