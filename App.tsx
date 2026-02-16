
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Gallery from './components/Gallery.tsx';
import RecipeExplorer from './components/RecipeExplorer.tsx';
import MealPlanner from './components/MealPlanner.tsx';
import VoiceAssistant from './components/VoiceAssistant.tsx';
import Connect from './components/Connect.tsx';
import Footer from './components/Footer.tsx';
import AdminPortal from './components/AdminPortal.tsx';
import { LanguageProvider } from './components/LanguageContext.tsx';
import { RECIPES } from './constants.tsx';

const INITIAL_DATA = {
  punchline: 'Pure for Pures',
  makerName: 'Umesh Bade',
  brandName: 'Veg Eat',
  brandFullName: 'Vegetarian Eatings',
  theme: {
    primary: '#f97316',
    secondary: '#7c2d12',
    accent: '#fff7ed',
    radius: '2.5rem'
  },
  hero: {
    title: 'Veg Eat',
    description: "Discover the aromatic secrets of Bharat's regional kitchens. A warming journey through spices, soul, and heritage.",
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1920&auto=format&fit=crop'
  },
  sections: {
    recipes: {
      title: 'Regional Jewels',
      description: 'Each region of India brings a unique tempering, a secret spice, and a warming soul to the vegetarian table.'
    },
    gallery: {
      title: 'The Visual Kitchen',
      description: 'A celebration of colors, textures, and the vibrant life of Indian vegetarian cuisine.'
    }
  },
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/vegieat' },
    { platform: 'Instagram', url: 'https://instagram.com/veg_eat_' },
    { platform: 'YouTube', url: 'https://youtube.com/@umeshbade_' },
    { platform: 'Production', url: 'https://linktr.ee/bades_production' }
  ],
  recipes: RECIPES,
  galleryImages: [
    { url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop', title: 'Golden Masala Dosa', zone: 'South India' },
    { url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1200&auto=format&fit=crop', title: 'Paneer Tikka Platter', zone: 'North India' },
    { url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop', title: 'Vibrant Vegetable Thali', zone: 'Western India' },
    { url: 'https://images.unsplash.com/photo-1601050690597-df056fb3304a?q=80&w=1200&auto=format&fit=crop', title: 'Crispy Samosa Treats', zone: 'Street Food' },
    { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop', title: 'Healthy Superfood Bowl', zone: 'Modern Veg' },
    { url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop', title: 'Royal Kesari Pulao', zone: 'Central India' },
  ]
};

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [viewCount, setViewCount] = useState<number>(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [dynamicData, setDynamicData] = useState(INITIAL_DATA);

  useEffect(() => {
    const STORAGE_KEY_DATA = 'vegeat_admin_data_v7';
    const savedData = localStorage.getItem(STORAGE_KEY_DATA);
    if (savedData) {
      setDynamicData(JSON.parse(savedData));
    } else {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(INITIAL_DATA));
    }

    const STORAGE_KEY_VIEWS = 'veg_eat_view_count_v7';
    const baseCount = 13800;
    const storedCount = localStorage.getItem(STORAGE_KEY_VIEWS);
    let currentCount = storedCount ? parseInt(storedCount, 10) : baseCount;
    currentCount += 1;
    localStorage.setItem(STORAGE_KEY_VIEWS, currentCount.toString());
    setViewCount(currentCount);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveSection(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleUpdateData = (newData: any) => {
    setDynamicData(newData);
    localStorage.setItem('vegeat_admin_data_v7', JSON.stringify(newData));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'gallery': return <Gallery images={dynamicData.galleryImages} title={dynamicData.sections.gallery.title} description={dynamicData.sections.gallery.description} />;
      case 'recipes': return <RecipeExplorer recipes={dynamicData.recipes} title={dynamicData.sections.recipes.title} description={dynamicData.sections.recipes.description} />;
      case 'planner': return <MealPlanner showSummary={true} />;
      case 'talk': return <VoiceAssistant makerName={dynamicData.makerName} brandName={dynamicData.brandName} />;
      case 'connect': return <Connect socialLinks={dynamicData.socialLinks} />;
      default: return (
        <>
          <Hero 
            viewCount={viewCount} 
            punchline={dynamicData.punchline} 
            makerName={dynamicData.makerName} 
            brandName={dynamicData.brandName}
            brandFullName={dynamicData.brandFullName}
            heroTitle={dynamicData.hero.title}
            heroDesc={dynamicData.hero.description}
            heroImage={dynamicData.hero.image}
          />
          <RecipeExplorer 
            limit={3} 
            recipes={dynamicData.recipes} 
            title={dynamicData.sections.recipes.title} 
            description={dynamicData.sections.recipes.description} 
          />
          <MealPlanner showSummary={true} />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-accent transition-colors duration-500">
      <style>{`
        :root {
          --brand-primary: ${dynamicData.theme?.primary || '#f97316'};
          --brand-secondary: ${dynamicData.theme?.secondary || '#7c2d12'};
          --brand-accent: ${dynamicData.theme?.accent || '#fff7ed'};
          --brand-radius: ${dynamicData.theme?.radius || '2.5rem'};
        }
      `}</style>
      <Navbar 
        punchline={dynamicData.punchline} 
        makerName={dynamicData.makerName} 
        brandName={dynamicData.brandName} 
        brandFullName={dynamicData.brandFullName} 
      />
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      <Footer 
        viewCount={viewCount} 
        makerName={dynamicData.makerName} 
        brandFullName={dynamicData.brandFullName}
        punchline={dynamicData.punchline}
        socialLinks={dynamicData.socialLinks}
        onAdminClick={() => setIsAdminOpen(true)}
      />
      {isAdminOpen && (
        <AdminPortal 
          data={dynamicData} 
          onClose={() => setIsAdminOpen(false)} 
          onUpdate={handleUpdateData}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
