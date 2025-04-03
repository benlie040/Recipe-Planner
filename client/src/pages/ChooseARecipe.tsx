import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import {
    Box,
    Fab,
    FormControl,
    InputLabel,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    SnackbarCloseReason,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import jsonData from '../../public/recipes.json'
import Header from '../components/Header'
import RecipeCard from '../components/RecipeCard'
import ScrollTop, { Props } from '../components/ScrollTop'
import SearchEntryField from '../components/SearchEntryField '
import SelectServings from '../components/SelectServings'
import { useStoreActions } from '../hooks/storeHooks'
import { Recipe, Slot } from '../models/types'
import { theme } from '../themes/theme'

// Function to generate an array of a random selection of recipes
const randomGenerator = (recipesArray: Recipe[], Servings: number) => {
    let newRecipesArray: Recipe[] = []
    while (newRecipesArray.length < 30) {
        let randomIndex = Math.floor(Math.random() * recipesArray.length)
        if (newRecipesArray.every((recipe) => recipe.ID !== recipesArray[randomIndex].ID)) {
            const copy = [...recipesArray]
            copy[randomIndex].servings = Servings
            newRecipesArray.push({ ...copy[randomIndex] })
        }
    }
    return newRecipesArray
}

const ChooseARecipePage = (props: Props) => {
    // Json data of the backend recipes is stored in a variable
    const [dataObject, setdata] = useState(jsonData)

    // State for the number of selected servings
    const [Servings, setServings] = useState(1)

    // State for storing a random selection of recipes
    const [randomRecipes, setRandomRecipes] = useState(randomGenerator(dataObject.recipes, Servings))
    const [transitionRecipes, setTransitionRecipes] = useState(true)
    const { date } = useParams()
    const [open, setOpen] = useState(false)
    const [recipeAdded, setRecipeAdded] = useState('')

    let { state } = useLocation()

    // State for the selected type of meal
    const [mealType, setMealType] = useState(state.mealType)

    //Store access
    const addRecipeStore = useStoreActions((actions) => actions.addRecipe)

    // Hook for the redirect to the previous page
    let navigate = useNavigate()

    // Redirect to the previous page triggered by the arrow button of the Header
    const handleNavigate = () => {
        navigate(`/plan-a-day/${date}`)
    }
    // Closing function for the snackbar
    const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    useEffect(() => {
        fetch('http://localhost:5173/recipes.json')
            .then((response) => {
                return response.json()
            })
            .then((resData: Recipe[]) => {
                const temp = randomGenerator(resData, Servings)
                setRandomRecipes(temp)
            })
    }, [])

    // Function to select the number of servings
    const handleSelect = (event: SelectChangeEvent) => {
        setServings(Number(event.target.value))

        setRandomRecipes((prev) => {
            prev.map((recipe) => (recipe.servings = Number(event.target.value)))
            return prev
        })
    }

    // Recipe search function
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const result = dataObject.recipes.filter((recipe) =>
            recipe.name!.includes(event.target.value[0].toUpperCase() + event.target.value.slice(1).toLowerCase())
        )

        setRandomRecipes(result)
    }
    // Function to add or remove a recipe
    const handleRemove = (recipePlanned: Recipe) => {
        setRandomRecipes((prev) => {
            return prev.filter((recipe) => recipe.ID !== recipePlanned.ID)
        })
        addRecipeStore([new Date(date!), recipePlanned, mealType, Servings])
        setRecipeAdded(recipePlanned.name)
        setOpen(true)
        setTransitionRecipes(true)
    }
    // Function for randomizing the recipe selection
    const handleClick = () => {
        setTransitionRecipes(false)
        setRandomRecipes(randomGenerator(dataObject.recipes, Servings))
    }

    // Select-box for type of meal
    const handleChange = (event: SelectChangeEvent) => {
        setMealType(event.target.value as Slot)
    }

    interface RenderItemOptions {
        recipe: Recipe
        handleRemove: (recipePlanned: Recipe) => void
    }

    function renderItem({ recipe, handleRemove }: RenderItemOptions) {
        return (
            <RecipeCard
                //key={index}
                recipe={recipe}
                callback={handleRemove}
                toggleButton={false}
                servingsReset={true}
                date={date!}
                mealType={mealType}
            />
        )
    }

    // Media queries
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'))
    const textSsecondary = 'text.secondary'

    return (
        <>
            <Box component={'div'} id="back-to-top-anchor"></Box>
            <Header title="Choose a recipe" onBack={handleNavigate} />
            <Box component={'div'} p={1} mb={3} mt={2}>
                <SearchEntryField onChange={handleSearch} />
            </Box>
            <Stack
                spacing={2}
                mb={2}
                direction="row"
                justifyContent="center"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Box component={'div'}>
                    <SelectServings servings={String(Servings)} onChange={handleSelect} />
                </Box>
                <FormControl sx={{ minWidth: 220 }}>
                    <InputLabel id="select-mealtype-label">
                        <Typography
                            variant="subtitle1"
                            fontWeight="fontWeightBold"
                            sx={{
                                fontSize: { xs: '16px', md: '20px' },
                            }}
                        >
                            Type of meal
                        </Typography>
                    </InputLabel>
                    <Select
                        MenuProps={{
                            sx: {
                                color: 'red',
                                '&& .Mui-selected': {
                                    color: 'primary.main',
                                },
                            },
                        }}
                        variant="standard"
                        labelId="select-mealtype-label"
                        id="select-mealtype"
                        value={mealType}
                        label="meal-type"
                        onChange={handleChange}
                        sx={{
                            fontSize: '16px',
                            fontWeight: 200,
                            '& .MuiSelect-standard': {
                                color: textSsecondary,
                            },
                        }}
                    >
                        <MenuItem value={'Breakfast'}>
                            <ListItem>
                                {matchesMD && (
                                    <ListItemIcon>
                                        <FreeBreakfastIcon />
                                    </ListItemIcon>
                                )}

                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant="body2" fontWeight="fontWeightRegular">
                                            BREAKFAST
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </MenuItem>
                        <MenuItem value={'Lunch'}>
                            <ListItem>
                                {matchesMD && (
                                    <ListItemIcon>
                                        <LunchDiningIcon />
                                    </ListItemIcon>
                                )}

                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant="body2" fontWeight="fontWeightRegular">
                                            LUNCH
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </MenuItem>

                        <MenuItem value={'Dinner'}>
                            <ListItem>
                                {matchesMD && (
                                    <ListItemIcon>
                                        <RestaurantIcon />
                                    </ListItemIcon>
                                )}

                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant="body2" fontWeight="fontWeightRegular">
                                            DINNER
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Fab
                onClick={handleClick}
                color="primary"
                style={{
                    border: 'none',
                    outline: 'none',
                    color: 'blue',
                }}
                size={matchesMD ? 'large' : 'medium'}
            >
                <AutorenewOutlinedIcon
                    fontWeight="fontWeightBold"
                    sx={{
                        fontSize: { xs: 30, md: 40, lg: 50 },
                        fill: 'white',
                        color: 'primary',
                    }}
                />
            </Fab>
            {transitionRecipes ? (
                <TransitionGroup>
                    {randomRecipes.map((recipe) => (
                        <Collapse key={recipe.ID}>{renderItem({ recipe, handleRemove })}</Collapse>
                    ))}
                </TransitionGroup>
            ) : (
                randomRecipes.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={recipe}
                        callback={handleRemove}
                        toggleButton={false}
                        servingsReset={true}
                        date={date!}
                        mealType={mealType}
                    />
                ))
            )}

            <ScrollTop {...props}>
                <Fab size={matchesMD ? 'large' : 'small'} aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={`${Servings}\u00D7 ${recipeAdded} added to ${mealType.toLowerCase()}`}
            />
        </>
    )
}
export default ChooseARecipePage
