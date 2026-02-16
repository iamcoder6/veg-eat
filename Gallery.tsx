
import React from 'react';
import { useLanguage } from './LanguageContext.tsx';

interface GalleryProps {
  images: { url: string; title: string; zone: string }[];
  title: string;
  description: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title, description }) => {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-cursive text-3xl text-orange-500 block mb-2">{t.gallery.subtitle}</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              {title.split(' ')[0]} <span className="text-emerald-700">{title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-stone-500 mt-6 text-lg">{description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <div key={i} className={`group relative rounded-[2.5rem] overflow-hidden bg-stone-100 card-shadow transition-all duration-500 hover:-translate-y-2 ${i % 3 === 1 ? 'lg:mt-12' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400 mb-2 block">{img.zone}</span>
                <h3 className="text-2xl font-bold font-serif">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
