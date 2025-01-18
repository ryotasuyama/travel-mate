import React from 'react';
import { TravelPlan } from '@/types/travel';

interface AccommodationProps {
  timeline: TravelPlan['schedule'][0]['timeline'];
}

export const Accommodation: React.FC<AccommodationProps> = ({ timeline }) => {
  // Filter and sort accommodations by review score
  const accommodations = timeline
    .filter(item => item.accommodation)
    .sort((a, b) => {
      const scoreA = a.accommodation?.reviewScore ?? 0;
      const scoreB = b.accommodation?.reviewScore ?? 0;
      return scoreB - scoreA;
    });

  if (accommodations.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">宿泊施設</h3>
      <div className="space-y-4">
        {accommodations.map((item, index) => {
          const accommodation = item.accommodation!;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {accommodation.hotelName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {accommodation.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-emerald-600">
                    ¥{accommodation.pricePerRoom.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">1部屋あたり</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">アクセス:</span> {accommodation.access}
                </p>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 mr-2">
                    評価:
                  </span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-sm">
                    {accommodation.reviewScore.toFixed(1)}
                  </span>
                </div>
                <a
                  href={accommodation.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded transition-colors"
                >
                  予約ページへ
                </a>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                滞在時間: {item.time} ({item.duration})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
