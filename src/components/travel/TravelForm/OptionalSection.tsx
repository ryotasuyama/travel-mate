import React from 'react';
import { Select } from '../../travel/shared';
import { FormSectionProps } from './types';

const PREFECTURES = [
  { value: 'hokkaido', label: '北海道' },
  { value: 'aomori', label: '青森県' },
  { value: 'iwate', label: '岩手県' },
  { value: 'miyagi', label: '宮城県' },
  { value: 'akita', label: '秋田県' },
  { value: 'yamagata', label: '山形県' },
  { value: 'fukushima', label: '福島県' },
  { value: 'ibaraki', label: '茨城県' },
  { value: 'tochigi', label: '栃木県' },
  { value: 'gunma', label: '群馬県' },
  { value: 'saitama', label: '埼玉県' },
  { value: 'chiba', label: '千葉県' },
  { value: 'tokyo', label: '東京都' },
  { value: 'kanagawa', label: '神奈川県' },
  { value: 'niigata', label: '新潟県' },
  { value: 'toyama', label: '富山県' },
  { value: 'ishikawa', label: '石川県' },
  { value: 'fukui', label: '福井県' },
  { value: 'yamanashi', label: '山梨県' },
  { value: 'nagano', label: '長野県' },
  { value: 'gifu', label: '岐阜県' },
  { value: 'shizuoka', label: '静岡県' },
  { value: 'aichi', label: '愛知県' },
  { value: 'mie', label: '三重県' },
  { value: 'shiga', label: '滋賀県' },
  { value: 'kyoto', label: '京都府' },
  { value: 'osaka', label: '大阪府' },
  { value: 'hyogo', label: '兵庫県' },
  { value: 'nara', label: '奈良県' },
  { value: 'wakayama', label: '和歌山県' },
  { value: 'tottori', label: '鳥取県' },
  { value: 'shimane', label: '島根県' },
  { value: 'okayama', label: '岡山県' },
  { value: 'hiroshima', label: '広島県' },
  { value: 'yamaguchi', label: '山口県' },
  { value: 'tokushima', label: '徳島県' },
  { value: 'kagawa', label: '香川県' },
  { value: 'ehime', label: '愛媛県' },
  { value: 'kochi', label: '高知県' },
  { value: 'fukuoka', label: '福岡県' },
  { value: 'saga', label: '佐賀県' },
  { value: 'nagasaki', label: '長崎県' },
  { value: 'kumamoto', label: '熊本県' },
  { value: 'oita', label: '大分県' },
  { value: 'miyazaki', label: '宮崎県' },
  { value: 'kagoshima', label: '鹿児島県' },
  { value: 'okinawa', label: '沖縄県' },
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
