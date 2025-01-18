// src/components/travel/TravelForm/RequiredSection.tsx
import React from 'react';
import { Select, RadioGroup } from '../../travel/shared';
import { FormSectionProps } from './types';

const PREFECTURES = [
  { value: 'tokyo', label: '東京都' },
  { value: 'osaka', label: '大阪府' },
  // TODO: 他の都道府県を追加
];

const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: 'その他' },
];

const PEOPLE_COUNT_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}人`
}));

const DURATION_OPTIONS = [
  { value: '0', label: '日帰り' },
  ...Array.from({ length: 9 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}泊${i + 2}日`
  })),
];

const TRANSPORTATION_OPTIONS = [
  { value: 'public', label: '公共交通機関' },
  { value: 'car', label: '車' },
];

const ACCOMMODATION_OPTIONS = [
  { value: 'hotel', label: 'ホテル' },
  { value: 'ryokan', label: '旅館' },
  { value: 'none', label: '指定なし' },
];

export const RequiredSection: React.FC<FormSectionProps> = ({
  formData,
  onUpdate,
}) => {
  const updateGroup = (key: 'adults' | 'children', value: string) => {
    onUpdate({
      group: {
        ...formData.group,
        [key]: parseInt(value)
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-emerald-600 border-b border-emerald-100 pb-2">
        必須項目
      </h2>

      <Select
        label="出発地"
        value={formData.departure}
        onChange={(value) => onUpdate({ departure: value })}
        options={PREFECTURES}
        required
      />

      <RadioGroup
        label="性別"
        value={formData.gender}
        onChange={(value) => onUpdate({ gender: value as 'male' | 'female' | 'other' })}
        options={GENDER_OPTIONS}
        required
        name="gender"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="大人の人数（中学生以上）"
          value={String(formData.group.adults)}
          onChange={(value) => updateGroup('adults', value)}
          options={PEOPLE_COUNT_OPTIONS}
          required
        />
        <Select
          label="子供の人数（小学生以下）"
          value={String(formData.group.children)}
          onChange={(value) => updateGroup('children', value)}
          options={[
            { value: "0", label: "0人" },
            ...PEOPLE_COUNT_OPTIONS
          ]}
        />
      </div>

      <Select
        label="旅行日数"
        value={String(formData.duration.nights)}
        onChange={(value) => {
          const nights = parseInt(value);
          onUpdate({
            duration: {
              nights: nights,
              days: nights + 1
            }
          });
        }}
        options={DURATION_OPTIONS}
        required
      />

      <RadioGroup
        label="交通手段"
        value={formData.transportation}
        onChange={(value) => onUpdate({ transportation: value as 'car' | 'public' })}
        options={TRANSPORTATION_OPTIONS}
        required
        name="transportation"
      />

      <RadioGroup
        label="宿泊施設タイプ"
        value={formData.accommodation}
        onChange={(value) => onUpdate({ accommodation: value as 'hotel' | 'ryokan' | 'none' })}
        options={ACCOMMODATION_OPTIONS}
        required
        name="accommodation"
      />
    </div>
  );
};