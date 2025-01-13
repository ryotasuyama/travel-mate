import React from 'react';

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  required?: boolean;
  name: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  name,
  // name = Math.random().toString(36).substring(7), // ユニークなname属性を生成
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="text-emerald-500 focus:ring-emerald-400"
              required={required}
            />
            <span className="text-sm text-slate-600">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};