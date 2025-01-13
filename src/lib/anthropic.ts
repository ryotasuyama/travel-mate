import { TravelFormInput, TravelPlan } from '@/types/travel';

export function generateTravelPrompt(input: TravelFormInput): string {
  return `あなたは旅行プランを提案する専門家です。
以下の条件に基づいて、具体的な観光スポットとタイムスケジュールを提案してください。
提案は必ず指定されたJSONフォーマットで出力してください。
選択された交通手段に応じて、現実的な移動時間を考慮してください。
予算内で実現可能なプランを提案してください。

旅行条件:
${JSON.stringify(input, null, 2)}

以下の形式でJSONを出力してください：
{
  "plan_overview": {
    "title": "プランタイトル",
    "summary": "プラン概要",
    "total_budget": 予算総額,
    "highlights": ["ハイライト1", "ハイライト2"]
  },
  "spots": [
    {
      "name": "スポット名",
      "description": "説明文",
      "duration": "所要時間（分）",
      "category": "カテゴリ",
      "season_recommendation": "季節特性",
      "access": "アクセス方法",
      "admission_fee": "入場料"
    }
  ],
  "schedule": [
    {
      "day": "旅行○日目",
      "date": "日付",
      "timeline": [
        {
          "time": "時間帯",
          "activity": "行動内容",
          "location": "場所",
          "duration": "所要時間",
          "transportation": "移動手段",
          "notes": "特記事項",
          "dining": {
            "name": "店舗名",
            "cuisine_type": "料理ジャンル"
          }
        }
      ]
    }
  ]
}`;
}

export function parseTravelPlanResponse(response: any): TravelPlan {
  try {
    // レスポンスから必要なテキスト部分を取得
    const content = response.content[0].text;
    // JSON文字列をパースして型チェック
    const plan = JSON.parse(content) as TravelPlan;
    return plan;
  } catch (error) {
    throw new Error('Failed to parse travel plan response');
  }
}