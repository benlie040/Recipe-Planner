import { useEffect, useState } from 'react'
import { recipeLoader } from '../api/loadData'
import { Recipe } from '../models/types'

export const useLoadData = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const f = async () => {
            const data = await recipeLoader()
            const json = await data.json()
            setRecipes(json.meals)
            setLoading(false)
        }

        f()
    }, [])

    return { recipes, loading }
}
