import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { TravelFormInput, TravelPlan, APIError } from '@/types/travel';
import { validateTravelInput } from '@/utils/validation';
import { generateTravelPrompt, parseTravelPlanResponse } from '@/lib/anthropic';


const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const input: TravelFormInput = await request.json();
    
    // 入力バリデーション
    if (!validateTravelInput(input)) {
      return NextResponse.json<APIError>({
        error: {
          type: 'validation_error',
          message: '入力内容を確認してください'
        }
      }, { status: 400 });
    }

    // プロンプトの生成
    const prompt = generateTravelPrompt(input);

    // Anthropic APIリクエスト
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    // レスポンスのパース
    const travelPlan = parseTravelPlanResponse(response);

    return NextResponse.json<TravelPlan>(travelPlan);

  } catch (error) {
    console.error('Travel Plan Generation Error:', error);
    return NextResponse.json<APIError>({
      error: {
        type: 'server_error',
        message: 'プランの生成中にエラーが発生しました'
      }
    }, { status: 500 });
  }
}