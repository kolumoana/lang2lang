import { CSSProperties, ChangeEvent } from "react";

export const TextInput = ({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={onChange} style={inputStyle} />
    </div>
  );
};

const inputStyle: CSSProperties = {
  width: "98%",
  padding: "0.2rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: "200",
};
