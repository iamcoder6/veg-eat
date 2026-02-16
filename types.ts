
export enum Zone {
  NORTH = 'North India',
  SOUTH = 'South India',
  EAST = 'East India',
  WEST = 'West India',
  CENTRAL = 'Central India'
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  zone: Zone;
  prepTime: string;
  calories: number;
  ingredients: string[];
  spiceLevel: 'Mild' | 'Medium' | 'Hot';
}

export interface MealPlan {
  day: string;
  meals: {
    time: string;
    dish: string;
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  }[];
}
