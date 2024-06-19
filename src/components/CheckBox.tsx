import { CSSProperties, ChangeEvent } from "react";

export const CheckBox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const checkboxId = `checkbox-${label.replace(/\s+/g, "-")}`;

  return (
    <div style={checkboxContainerStyle}>
      <input type="checkbox" id={checkboxId} checked={checked} onChange={onChange} style={checkboxStyle} />
      <label htmlFor={checkboxId} style={labelStyle}>
        {label}
      </label>
    </div>
  );
};

const labelStyle: CSSProperties = {
  fontSize: "0.875rem",
  marginBottom: "0.5rem",
  fontWeight: "lighter",
};

const checkboxContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginTop: "0.5rem",
};

const checkboxStyle: CSSProperties = {
  width: "1.0rem",
  height: "1.0rem",
  marginBottom: "0.5rem",
};
