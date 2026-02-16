
import React, { useState } from 'react';
import { Zone, Recipe } from '../types.ts';

interface AdminPortalProps {
  onClose: () => void;
  data: any;
  onUpdate: (newData: any) => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onClose, data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'text' | 'recipes' | 'gallery' | 'socials' | 'theme'>('general');
  const [pass, setPass] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Partial<Recipe> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin123') setIsAuthorized(true);
    else alert('Incorrect Password (hint: admin123)');
  };

  const deleteRecipe = (id: string) => {
    const newRecipes = data.recipes.filter((r: Recipe) => r.id !== id);
    onUpdate({ ...data, recipes: newRecipes });
  };

  const saveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe) return;
    let newRecipes = [...data.recipes];
    if (editingRecipe.id) {
      newRecipes = newRecipes.map(r => r.id === editingRecipe.id ? editingRecipe as Recipe : r);
    } else {
      const newId = Math.random().toString(36).substr(2, 9);
      newRecipes.push({ ...editingRecipe, id: newId } as Recipe);
    }
    onUpdate({ ...data, recipes: newRecipes });
    setEditingRecipe(null);
  };

  const addGalleryItem = () => {
    const newGallery = [...data.galleryImages, { url: '', title: 'New Photo', zone: 'General' }];
    onUpdate({ ...data, galleryImages: newGallery });
  };

  const deleteGalleryItem = (index: number) => {
    const newGallery = data.galleryImages.filter((_: any, i: number) => i !== index);
    onUpdate({ ...data, galleryImages: newGallery });
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[100] bg-stone-900/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-brand max-w-sm w-full shadow-2xl border border-brand-primary/20">
          <div className="w-16 h-16 brand-gradient rounded-2xl rotate-45 mx-auto mb-8 flex items-center justify-center text-white">
             <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current -rotate-45">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
              </svg>
          </div>
          <h2 className="text-2xl font-black mb-2 text-center text-stone-900 uppercase tracking-tighter">Admin Access</h2>
          <p className="text-stone-400 text-[10px] text-center mb-8 uppercase tracking-widest font-bold">Manage {data.brandName}</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              autoFocus
              type="password" 
              placeholder="Admin Password" 
              className="w-full px-6 py-4 rounded-xl bg-stone-100 outline-none focus:ring-2 focus:ring-brand-primary text-center font-bold"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="w-full brand-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-brand-primary/20">Authorize</button>
            <button type="button" onClick={onClose} className="w-full text-stone-400 text-[10px] uppercase font-bold mt-4 tracking-widest">Return to Site</button>
          </form>
        </div>
      </div>
    );
  }

  const InputField = ({ label, value, onChange, textarea = false, type = "text" }: any) => (
    <div className="space-y-2">
      <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest ml-1">{label}</label>
      {textarea ? (
        <textarea 
          className="w-full p-5 rounded-2xl bg-stone-50 border border-stone-100 focus:bg-white focus:border-brand-primary transition-all outline-none font-medium h-32 resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input 
          type={type}
          className="w-full p-5 rounded-2xl bg-stone-50 border border-stone-100 focus:bg-white focus:border-brand-primary transition-all outline-none font-medium"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-stone-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 brand-gradient rounded-2xl rotate-45 flex items-center justify-center text-white">
               <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current -rotate-45">
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 7l0 5l3 3" />
                </svg>
            </div>
            <div>
              <h1 className="text-4xl font-black text-stone-900 tracking-tighter uppercase">Admin <span className="text-brand-primary">Handler</span></h1>
              <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mt-1">Manage every word and pixel</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-brand-primary transition-all shadow-xl">Exit Dashboard</button>
        </div>

        <nav className="flex gap-2 mb-8 border-b border-stone-200 pb-4 overflow-x-auto no-scrollbar">
          {['general', 'text', 'recipes', 'gallery', 'socials', 'theme'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-brand-primary text-white shadow-lg' : 'text-stone-400 hover:text-stone-900 bg-white border border-stone-100'}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="bg-white p-8 md:p-12 rounded-brand shadow-xl border border-stone-100 min-h-[500px]">
          {activeTab === 'general' && (
            <div className="space-y-10 animate-in fade-in">
              <h3 className="text-2xl font-bold font-serif border-b pb-4">Core Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Brand Name" value={data.brandName} onChange={(val: string) => onUpdate({...data, brandName: val})} />
                <InputField label="Brand Full Form" value={data.brandFullName} onChange={(val: string) => onUpdate({...data, brandFullName: val})} />
                <InputField label="Maker Name" value={data.makerName} onChange={(val: string) => onUpdate({...data, makerName: val})} />
                <InputField label="Punchline" value={data.punchline} onChange={(val: string) => onUpdate({...data, punchline: val})} />
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-10 animate-in fade-in">
              <h3 className="text-2xl font-bold font-serif border-b pb-4">Look & Feel (Customizer)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <InputField label="Primary Color" type="color" value={data.theme?.primary || '#10b981'} onChange={(val: string) => onUpdate({...data, theme: {...data.theme, primary: val}})} />
                  <p className="text-[9px] text-stone-400">Buttons, Main Accents</p>
                </div>
                <div className="flex flex-col gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <InputField label="Secondary Color" type="color" value={data.theme?.secondary || '#064e3b'} onChange={(val: string) => onUpdate({...data, theme: {...data.theme, secondary: val}})} />
                  <p className="text-[9px] text-stone-400">Gradients, Dark Headers</p>
                </div>
                <div className="flex flex-col gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <InputField label="Accent Color" type="color" value={data.theme?.accent || '#f0fdf4'} onChange={(val: string) => onUpdate({...data, theme: {...data.theme, accent: val}})} />
                  <p className="text-[9px] text-stone-400">Background Tint</p>
                </div>
                <div className="flex flex-col gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <InputField label="Corner Radius (rem)" value={data.theme?.radius || '2.5rem'} onChange={(val: string) => onUpdate({...data, theme: {...data.theme, radius: val}})} />
                  <p className="text-[9px] text-stone-400">Shape of Cards/Buttons</p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                <h4 className="font-bold text-brand-secondary mb-2">Theme Preview</h4>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-brand bg-brand-primary"></div>
                  <div className="w-10 h-10 rounded-brand brand-gradient"></div>
                  <div className="px-6 py-2 rounded-brand bg-brand-primary text-white font-bold text-xs flex items-center">Button</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-12 animate-in fade-in">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold font-serif border-b pb-4">Hero Content</h3>
                <InputField label="Hero Background Image URL" value={data.hero.image} onChange={(val: string) => onUpdate({...data, hero: {...data.hero, image: val}})} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Hero Title" value={data.hero.title} onChange={(val: string) => onUpdate({...data, hero: {...data.hero, title: val}})} />
                  <InputField label="Hero Description" textarea value={data.hero.description} onChange={(val: string) => onUpdate({...data, hero: {...data.hero, description: val}})} />
                </div>
              </div>
              <div className="space-y-8 pt-8 border-t">
                <h3 className="text-2xl font-bold font-serif border-b pb-4">Section Intros</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <InputField label="Recipes Title" value={data.sections.recipes.title} onChange={(val: string) => onUpdate({...data, sections: {...data.sections, recipes: {...data.sections.recipes, title: val}}})} />
                    <InputField label="Recipes Description" textarea value={data.sections.recipes.description} onChange={(val: string) => onUpdate({...data, sections: {...data.sections, recipes: {...data.sections.recipes, description: val}}})} />
                  </div>
                  <div className="space-y-4">
                    <InputField label="Gallery Title" value={data.sections.gallery.title} onChange={(val: string) => onUpdate({...data, sections: {...data.sections, gallery: {...data.sections.gallery, title: val}}})} />
                    <InputField label="Gallery Description" textarea value={data.sections.gallery.description} onChange={(val: string) => onUpdate({...data, sections: {...data.sections, gallery: {...data.sections.gallery, description: val}}})} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold font-serif">Social Media Ecosystem</h3>
                <button 
                  onClick={() => onUpdate({...data, socialLinks: [...data.socialLinks, { platform: 'New', url: 'https://' }]})}
                  className="bg-brand-primary text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md"
                >
                  Add Link
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {data.socialLinks.map((link: any, i: number) => (
                  <div key={i} className="flex gap-4 items-center bg-stone-50 p-4 rounded-2xl border border-stone-100 group">
                    <input 
                      className="w-1/4 p-3 rounded-xl bg-white border border-stone-100 outline-none focus:border-brand-primary font-bold"
                      value={link.platform}
                      onChange={(e) => {
                        const newLinks = [...data.socialLinks];
                        newLinks[i].platform = e.target.value;
                        onUpdate({...data, socialLinks: newLinks});
                      }}
                    />
                    <input 
                      className="flex-grow p-3 rounded-xl bg-white border border-stone-100 outline-none focus:border-brand-primary"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...data.socialLinks];
                        newLinks[i].url = e.target.value;
                        onUpdate({...data, socialLinks: newLinks});
                      }}
                    />
                    <button 
                      onClick={() => onUpdate({...data, socialLinks: data.socialLinks.filter((_: any, idx: number) => idx !== i)})}
                      className="text-rose-500 hover:bg-rose-50 p-3 rounded-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
             <div className="space-y-8 animate-in fade-in">
                {editingRecipe ? (
                  <form onSubmit={saveRecipe} className="space-y-8 bg-stone-50 p-10 rounded-brand border border-stone-100">
                    <h4 className="text-xl font-bold uppercase tracking-tighter">{editingRecipe.id ? 'Edit Recipe Entry' : 'New Culinary Entry'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Title" value={editingRecipe.title || ''} onChange={(val: string) => setEditingRecipe({...editingRecipe, title: val})} />
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest ml-1">Zone / Region</label>
                        <select 
                          className="w-full p-5 rounded-2xl bg-white border border-stone-100 outline-none focus:border-brand-primary font-medium appearance-none"
                          value={editingRecipe.zone || Zone.NORTH}
                          onChange={e => setEditingRecipe({...editingRecipe, zone: e.target.value as Zone})}
                        >
                          {Object.values(Zone).map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                      </div>
                      <InputField label="Image URL" value={editingRecipe.image || ''} onChange={(val: string) => setEditingRecipe({...editingRecipe, image: val})} />
                      <InputField label="Prep Time" value={editingRecipe.prepTime || ''} onChange={(val: string) => setEditingRecipe({...editingRecipe, prepTime: val})} />
                    </div>
                    <InputField label="Story / Description" textarea value={editingRecipe.description || ''} onChange={(val: string) => setEditingRecipe({...editingRecipe, description: val})} />
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-brand-primary/20">Save Entry</button>
                      <button type="button" onClick={() => setEditingRecipe(null)} className="bg-white text-stone-600 border border-stone-200 px-10 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold font-serif">Recipe Repository</h3>
                      <button onClick={() => setEditingRecipe({})} className="bg-brand-primary text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">Add New Recipe</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {data.recipes.map((recipe: Recipe) => (
                         <div key={recipe.id} className="bg-white border border-stone-100 rounded-[2rem] p-4 flex flex-col gap-4 shadow-sm group hover:border-brand-primary transition-all">
                            <img src={recipe.image} className="w-full h-32 rounded-2xl object-cover shadow-inner transition-transform group-hover:scale-[1.02]" />
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-bold text-stone-900 line-clamp-1">{recipe.title}</h5>
                                <span className="text-[9px] font-black uppercase text-brand-primary tracking-widest">{recipe.zone}</span>
                              </div>
                              <div className="flex gap-1">
                                <button onClick={() => setEditingRecipe(recipe)} className="text-stone-400 hover:text-brand-primary p-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg></button>
                                <button onClick={() => deleteRecipe(recipe.id)} className="text-stone-400 hover:text-rose-600 p-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg></button>
                              </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </>
                )}
             </div>
          )}

          {activeTab === 'gallery' && (
             <div className="space-y-8 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold font-serif">Curated Visuals</h3>
                  <button onClick={addGalleryItem} className="bg-brand-primary text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">Add Item</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {data.galleryImages.map((img: any, i: number) => (
                      <div key={i} className="relative group rounded-brand overflow-hidden aspect-square border border-stone-100 bg-stone-50 shadow-sm">
                        <img src={img.url} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-stone-900/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-3 backdrop-blur-sm">
                           <InputField label="Image URL" value={img.url} onChange={(val: string) => {
                             const newG = [...data.galleryImages];
                             newG[i].url = val;
                             onUpdate({...data, galleryImages: newG});
                           }} />
                           <InputField label="Title" value={img.title} onChange={(val: string) => {
                             const newG = [...data.galleryImages];
                             newG[i].title = val;
                             onUpdate({...data, galleryImages: newG});
                           }} />
                           <button onClick={() => deleteGalleryItem(i)} className="bg-rose-500 text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest mt-2">Delete</button>
                        </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
