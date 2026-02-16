
import React, { useState, useEffect } from 'react';
import { MEAL_PLANS } from '../constants.tsx';
import { useLanguage } from './LanguageContext.tsx';

interface Props {
  showSummary?: boolean;
}

const MealPlanner: React.FC<Props> = ({ showSummary }) => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast': return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>;
      case 'Lunch': return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      case 'Dinner': return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
      default: return <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
    }
  };

  return (
    <section id="planner" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.planner.title}</h2>
            <p className="text-stone-600 text-lg max-w-xl">{t.planner.description}</p>
          </div>
          <div className="bg-orange-50 p-8 rounded-[2.5rem] text-center min-w-[280px] shadow-inner border border-orange-100">
            <div className="text-orange-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{t.planner.presentMoment}</div>
            <div className="text-5xl font-mono font-bold text-stone-800">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-stone-500 mt-3 font-medium text-sm">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <span className="bg-orange-600 p-2 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              {t.planner.weeklyRituals}
            </h3>
            <div className="space-y-8">
              {MEAL_PLANS.map((plan, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-orange-100 group">
                  <h4 className="font-bold text-xl text-stone-800 mb-6 group-hover:text-orange-700 transition-colors">{plan.day}</h4>
                  <div className="space-y-6">
                    {plan.meals.map((meal, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-6">
                        <span className="text-stone-400 text-xs w-20 flex-shrink-0 mt-1 font-medium">{meal.time}</span>
                        <div className="flex-grow">
                          <span className="block font-bold text-stone-900 text-lg mb-1">{meal.dish}</span>
                          <span className={`inline-flex items-center gap-1.5 text-[9px] px-3 py-1 rounded-full uppercase tracking-widest font-bold ${
                            meal.type === 'Breakfast' ? 'bg-amber-100 text-amber-700' :
                            meal.type === 'Lunch' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {getMealIcon(meal.type)}
                            {meal.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="bg-stone-900 text-white p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                <div className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-4">Ayurvedic Wisdom</div>
                <h3 className="text-3xl font-bold mb-6">{t.planner.wisdomTitle}</h3>
                <p className="text-stone-300 mb-8 text-lg leading-relaxed font-light">
                  {t.planner.wisdomDesc}
                </p>
                <div className="flex gap-4">
                  <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all text-sm shadow-lg shadow-orange-900/40">
                    {t.planner.ritualButton}
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanner;
