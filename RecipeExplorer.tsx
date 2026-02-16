
import React, { useState } from 'react';
import { Zone, Recipe } from '../types.ts';
import { useLanguage } from './LanguageContext.tsx';

interface Props {
  limit?: number;
  recipes: Recipe[];
  title: string;
  description: string;
}

const RecipeExplorer: React.FC<Props> = ({ limit, recipes, title, description }) => {
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<Zone | 'All'>('All');

  const filteredRecipes = recipes.filter(r => selectedZone === 'All' || r.zone === selectedZone);
  const displayRecipes = limit ? filteredRecipes.slice(0, limit) : filteredRecipes;

  const getZoneColor = (zone: Zone) => {
    switch(zone) {
      case Zone.NORTH: return 'bg-orange-600 text-white';
      case Zone.SOUTH: return 'bg-brand-primary text-white';
      case Zone.WEST: return 'bg-amber-600 text-white';
      case Zone.EAST: return 'bg-rose-600 text-white';
      case Zone.CENTRAL: return 'bg-orange-800 text-white';
      default: return 'bg-stone-800 text-white';
    }
  };

  return (
    <section id="recipes" className="py-24 relative transition-all duration-700 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-cursive text-3xl text-brand-primary mb-2 block">{t.recipes.heritage}</span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
            {title.split(' ')[0]} <span className="text-brand-secondary not-italic">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="w-24 h-1 brand-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            {description}
          </p>
        </div>

        {!limit && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button 
              onClick={() => setSelectedZone('All')}
              className={`px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border-2 ${selectedZone === 'All' ? 'bg-stone-900 border-stone-900 text-white shadow-xl' : 'bg-white/50 border-stone-200 text-stone-500 hover:border-brand-primary'}`}
            >
              {t.recipes.allRegions}
            </button>
            {Object.values(Zone).map(zone => (
              <button 
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border-2 ${selectedZone === zone ? 'bg-brand-primary border-brand-primary text-white shadow-xl' : 'bg-white/50 border-stone-200 text-stone-500 hover:border-brand-primary'}`}
              >
                {zone}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white/95 backdrop-blur-sm rounded-brand overflow-hidden card-shadow group border border-stone-100 transition-all duration-700 hover:shadow-brand-primary/20">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute top-8 left-8 flex gap-2">
                  <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg ${getZoneColor(recipe.zone)}`}>
                    {recipe.zone}
                  </div>
                  <div className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg bg-brand-fresh text-white">
                    Fresh
                  </div>
                </div>
              </div>
              
              <div className="p-10 -mt-20 relative z-10 bg-white rounded-t-brand">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">{recipe.spiceLevel} {t.recipes.spiceLevel}</span>
                    <h3 className="text-3xl font-black font-serif leading-tight text-stone-900">{recipe.title}</h3>
                  </div>
                </div>
                
                <p className="text-stone-500 text-sm mb-8 leading-relaxed italic font-light">
                  "{recipe.description}"
                </p>
                
                <div className="flex items-center justify-between pt-8 border-t border-stone-50">
                   <div className="flex gap-4">
                     <div className="flex flex-col">
                       <span className="text-[9px] uppercase tracking-widest text-stone-400">{t.recipes.time}</span>
                       <span className="font-bold text-stone-800">{recipe.prepTime}</span>
                     </div>
                     <div className="w-px h-8 bg-stone-100"></div>
                     <div className="flex flex-col">
                       <span className="text-[9px] uppercase tracking-widest text-stone-400">{t.recipes.energy}</span>
                       <span className="font-bold text-stone-800">{recipe.calories || 350} kcal</span>
                     </div>
                   </div>
                   <button className="brand-gradient w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:rotate-12 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeExplorer;
