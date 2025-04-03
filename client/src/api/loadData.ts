import { json } from 'react-router-dom'

export const recipeLoader = async () => {
    const response = await fetch('https://localhost:3000/data/recipes.json')

    if (!response.ok) {
        throw json({ message: 'Error 500' }, { status: 500 })
    } else {
        return response
    }
}
