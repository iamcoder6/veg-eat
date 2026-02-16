
import React from 'react';
import { useLanguage } from './LanguageContext.tsx';

interface FooterProps {
  viewCount?: number;
  makerName: string;
  brandFullName: string;
  punchline: string;
  socialLinks: { platform: string; url: string }[];
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ viewCount, makerName, brandFullName, punchline, socialLinks, onAdminClick }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 brand-gradient rounded-3xl rotate-45 mb-8 flex items-center justify-center text-white shadow-xl shadow-brand-primary/40">
             <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current -rotate-45">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
          </div>
          <span className="text-4xl font-serif font-bold text-white tracking-tighter uppercase">{brandFullName}</span>
          <span className="text-brand-primary font-black uppercase text-[10px] tracking-[0.5em] mt-3">{punchline}</span>
        </div>

        <p className="mb-8 font-light text-stone-400 max-w-md mx-auto italic">
          {t.footer.quote}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-xs uppercase tracking-widest font-black text-stone-500">
          <a href="#recipes" className="hover:text-white transition-colors">{t.nav.recipes}</a>
          <a href="#gallery" className="hover:text-white transition-colors">{t.nav.gallery}</a>
          <a href="#planner" className="hover:text-white transition-colors">{t.nav.planner}</a>
          <a href="https://linktr.ee/bades_production" target="_blank" className="text-brand-fresh hover:text-white transition-colors">Bades Production</a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {socialLinks.map((link, i) => (
            <a 
              key={i}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-xl border border-stone-800 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all shadow-sm ${link.platform === 'YouTube' ? 'hover:border-red-600' : ''}`}
            >
              {link.platform}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16 p-8 bg-white/5 rounded-brand border border-white/10">
          <div className="text-left">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span> Partner Universe
            </h4>
            <p className="text-xs text-stone-400">Explore more from the creator. Bades Production curates premium experiences across domains.</p>
            <a href="https://linktr.ee/bades_production" target="_blank" className="mt-4 inline-block text-[10px] uppercase tracking-widest font-bold text-brand-primary hover:text-white transition-colors underline">Visit Linktree →</a>
          </div>
          <div className="text-left">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span> YouTube Hub
            </h4>
            <p className="text-xs text-stone-400">Join @umeshbade_ for visual storytelling, kitchen secrets, and behind-the-scenes magic.</p>
            <a href="https://youtube.com/@umeshbade_" target="_blank" className="mt-4 inline-block text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-white transition-colors underline">Watch Now →</a>
          </div>
        </div>

        <div className="w-24 h-px bg-stone-700 mx-auto mb-8"></div>
        <div className="text-sm">
          <span className="text-stone-500 uppercase tracking-widest text-xs font-bold">{t.footer.curated}</span>
          <div className="text-white font-bold text-xl mt-1 font-serif tracking-tight">{makerName}</div>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="text-stone-600 text-[9px] tracking-[0.4em] uppercase font-black">
            © {new Date().getFullYear()} {brandFullName} • {t.footer.rights}
          </div>
          
          <div className="flex items-center gap-6">
            {viewCount && (
              <div className="text-[10px] uppercase font-bold text-stone-700 tracking-widest">
                <span className="text-stone-500">{t.footer.visits}:</span> {viewCount.toLocaleString()}
              </div>
            )}
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 text-stone-700 hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
