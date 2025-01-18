// 入力データの型定義
export interface TravelFormInput {
  departure: string;
  destination?: string;
  gender: "male" | "female" | "other";
  group: {
    adults: number;
    children: number;
  };
  duration: {
    nights: number;
    days: number;
  };
  transportation: "car" | "public";
  accommodation: "hotel" | "ryokan" | "none";
  activities?: Array<
    | "active"
    | "relaxed"
    | "food"
    | "culture"
    | "unique"
    | "adventure"
    | "sports"
    | "outdoor"
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
    | "spontaneous"
  >;
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
    date: string; // YYYY-MM-DD形式
    timeline: Array<{
      time: string; // HH:mm形式
      activity: string;
      location: string;
      duration: string;
      transportation: string;
      notes?: string;
      dining?: {
        name: string;
        cuisine_type: string;
      };
    }>;
  }>; // 閉じ括弧を追加
}

// APIエラーレスポンスの型定義
export interface APIError {
  error: {
    type: string;
    message: string;
    suggestions?: string[];
  };
}
