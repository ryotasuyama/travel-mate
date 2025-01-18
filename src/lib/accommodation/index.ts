import { RakutenTravelParams, RakutenTravelResponse } from "@/types/accommodation";

const RAKUTEN_TRAVEL_API_ENDPOINT =
  "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426";

export class RakutenTravelClient {
  private applicationId: string;

  constructor(applicationId: string) {
    this.applicationId = applicationId;
  }

  async searchHotels(smallClassCode: string): Promise<RakutenTravelResponse> {
    const params: RakutenTravelParams = {
      applicationId: this.applicationId,
      format: "json",
      smallClassCode,
    };

    const queryString = new URLSearchParams(params as any).toString();
    const url = `${RAKUTEN_TRAVEL_API_ENDPOINT}?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as RakutenTravelResponse;
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }
  }
}

// シングルトンインスタンスを作成
let client: RakutenTravelClient | null = null;

export const getRakutenTravelClient = (): RakutenTravelClient => {
  if (!client) {
    if (!process.env.RAKUTEN_APP_ID) {
      throw new Error('RAKUTEN_APP_ID is not defined in environment variables');
    }
    client = new RakutenTravelClient(process.env.RAKUTEN_APP_ID);
  }
  return client;
};
