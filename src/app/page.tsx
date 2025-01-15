'use client';

import React, { useState } from 'react';
import TravelForm from '@/components/travel/TravelForm';
import TravelResult from '@/components/travel/TravelResult';
import { TravelPlan } from '@/types/travel';

export default function Home() {
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);

  const handlePlanGenerated = (plan: TravelPlan) => {
    setTravelPlan(plan);
  };

  const handleBack = () => {
    setTravelPlan(null);
  };

  return (
    <main>
      {!travelPlan ? (
        <TravelForm onPlanGenerated={handlePlanGenerated} />
      ) : (
        <TravelResult plan={travelPlan} onBack={handleBack} />
      )}
    </main>
  );
}
