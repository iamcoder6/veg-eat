
import { Zone, Recipe } from './types.ts';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Dal Baati Churma',
    description: 'The soul of Rajasthan. Hard wheat rolls (Baati) served with spicy lentils (Dal) and sweet crumbled wheat (Churma), drenched in pure desi ghee.',
    image: 'https://images.unsplash.com/photo-1631515233109-67995f504312?q=80&w=1200&auto=format&fit=crop',
    zone: Zone.WEST,
    prepTime: '60 mins',
    calories: 550,
    ingredients: ['Whole Wheat Flour', 'Ghee', 'Moong Dal', 'Jaggery', 'Cardamom'],
    spiceLevel: 'Medium'
  },
  {
    id: '7',
    title: 'Puran Poli',
    description: 'A legendary Maharashtrian sweet flatbread stuffed with a sweet lentil filling made of chana dal and jaggery, flavored with cardamom and nutmeg.',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=1200&auto=format&fit=crop',
    zone: Zone.WEST,
    prepTime: '45 mins',
    calories: 280,
    ingredients: ['Chana Dal', 'Jaggery', 'Wheat Flour', 'Ghee', 'Cardamom'],
    spiceLevel: 'Mild'
  },
  {
    id: '2',
    title: 'Hyderabadi Veg Biryani',
    description: 'Fragrant basmati rice layered with seasonal vegetables, slow-cooked (Dum) with saffron, mint, and a secret blend of Nizami spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=1200&auto=format&fit=crop',
    zone: Zone.SOUTH,
    prepTime: '50 mins',
    calories: 420,
    ingredients: ['Basmati Rice', 'Saffron', 'Mint', 'Yogurt', 'Fried Onions'],
    spiceLevel: 'Hot'
  },
  {
    id: '3',
    title: 'Indori Poha',
    description: 'A light yet satisfying breakfast of flattened rice flakes, steamed with turmeric and topped with spicy sev, pomegranate, and a dash of jeeravan.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1200&auto=format&fit=crop',
    zone: Zone.CENTRAL,
    prepTime: '15 mins',
    calories: 210,
    ingredients: ['Flattened Rice', 'Turmeric', 'Jeeravan Masala', 'Sev', 'Pomegranate'],
    spiceLevel: 'Mild'
  },
  {
    id: '4',
    title: 'Kashmiri Dum Aloo',
    description: 'Baby potatoes simmered in a rich, spicy curd-based gravy flavored with dry ginger and fennel. A warming winter staple from the valley.',
    image: 'https://images.unsplash.com/photo-1589187151003-0dd4a6ad2a18?q=80&w=1200&auto=format&fit=crop',
    zone: Zone.NORTH,
    prepTime: '40 mins',
    calories: 310,
    ingredients: ['Potatoes', 'Fennel Powder', 'Dry Ginger', 'Kashmiri Chili', 'Curd'],
    spiceLevel: 'Hot'
  },
  {
    id: '5',
    title: 'Ghugni Chaat',
    description: 'A popular street food from Bengal made with yellow dried peas, cooked with a unique bhaja masala and served with chopped onions and tamarind.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb3304a?q=80&w=1200&auto=format&fit=crop',
    zone: Zone.EAST,
    prepTime: '30 mins',
    calories: 250,
    ingredients: ['Yellow Peas', 'Bhaja Masala', 'Tamarind', 'Green Chilies', 'Coriander'],
    spiceLevel: 'Medium'
  }
];

export const MEAL_PLANS = [
  {
    day: 'Monday',
    meals: [
      { time: '08:30 AM', dish: 'Misal Pav', type: 'Breakfast' },
      { time: '01:00 PM', dish: 'Palak Paneer & Roti', type: 'Lunch' },
      { time: '08:00 PM', dish: 'Khichdi Kadhi', type: 'Dinner' }
    ]
  },
  {
    day: 'Tuesday',
    meals: [
      { time: '08:30 AM', dish: 'Appam & Stew', type: 'Breakfast' },
      { time: '01:00 PM', dish: 'Avial & Rice', type: 'Lunch' },
      { time: '08:00 PM', dish: 'Baingan Bharta', type: 'Dinner' }
    ]
  }
];
