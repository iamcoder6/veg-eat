
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext.tsx';

interface ConnectProps {
  socialLinks: { platform: string; url: string }[];
}

const Connect: React.FC<ConnectProps> = ({ socialLinks }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  if (submitted) {
    return (
      <section className="py-32 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 saffron-gradient rounded-full flex items-center justify-center text-white mb-8 shadow-2xl animate-bounce">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-5xl font-black mb-4 font-serif">{t.connect.successTitle}</h2>
        <p className="text-stone-500 text-xl max-w-md mx-auto mb-10 leading-relaxed">
          {t.connect.successDesc}
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-colors"
        >
          {t.nav.connect}
        </button>
      </section>
    );
  }

  return (
    <section id="connect" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-cursive text-3xl text-orange-500 mb-2 block">{t.connect.sampark}</span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic text-stone-900">
            {t.connect.title.split(' ')[0]} <span className="text-emerald-800 not-italic">{t.connect.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg font-light">{t.connect.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-stone-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 font-serif">{t.connect.direct}</h3>
                <div className="space-y-4">
                  {socialLinks.map((link, i) => (
                    <div key={i} className="flex gap-4 items-center">
                       <a href={link.url} target="_blank" className="text-xl font-bold hover:text-orange-400 transition-colors">
                         {link.platform} →
                       </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-stone-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">{t.connect.fullName}</label>
                    <input required type="text" className="w-full px-8 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">{t.connect.email}</label>
                    <input required type="email" className="w-full px-8 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full saffron-gradient text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-orange-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  {t.connect.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
