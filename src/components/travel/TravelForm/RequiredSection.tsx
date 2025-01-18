// src/components/travel/TravelForm/RequiredSection.tsx
import React from 'react';
import { Select, RadioGroup } from '../../travel/shared';
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

const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: 'その他' },
];

const PEOPLE_COUNT_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
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