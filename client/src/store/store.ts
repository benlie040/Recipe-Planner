import { isEqual } from 'date-fns';
import { action, createStore } from 'easy-peasy';
import { StoreModel } from '../models/storeModel';
import { Day, RecipesPerDay, Slot } from '../models/types';

const store = createStore<StoreModel>({
    days: [],
    addRecipe: action((state, [date, recipePlanned, mealType, servings]) => {
        const recipeDay: RecipesPerDay = {
            [Slot.Breakfast]: {
                recipes: new Array(),
            },
            [Slot.Lunch]: {
                recipes: new Array(),
            },
            [Slot.Dinner]: {
                recipes: new Array(),
            },
        }
        recipeDay[Slot[mealType]].recipes.push({ ...recipePlanned })
        const plannedDay: Day = { date: new Date(date), recipesPerDay: { ...recipeDay } }
        const findDay = state.days.find((day) => isEqual(day.date.toDateString(), plannedDay.date.toDateString()))
        const findDayIndex = state.days.findIndex((day) => isEqual(day.date.toDateString(), plannedDay.date.toDateString()))
        if (state.days.length > 0) {
            if (findDay) {
                const findRecipeIndex = findDay.recipesPerDay[Slot[mealType]].recipes.findIndex(
                    (recipe) => recipe.ID === recipePlanned.ID
                )
                
                if (findRecipeIndex > -1) {
                    state.days[findDayIndex].recipesPerDay[Slot[mealType]].recipes[findRecipeIndex].servings
                    = state.days[findDayIndex].recipesPerDay[Slot[mealType]].recipes[findRecipeIndex].servings + servings
                }
                else state.days[findDayIndex].recipesPerDay[Slot[mealType]].recipes.push({...recipePlanned})
            } else state.days.push({ ...plannedDay })
        } else state.days.push({ ...plannedDay })      
    }),
    
    deleteRecipe: action((state, [date, recipePlanned, mealType]) => {
        const recipeDay: RecipesPerDay = {
            [Slot.Breakfast]: {
                recipes: new Array(),
            },
            [Slot.Lunch]: {
                recipes: new Array(),
            },
            [Slot.Dinner]: {
                recipes: new Array(),
            },
        }
        recipeDay[Slot[mealType]].recipes.push({ ...recipePlanned })
        const plannedDay: Day = { date: new Date(date), recipesPerDay: { ...recipeDay } }
        const findDay = state.days.find((day) => isEqual(day.date.toDateString(), plannedDay.date.toDateString()))
        const findDayIndex = state.days.findIndex((day) => isEqual(day.date.toDateString(), plannedDay.date.toDateString()))
        if (state.days.length > 0) {
            if (findDay) {
                const findRecipeIndex = findDay.recipesPerDay[Slot[mealType]].recipes.findIndex(
                    (recipe) => recipe.ID === recipePlanned.ID
                )
                console.log(findRecipeIndex)
                if (findRecipeIndex > -1) {
                    if (findRecipeIndex === 0) {
                    state.days[findDayIndex].recipesPerDay[Slot[mealType]].recipes.shift()
                }
                else {
                    state.days[findDayIndex].recipesPerDay[Slot[mealType]].recipes.splice(findRecipeIndex,findRecipeIndex)
                    
                    }
                }
            } 
        }    
    }),

});

export default store;


