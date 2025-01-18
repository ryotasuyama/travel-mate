import React from 'react';
import { Calendar } from 'lucide-react';
import { TravelPlan } from '@/types/travel';
import { Accommodation } from './Accommodation';

interface ScheduleProps {
  schedule: TravelPlan['schedule'];
}

export const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-700 mb-4">旅程表</h2>
      <div className="space-y-6">
        {schedule.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-700">
                {day.day}（{new Date(day.date).toLocaleDateString()}）
              </h3>
            </div>
            <div className="border-l-2 border-emerald-200 pl-4 ml-2 space-y-6">
              {day.timeline.map((event, eventIndex) => (
                <div key={eventIndex} className="relative">
                  <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -left-[25px] top-1.5"></div>
                  <div>
                    <p className="font-semibold text-slate-700">{event.time}</p>
                    <div className="mt-1">
                      <p className="text-slate-600">{event.activity}</p>
                      <p className="text-sm text-slate-500 mt-1">所要時間: {event.duration}</p>
                      {event.dining && (
                        <div className="bg-orange-50 p-2 rounded mt-2">
                          <p className="text-sm text-orange-700">
                            🍴 {event.dining.name}（{event.dining.cuisine_type}）
                          </p>
                        </div>
                      )}
                      {event.notes && (
                        <p className="text-sm text-slate-500 mt-1">※ {event.notes}</p>
                      )}
                      {event.accommodation && (
                        <div className="mt-2">
                          <Accommodation timeline={[event]} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
