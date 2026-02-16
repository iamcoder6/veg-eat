
import React from 'react';
import { useLanguage } from './LanguageContext.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';

interface NavbarProps {
  punchline: string;
  makerName: string;
  brandName: string;
  brandFullName: string;
}

const Navbar: React.FC<NavbarProps> = ({ punchline, makerName, brandName, brandFullName }) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <a href="#home" className="group flex items-center space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                 <div className="absolute inset-0 brand-gradient rounded-brand rotate-45 group-hover:rotate-[225deg] transition-all duration-1000 shadow-lg shadow-brand-primary/20"></div>
                 <div className="relative z-10 text-white transform group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                    </svg>
                 </div>
              </div>
              <div className="flex flex-col -space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-stone-900 tracking-tighter uppercase">{brandName.split(' ')[0]} <span className="text-brand-primary">{brandName.split(' ').slice(1).join(' ')}</span></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-stone-500 uppercase tracking-[0.2em] font-black italic">{brandFullName}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[7px] text-stone-400 uppercase tracking-widest font-bold">by {makerName}</span>
                    <span className="w-1 h-1 rounded-full bg-brand-fresh"></span>
                    <span className="text-[7px] text-brand-primary uppercase tracking-[0.4em] font-black">{punchline}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500">
            <a href="#home" className="hover:text-brand-primary transition-colors">{t.nav.home}</a>
            <a href="#recipes" className="hover:text-brand-primary transition-colors">{t.nav.recipes}</a>
            <a href="#gallery" className="hover:text-brand-primary transition-colors">{t.nav.gallery}</a>
            <a href="#planner" className="hover:text-brand-primary transition-colors">{t.nav.planner}</a>
            
            <div className="flex items-center space-x-4 border-x border-stone-100 px-6">
              <a href="https://linktr.ee/bades_production" target="_blank" className="hover:text-brand-fresh transition-colors flex items-center gap-1">
                <span className="w-1 h-1 bg-brand-fresh rounded-full"></span> Partners
              </a>
              <a href="https://youtube.com/@umeshbade_" target="_blank" className="hover:text-red-600 transition-colors">YouTube</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
            </div>

            <a href="#talk" className="brand-gradient text-white px-8 py-3 rounded-full hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-brand-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              {t.nav.talk}
            </a>
          </div>
          
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <a href="#talk" className="p-3 bg-stone-900 rounded-xl text-white">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
