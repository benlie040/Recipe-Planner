import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import { ThemeProvider } from '@mui/material'
import ChooseARecipePage from './pages/ChooseARecipe'
import PlanADayPage from './pages/PlanADay'
import PlanAWeekPage from './pages/PlanAWeek'
import RecipeDetailsPage from './pages/RecipeDetails'
import ShoppingDetailsPage from './pages/ShoppingDetails'
import { theme } from './themes/theme'
const router = createBrowserRouter([
    { path: '/choose-a-recipe/:date', element: <ChooseARecipePage /> },
    { path: '/plan-a-day/:date', element: <PlanADayPage /> },
    { path: '/', element: <PlanAWeekPage /> },
    { path: 'recipe-details/:date', element: <RecipeDetailsPage /> },
    { path: 'shopping-details', element: <ShoppingDetailsPage /> },
])

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    )
}
export default App
