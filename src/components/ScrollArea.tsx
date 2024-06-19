import { CSSProperties } from "react";

export const ScrollArea = ({ children, style }: { children: React.ReactNode; style: CSSProperties }) => {
  const defaultStyle: CSSProperties = {
    overflowY: "auto",
    overflowX: "hidden",
  };

  return <div style={{ ...defaultStyle, ...style }}>{children}</div>;
};
