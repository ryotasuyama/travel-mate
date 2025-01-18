import { TravelFormInput, TravelPlan } from '@/types/travel';
import { Anthropic } from '@anthropic-ai/sdk';

export function generateTravelPrompt(input: TravelFormInput): string {
  return `あなたは旅行プランを提案する専門家です。
以下の条件に基づいて、具体的な観光スポットとタイムスケジュールを提案してください。

重要な注意事項：
1. 回答は必ず有効なJSONフォーマットで出力してください
2. JSONの前後に説明文や追加のテキストを含めないでください
3. 選択された交通手段に応じて、現実的な移動時間を考慮してください
4. 予算内で実現可能なプランを提案してください
5. すべての必須フィールドを含めてください

旅行条件:
${JSON.stringify(input, null, 2)}

出力するJSONの形式：
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

export function parseTravelPlanResponse(response: Anthropic.Message): TravelPlan {
  try {
    // レスポンスの内容を確認
    console.log('Parsing response:', JSON.stringify(response, null, 2));

    // テキストコンテンツの抽出
    let text = '';
    for (const content of response.content) {
      if (content.type === 'text') {
        text += content.text;
      }
    }

    if (!text) {
      console.error('No text content found in response');
      throw new Error('No text content found in response');
    }

    console.log('Extracted text:', text);

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
