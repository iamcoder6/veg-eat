
import React from 'react';
import { useLanguage } from './LanguageContext.tsx';

interface HeroProps {
  viewCount?: number;
  punchline: string;
  makerName: string;
  brandName: string;
  brandFullName: string;
  heroTitle: string;
  heroDesc: string;
  heroImage: string;
}

const Hero: React.FC<HeroProps> = ({ 
  viewCount, 
  punchline, 
  makerName, 
  brandName, 
  brandFullName,
  heroTitle,
  heroDesc,
  heroImage 
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt={brandFullName} 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-brand-primary"></div>
              <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.5em]">{t.hero.tradition}</span>
            </div>
            
            <div className="bg-brand-fresh/20 backdrop-blur-xl border border-brand-fresh/30 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-fresh">
                  {punchline}
                </span>
            </div>

            {viewCount && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span className="text-[9px] font-black tracking-widest uppercase text-stone-300">
                  {viewCount.toLocaleString()} {t.hero.foodies}
                </span>
              </div>
            )}
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black mb-2 leading-[0.75] tracking-tighter italic">
            {heroTitle.split(' ')[0]} <span className="text-brand-primary not-italic">{heroTitle.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="text-brand-primary/80 text-lg md:text-xl font-black uppercase tracking-[0.5em] mb-6 ml-2 italic">
            {brandFullName}
          </div>
          
          <div className="font-cursive text-4xl md:text-6xl text-brand-primary/90 mb-10 ml-2">
            by {makerName}
          </div>
          
          <p className="text-xl md:text-2xl text-stone-300 mb-12 font-light max-w-xl leading-relaxed">
            {heroDesc}
          </p>
          
          <div className="flex flex-wrap gap-8 items-center">
            <a href="#recipes" className="brand-gradient hover:scale-105 transform transition-all text-white px-14 py-6 rounded-brand text-sm font-black shadow-2xl shadow-brand-primary/60 uppercase tracking-[0.3em]">
              {t.hero.explore}
            </a>
            <a href="#talk" className="group flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest hover:text-brand-primary transition-colors">
              <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-white/10 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
              </span>
              {t.hero.talkChef}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
