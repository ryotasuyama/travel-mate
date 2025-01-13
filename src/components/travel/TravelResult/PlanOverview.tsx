// src/components/travel/TravelResult/PlanOverview.tsx
import React from 'react';

interface PlanOverviewProps {
  title: string;
  summary: string;
  totalBudget: number;
  highlights: string[];
}

export const PlanOverview: React.FC<PlanOverviewProps> = ({
  title,
  summary,
  totalBudget,
  highlights,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-700">{title}</h1>
        <p className="text-slate-500 mt-2">{summary}</p>
      </div>

      <div className="bg-emerald-50 rounded-lg p-4 mb-6">
        <p className="text-lg font-semibold text-emerald-700">
          総予算: ¥{totalBudget.toLocaleString()}
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-slate-700 mb-2">プランのハイライト</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          {highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};