import { Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { endOfWeek, isBefore, isEqual, startOfWeek } from 'date-fns'
import { isAfter } from 'date-fns/isAfter'
import { useEffect, useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ShoppingCalendar from '../components/ShoppingCalendar'
import ShoppingList from '../components/ShoppingList'
import { useStoreState } from '../hooks/storeHooks'
import { Ingredient, Recipe } from '../models/types'

const ShoppingDetailsPage = () => {
    const [showList, setsShowList] = useState(false)
    const ingridientsListTemp: Ingredient[] = new Array()
    const [ingredientsList, setIngredientsList] = useState(ingridientsListTemp)
    const [timePicked, handleTimeRange] = useState([
        new DateObject(startOfWeek(new Date(), { weekStartsOn: 1 })),
        new DateObject(endOfWeek(new Date(), { weekStartsOn: 1 })),
    ])
    let navigate = useNavigate()
    // Store access
    const plannedDaysStore = useStoreState((state) => state.days)
    // Scroll to top after rendering shoppingList component
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // State for rendering the ShoppingList component
    const handleShowList = (show: boolean) => {
        setsShowList(show)
    }
    // Trigger for showing the showing and creating the ingridients list only on the first render of the view
    const [initialRender, setInitialRender] = useState(0)
    if (initialRender < 1) {
        setInitialRender(1)
    }
    // Function to create an array with all ingridients
    const addToIngridientsList = (recipe: Recipe, ingridientsListTemp: Ingredient[]) => {
        recipe.ingredients.forEach((ingridient) => {
            if (ingridientsListTemp.length === 0) {
                const newIngridient = { ...ingridient }
                newIngridient.amount = newIngridient.amount * recipe.servings
                ingridientsListTemp.push({ ...newIngridient })
            } else if (
                ingridientsListTemp.every((ingridientsListTempItem) => ingridientsListTempItem.ID !== ingridient.ID)
            ) {
                const newIngridient = { ...ingridient }
                newIngridient.amount = newIngridient.amount * recipe.servings
                ingridientsListTemp.push({ ...newIngridient })
            } else if (
                ingridientsListTemp.find((ingridientsListTempItem) => ingridientsListTempItem.ID === ingridient.ID)
            ) {
                const ingridientsListTempItem = ingridientsListTemp.find(
                    (ingridientsListTempItem) => ingridientsListTempItem.ID === ingridient.ID
                )
                ingridientsListTempItem!.amount = ingridientsListTempItem!.amount + ingridient.amount * recipe.servings
            }
        })
    }

    // Array with all ingridients of the selected timerange will be created,
    // when the the onClick event for showing the list is fired and on the first render
    useEffect(() => {
        plannedDaysStore.forEach((day) => {
            if (
                (isAfter(
                    day.date.toDateString(),
                    new Date(timePicked[0].year, timePicked[0].month.index, timePicked[0].day).toDateString()
                ) &&
                    isBefore(
                        day.date.toDateString(),
                        new Date(timePicked[1].year, timePicked[1].month.index, timePicked[1].day).toDateString()
                    )) ||
                isEqual(
                    day.date.toDateString(),
                    new Date(timePicked[0].year, timePicked[0].month.index, timePicked[0].day).toDateString()
                ) ||
                isEqual(
                    day.date.toDateString(),
                    new Date(timePicked[1].year, timePicked[1].month.index, timePicked[1].day).toDateString()
                )
            ) {
                day.recipesPerDay.Breakfast.recipes.forEach((recipe) =>
                    addToIngridientsList(recipe, ingridientsListTemp)
                )
                day.recipesPerDay.Lunch.recipes.forEach((recipe) => addToIngridientsList(recipe, ingridientsListTemp))
                day.recipesPerDay.Dinner.recipes.forEach((recipe) => addToIngridientsList(recipe, ingridientsListTemp))
            }

            setIngredientsList(ingridientsListTemp)
        })
    }, [showList, initialRender])

    const ingredientsListCopy = [...ingredientsList]

    // Function for switching the state of the checkbox on/off
    const handleCheck = (ID: string) => {
        setIngredientsList(() => {
            ingredientsListCopy.forEach((ingredient) => {
                if (ingredient.ID === ID) {
                    ingredient.checked = !ingredient.checked
                }
            })
            return ingredientsListCopy
        })
    }
    // Function to go to back to the PAW view
    const handleNavigate = () => {
        navigate(-1)
    }
    return (
        <>
            <Header title="Shopping details" onBack={handleNavigate} />
            <ShoppingCalendar handleTime={handleTimeRange} handleShowList={handleShowList} timePicked={timePicked} />
            <Box display="flex" justifyContent="center" alignItems="right" /* minHeight="100vh" */>
                <TableContainer>
                    <Table sx={{ justifyContent: 'right' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{ width: '20%' }}>
                                    <Typography color="text.secondary" variant="body2" fontWeight="fontWeightBold">
                                        Check
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" style={{ width: '40%' }}>
                                    <Typography color="text.secondary" variant="body2" fontWeight="fontWeightBold">
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" style={{ width: '25%' }}>
                                    <Typography color="text.secondary" variant="body2" fontWeight="fontWeightBold">
                                        Amount
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" style={{ width: '15%' }}>
                                    <Typography color="text.secondary" variant="body2" fontWeight="fontWeightBold">
                                        Unit
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {(showList || initialRender === 1) && (
                            <ShoppingList ingredients={ingredientsList} onChange={handleCheck} />
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default ShoppingDetailsPage
