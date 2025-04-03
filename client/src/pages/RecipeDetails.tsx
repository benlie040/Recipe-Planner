import { Snackbar, SnackbarCloseReason, useScrollTrigger } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import RecipeDetails from '../components/RecipeDetails'
import { useStoreActions } from '../hooks/storeHooks'

const RecipeDetailsPage = () => {
    const [open, setOpen] = useState(false)
    let navigate = useNavigate()
    let { state } = useLocation()
    const { date } = useParams()
    const addRecipeStore = useStoreActions((actions) => actions.addRecipe)
    const trigger = useScrollTrigger()

    const handleNavigate = () => {
        navigate(state.backLink, { state: { date: date, mealType: state.mealType } })
    }

    const handleAddRecipe = () => {
        addRecipeStore([new Date(state.date!), state.recipe, state.mealType, state.servings])
        setOpen(true)
    }
    const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    return (
        <>
            <Header title="Recipe details" onBack={handleNavigate} />
            <RecipeDetails recipe={state.recipe} callback={handleAddRecipe} />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={`${state.servings}\u00D7 ${state.recipe.name} added to ${state.mealType.toLowerCase()}`}
            />
        </>
    )
}
export default RecipeDetailsPage
