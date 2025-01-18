// 楽天トラベルAPIのパラメータ型
export type RakutenTravelParams = {
  applicationId: string;
  format: 'json';
  smallClassCode: string;
};

// 楽天トラベルAPIのレスポンス型
export type RakutenTravelResponse = {
  pagingInfo: {
    recordCount: number;
    pageCount: number;
    page: number;
    first: number;
    last: number;
  };
  hotels: Hotel[];
};

export type Hotel = {
  hotelBasicInfo: {
    hotelNo: number;
    hotelName: string;
    hotelInformationUrl: string;
    planListUrl: string;
    dpPlanListUrl: string;
    reviewUrl: string;
    hotelKanaName: string;
    hotelSpecial: string;
    hotelMinCharge: number;
    latitude: number;
    longitude: number;
    postalCode: string;
    address1: string;
    address2: string;
    telephoneNo: string;
    faxNo: string;
    access: string;
    parkingInformation: string;
    nearestStation: string;
    hotelImageUrl: string;
    hotelThumbnailUrl: string;
    roomImageUrl: string;
    roomThumbnailUrl: string;
    hotelMapImageUrl: string;
    reviewCount: number;
    reviewAverage: number;
    userReview: string;
  };
};
