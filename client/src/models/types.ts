export type Ingredient = {
    ID: string
    name: string
    amount: number
    unit?: string
    checked: boolean

}

export enum Slot {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
}

export type Recipe = {
    name: string
    imageUrl: string
    ID: string
    category: string
    difficulty: number
    timePreparation: number
    timeCooking: number
    description: string
    instructions: string[]
    servings: number
    ingredients: Ingredient[]
}

export type RecipesPerDay = { [key in Slot]: { recipes: Recipe[]}}
export type Day = { date: Date, recipesPerDay: RecipesPerDay}


