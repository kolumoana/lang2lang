import { CSSProperties } from "react";

export const Separator = ({ style }: { style: CSSProperties }) => {
  const defaultStyle: CSSProperties = {
    height: "1px",
    backgroundColor: "#e0e0e0",
  };

  return <div style={{ ...defaultStyle, ...style }} />;
};
