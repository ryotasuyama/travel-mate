import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  required?: boolean;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  required = false,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? min : parseInt(e.target.value);
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (value < min) onChange(min);
    if (value > max) onChange(max);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          className={`w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 ${className}`}
          required={required}
        />
        <div className="absolute right-2 inset-y-0 flex items-center pointer-events-none text-sm text-slate-400">
          {min !== undefined && max !== undefined && `${min}〜${max}`}
        </div>
      </div>
    </div>
  );
};