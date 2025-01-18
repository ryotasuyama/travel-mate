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

type SubOptionValue =
  | "sports"
  | "outdoor"
  | "adventure"
  | "sightseeing"
  | "onsen"
  | "luxury_hotel"
  | "beach_relax"
  | "massage"
  | "local_gourmet"
  | "cafe_tour"
  | "winery"
  | "cooking"
  | "art"
  | "history"
  | "music"
  | "photography"
  | "shopping"
  | "nature"
  | "family"
  | "romantic"
  | "challenge"
  | "retreat"
  | "volunteer"
  | "spontaneous";

const ACTIVITY_OPTIONS: Array<{ value: 'active' | 'relaxed' | 'food' | 'culture' | 'unique' | 'adventure'; label: string; subOptions?: Array<{ value: SubOptionValue; label: string }> }> = [
  {
    value: 'active',
    label: 'アクティビティ重視',
    subOptions: [
      { value: 'sports', label: 'スポーツ（スキー、スノーボード、ハイキングなど）' },
      { value: 'outdoor', label: 'アウトドア体験（キャンプ、ラフティング、サイクリングなど）' },
      { value: 'adventure', label: 'アドベンチャー（ジップライン、パラグライダー、バンジージャンプなど）' },
      { value: 'sightseeing', label: '観光名所めぐり（史跡、名所巡り）' },
    ],
  },
  {
    value: 'relaxed',
    label: 'リラックス重視',
    subOptions: [
      { value: 'onsen', label: '温泉・スパで癒し' },
      { value: 'luxury_hotel', label: '高級ホテルでのんびり' },
      { value: 'beach_relax', label: '海辺や湖畔でリラックス' },
      { value: 'massage', label: 'マッサージやエステ体験' },
    ],
  },
  {
    value: 'food',
    label: '食事・グルメ重視',
    subOptions: [
      { value: 'local_gourmet', label: '地元のグルメを堪能' },
      { value: 'cafe_tour', label: 'カフェめぐり' },
      { value: 'winery', label: 'ワイナリー・酒蔵めぐり' },
      { value: 'cooking', label: '料理教室や食の体験（そば打ち、寿司作りなど）' },
    ],
  },
  {
    value: 'culture',
    label: '文化・趣味重視',
    subOptions: [
      { value: 'art', label: 'アート体験（ミュージアム巡り、絵画教室など）' },
      { value: 'history', label: '歴史や文化を学ぶ（伝統工芸体験、地元の文化体験）' },
      { value: 'music', label: '音楽やライブ鑑賞' },
      { value: 'photography', label: '写真撮影スポット巡り' },
    ],
  },
  {
    value: 'unique',
    label: '特殊な旅行スタイル',
    subOptions: [
      { value: 'shopping', label: 'ショッピング（地元の市場、アウトレット、雑貨巡り）' },
      { value: 'nature', label: '自然探索（星空観賞、野生動物観察、植物園）' },
      { value: 'family', label: '家族旅行（子供向けアクティビティ、遊園地）' },
      { value: 'romantic', label: 'ロマンチックな旅（夜景、クルーズ、カップルプラン）' },
    ],
  },
  {
    value: 'adventure',
    label: '冒険・自己啓発',
    subOptions: [
      { value: 'challenge', label: '自己挑戦（山登り、マラソン参加）' },
      { value: 'retreat', label: 'メンタルリトリート（瞑想やヨガ体験）' },
      { value: 'volunteer', label: 'ボランティアツーリズム（現地支援や環境保護活動）' },
      { value: 'spontaneous', label: '無計画な旅（ぶらり旅）' },
    ],
  },
];


const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}月`
}));

const BUDGET_OPTIONS = Array.from({ length: 50 }, (_, i) => ({
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

<div className="space-y-4">
  <label className="block text-sm font-medium text-slate-700">
    やりたいこと（複数選択可）
  </label>
  <div className="space-y-4">
    {ACTIVITY_OPTIONS.map((option) => (
      <div key={option.value}>
        {/* メインオプションのチェックボックス */}
        <label className="flex items-center space-x-2">
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
                  activities: activities.filter((a) => a !== option.value),
                });
              }
            }}
            className="text-emerald-500 focus:ring-emerald-400"
          />
          <span className="text-sm text-slate-600">{option.label}</span>
        </label>

        {/* サブオプションがある場合に表示 */}
        {option.subOptions && (
          <div className="pl-6 mt-2 space-y-2">
            {option.subOptions.map((subOption) => (
              <label
                key={subOption.value}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  value={subOption.value}
                  checked={formData.activities?.includes(subOption.value)}
                  onChange={(e) => {
                    const activities = formData.activities || [];
                    if (e.target.checked) {
                      onUpdate({ activities: [...activities, subOption.value] });
                    } else {
                      onUpdate({
                        activities: activities.filter((a) => a !== subOption.value),
                      });
                    }
                  }}
                  className="text-emerald-400 focus:ring-emerald-300"
                />
                <span className="text-sm text-slate-500">{subOption.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
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
