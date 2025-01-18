import React from 'react';
import { Select } from '../../travel/shared';
import { FormSectionProps } from './types';

const PREFECTURES = [
  { value: 'tokyo', label: '東京都' },
  { value: 'osaka', label: '大阪府' },
  // TODO: 他の都道府県を追加
];

const ACTIVITY_OPTIONS: Array<{ value: 'active' | 'relaxed' | 'food'; label: string }> = [
  { value: 'active', label: 'アクティブ' },
  { value: 'relaxed', label: 'ゆったり' },
  { value: 'food', label: '食べ歩き' },
];

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}月`
}));

const BUDGET_OPTIONS = Array.from({ length: 100 }, (_, i) => ({
  value: String((i + 1) * 10000),
  label: `${i + 1}万円`
}));

export const OptionalSection: React.FC<FormSectionProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-emerald-600 border-b border-emerald-100 pb-2">
        任意項目
      </h2>

      <Select
        label="目的地"
        value={formData.destination || ''}
        onChange={(value) => onUpdate({ destination: value || undefined })}
        options={PREFECTURES}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          やりたいこと（複数選択可）
        </label>
        <div className="space-y-2">
          {ACTIVITY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.activities?.includes(option.value)}
                onChange={(e) => {
                  const activities = formData.activities || [];
                  if (e.target.checked) {
                    onUpdate({ activities: [...activities, option.value] });
                  } else {
                    onUpdate({
                      activities: activities.filter(a => a !== option.value)
                    });
                  }
                }}
                className="text-emerald-500 focus:ring-emerald-400"
              />
              <span className="text-sm text-slate-600">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Select
        label="予算"
        value={formData.budget?.toString() || ''}
        onChange={(value) => onUpdate({ budget: value ? parseInt(value) : undefined })}
        options={BUDGET_OPTIONS}
      />

      <Select
        label="旅行時期"
        value={formData.travel_month?.toString() || ''}
        onChange={(value) => onUpdate({ travel_month: value ? parseInt(value) : undefined })}
        options={MONTHS}
      />
    </div>
  );
};
