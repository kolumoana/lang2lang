import { CSSProperties, ChangeEvent } from "react";

export const SelectBox = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) => {
  const dynamicLabelStyle: CSSProperties = {
    ...labelStyle,
    textDecoration: disabled ? "line-through" : "none",
  };

  return (
    <div>
      <label style={dynamicLabelStyle}>{label}</label>
      <select value={value} onChange={onChange} disabled={disabled} style={selectStyle}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const selectStyle: CSSProperties = {
  width: "100%",
  padding: "0.2rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
};

const labelStyle: CSSProperties = {
  marginBottom: "1.0rem",
  fontSize: "0.875rem",
  fontWeight: "200",
};
