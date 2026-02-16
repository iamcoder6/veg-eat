
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext.tsx';
import { Language } from '../translations.ts';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const langs: { key: Language; label: string; sub: string }[] = [
    { key: 'en', label: 'English', sub: 'English' },
    { key: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { key: 'mr', label: 'मराठी', sub: 'Marathi' },
    { key: 'fr', label: 'Français', sub: 'French' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-100 bg-white/50 hover:bg-white transition-all text-xs font-bold text-stone-600 uppercase tracking-widest"
      >
        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {langs.find(l => l.key === language)?.key.toUpperCase()}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {langs.map((lang) => (
              <button
                key={lang.key}
                onClick={() => {
                  setLanguage(lang.key);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-6 py-3 flex items-center justify-between group transition-colors ${language === lang.key ? 'bg-orange-50 text-orange-600' : 'hover:bg-stone-50 text-stone-700'}`}
              >
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{lang.label}</span>
                  <span className="text-[10px] opacity-50 uppercase tracking-tighter">{lang.sub}</span>
                </div>
                {language === lang.key && (
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
