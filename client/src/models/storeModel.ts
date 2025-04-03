import { Action } from 'easy-peasy';
import { Day, Recipe, Slot } from './types';

export interface weekModel {
  selectedWeek: number
}

export interface StoreModel {
  days: Day[];
  addRecipe: Action<StoreModel, [date: Date, recipePlanned: Recipe, mealType: Slot, servings: number]>;
  deleteRecipe: Action<StoreModel, [date: Date, recipePlanned: Recipe, mealType: Slot]>;
}

