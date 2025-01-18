import { TravelFormInput } from '@/types/travel';

export function validateTravelInput(input: TravelFormInput): boolean {
  try {
    // 必須項目のチェック
    if (!input.departure || !input.gender || !input.transportation || !input.accommodation) {
      return false;
    }

    // 人数のバリデーション
    if (typeof input.group.adults !== 'number' || 
        typeof input.group.children !== 'number' || 
        input.group.adults + input.group.children === 0 || 
        input.group.adults + input.group.children > 20) {
      return false;
    }

    // 日数のバリデーション
    if (typeof input.duration.days !== 'number' || 
        input.duration.days < 1 || 
        input.duration.days > 14) {
      return false;
    }

    // 予算のバリデーション（任意項目）
    if (input.budget !== undefined && 
        (typeof input.budget !== 'number' || 
         input.budget < 10000 || 
         input.budget > 1000000)) {
      return false;
    }

    // 旅行月のバリデーション（任意項目）
    if (input.travel_month !== undefined && 
        (typeof input.travel_month !== 'number' || 
         input.travel_month < 1 || 
         input.travel_month > 12)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}