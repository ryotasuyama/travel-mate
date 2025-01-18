import { TravelFormInput, TravelPlan } from '@/types/travel';
import { Anthropic } from '@anthropic-ai/sdk';

interface MessageContent {
  type: string;
  text?: string;
}

interface Message {
  id: string;
  content: MessageContent[];
  role: string;
  model: string;
}

type MessageContentText = {
  type: 'text';
  text: string;
};

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

export function parseTravelPlanResponse(response: Message): TravelPlan {
  try {
    // レスポンスから必要なテキスト部分を取得
    const text = response.content.filter((block: MessageContent): block is MessageContentText => 
      block.type === 'text'
    )[0]?.text;
    if (!text) {
      throw new Error('No text content found in response');
    }

    // JSONの開始位置と終了位置を探す
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      console.error('JSON structure not found in response:', text);
      throw new Error('Invalid response format: JSON structure not found');
    }

    // JSON部分を抽出
    const jsonStr = text.slice(jsonStart, jsonEnd);
    
    try {
      // JSON文字列をパースして型チェック
      const plan = JSON.parse(jsonStr) as TravelPlan;
      
      // 必須フィールドの存在チェック
      if (!plan.plan_overview || !plan.spots || !plan.schedule) {
        throw new Error('Missing required fields in travel plan');
      }

      return plan;
    } catch (parseError: unknown) {
      console.error('JSON Parse Error:', parseError);
      console.error('Attempted to parse:', jsonStr);
      const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown parse error';
      throw new Error(`Failed to parse JSON: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Travel Plan Parse Error:', error);
    console.error('Full Response:', response.content);
    throw error;
  }
}
