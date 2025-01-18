import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { TravelFormInput, TravelPlan, APIError } from '@/types/travel';
import { validateTravelInput } from '@/utils/validation';
import { generateTravelPrompt, parseTravelPlanResponse } from '@/lib/anthropic';

export const runtime = 'edge';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json<APIError>({
        error: {
          type: 'configuration_error',
          message: 'API設定が正しくありません',
          suggestions: ['システム管理者に連絡してください']
        }
      }, { status: 500 });
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 60000);

    console.log('Starting travel plan generation...');
    const input: TravelFormInput = await request.json();
    console.log('Received input:', JSON.stringify(input, null, 2));
    
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
    console.log('Generated prompt:', prompt);

    // Anthropic APIリクエスト
    console.log('Sending request to Anthropic API...');
    let response;
    try {
      response = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 4096,
        messages: [
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.5,
        system: "あなたは旅行プランを提案する専門家です。必ず指定されたJSONフォーマットで回答してください。JSONの前後に説明文を含めないでください。"
      });
    } catch (apiError) {
      console.error('Anthropic API Error:', apiError);
      return NextResponse.json<APIError>({
        error: {
          type: 'api_error',
          message: 'AI APIでエラーが発生しました',
          suggestions: ['しばらく時間をおいて再度お試しください']
        }
      }, { status: 500 });
    }

    if (!response || !response.content || response.content.length === 0) {
      console.error('Invalid API response structure:', response);
      return NextResponse.json<APIError>({
        error: {
          type: 'invalid_response',
          message: 'AIからの応答が不正です',
          suggestions: ['もう一度お試しください']
        }
      }, { status: 500 });
    }

    console.log('Received response from Anthropic API:', JSON.stringify(response, null, 2));

    // レスポンスのパース
    const travelPlan = parseTravelPlanResponse(response);
    console.log('Parsed travel plan:', JSON.stringify(travelPlan, null, 2));

    return NextResponse.json<TravelPlan>(travelPlan);

  } catch (error) {
    console.error('Travel Plan Generation Error:', error);
    
    // エラーの種類に応じて適切なレスポンスを返す
    if (error instanceof Error) {
      if (error.message.includes('JSON')) {
        return NextResponse.json<APIError>({
          error: {
            type: 'parse_error',
            message: 'AIの応答を解析できませんでした',
            suggestions: ['もう一度お試しください']
          }
        }, { status: 500 });
      } else if (error.message.includes('Missing required fields')) {
        return NextResponse.json<APIError>({
          error: {
            type: 'invalid_response',
            message: 'AIの応答に必要な情報が含まれていません',
            suggestions: ['条件を変更して再度お試しください']
          }
        }, { status: 500 });
      }
    }

    // その他のエラー
    return NextResponse.json<APIError>({
      error: {
        type: 'server_error',
        message: 'プランの生成中にエラーが発生しました',
        suggestions: [
          'しばらく時間をおいて再度お試しください',
          '入力内容を変更してお試しください'
        ]
      }
    }, { status: 500 });
  }
}
