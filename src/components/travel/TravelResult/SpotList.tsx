// src/components/travel/TravelResult/SpotList.tsx
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { TravelPlan } from '@/types/travel';

interface SpotListProps {
  spots: TravelPlan['spots'];
}

export const SpotList: React.FC<SpotListProps> = ({ spots }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-700 mb-4">観光スポット</h2>
      <div className="space-y-4">
        {spots.map((spot, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-700">{spot.name}</h3>
            <p className="text-slate-600 mt-2">{spot.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">所要時間: {spot.duration}分</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">{spot.access}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm">
                入場料: ¥{spot.admission_fee.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};