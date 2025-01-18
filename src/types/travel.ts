// 入力データの型定義
export interface TravelFormInput {
    departure: string;
    destination?: string;
    gender: 'male' | 'female' | 'other';
    group: {
      adults: number;
      children: number;
    };
    duration: {
      nights: number;
      days: number;
    };
    transportation: 'car' | 'public';
    accommodation: 'hotel' | 'ryokan' | 'none';
    activities?: Array<'active' | 'relaxed' | 'food'>;
    budget?: number;
    travel_month?: number;
  }
  
  // APIレスポンスの型定義
  export interface TravelPlan {
    plan_overview: {
      title: string;
      summary: string;
      total_budget: number;
      highlights: string[];
    };
    spots: Array<{
      name: string;
      description: string;
      duration: string;
      category: string;
      season_recommendation: string;
      access: string;
      admission_fee: number;
    }>;
    schedule: Array<{
      day: string;
      date: string;
      timeline: Array<{
        time: string;
        activity: string;
        location: string;
        duration: string;
        transportation: string;
        notes?: string;
        dining?: {
          name: string;
          cuisine_type: string;
        };
        accommodation?: {
          hotelName: string;
          pricePerRoom: number;
          access: string;
          type: string;
          bookingUrl: string;
          reviewScore: number;
        };
      }>;
    }>;
  }
  
  // APIエラーレスポンスの型定義
  export interface APIError {
    error: {
      type: string;
      message: string;
      suggestions?: string[];
    };
  }
