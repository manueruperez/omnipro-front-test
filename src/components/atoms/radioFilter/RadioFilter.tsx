import React from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

interface RadioFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const RadioFilter: React.FC<RadioFilterProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const handleChange = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      <label className="text-sm font-medium">{label}:</label>
      <Radio.Group value={value} onChange={handleChange} size="small">
        {options.map((opt) => (
          <Radio.Button key={opt.value} value={opt.value}>
            {opt.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioFilter;
