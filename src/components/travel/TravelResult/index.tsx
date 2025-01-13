// src/components/travel/TravelResult/index.tsx
import React from 'react';
import { TravelPlan } from '@/types/travel';
import { PlanOverview } from './PlanOverview';
import { SpotList } from './SpotList';
import { Schedule } from './Schedule';

interface TravelResultProps {
  plan: TravelPlan;
  onBack: () => void;
}

const TravelResult: React.FC<TravelResultProps> = ({ plan, onBack }) => {
  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <PlanOverview
          title={plan.plan_overview.title}
          summary={plan.plan_overview.summary}
          totalBudget={plan.plan_overview.total_budget}
          highlights={plan.plan_overview.highlights}
        />
        
        <SpotList spots={plan.spots} />
        
        <Schedule schedule={plan.schedule} />

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            入力画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelResult;