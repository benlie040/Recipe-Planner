import AddIcon from '@mui/icons-material/Add'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { Collapse, Fab, Typography, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { format } from 'date-fns'
import { ReactNode, SyntheticEvent, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import Header from '../components/Header'
import RecipeCard from '../components/RecipeCard'
import ScrollTop, { Props } from '../components/ScrollTop'
import { useStoreActions, useStoreState } from '../hooks/storeHooks'
import { Day, Recipe, RecipesPerDay, Slot } from '../models/types'
import { theme } from '../themes/theme'

interface TabPanelProps {
    children?: ReactNode
    index: number
    value: number
}

//Custom Tab
const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box mt={2}>{children}</Box>}
        </div>
    )
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const PlanADayPage = (props: Props) => {
    // The passed date value from the URL is stored in a variable
    const { date } = useParams()
    const dateOfDay = new Date(date!)

    // The state to store the currently selected Tab
    const [value, setValue] = useState(0)

    // Store access
    const plannedDaysStore = useStoreState((state) => state.days)
    const deleteRecipeStore = useStoreActions((actions) => actions.deleteRecipe)
    let navigate = useNavigate()

    // Media queries
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

    // Initialyzing an array used for iterating the mealtype key

    const mealTypes: Slot[] = [Slot.Breakfast, Slot.Lunch, Slot.Dinner]

    const recipesOfDayArray: RecipesPerDay = {
        ['Breakfast']: { recipes: new Array() },
        ['Lunch']: { recipes: new Array() },
        ['Dinner']: { recipes: new Array() },
    }

    plannedDaysStore.forEach((day: Day) => {
        if (day.date.toDateString() === dateOfDay.toDateString()) {
            for (const key in day.recipesPerDay) {
                if (key === 'Breakfast') {
                    day.recipesPerDay.Breakfast.recipes.map((recipe: Recipe) => {
                        recipesOfDayArray['Breakfast'].recipes.push({ ...recipe })
                    })
                }
                if (key === 'Lunch') {
                    day.recipesPerDay.Lunch.recipes.map((recipe: Recipe) => {
                        recipesOfDayArray['Lunch'].recipes.push({ ...recipe })
                    })
                }
                if (key === 'Dinner') {
                    day.recipesPerDay.Dinner.recipes.map((recipe: Recipe) => {
                        recipesOfDayArray['Dinner'].recipes.push({ ...recipe })
                    })
                }
            }
        }
    })

    // Function to navigate to the main view
    const handleNavigate = () => {
        navigate('/', { state: { date: dateOfDay } })
    }

    // Function to remove a recipe from the state in the store
    const handleRemove = (recipe: Recipe) => {
        deleteRecipeStore([dateOfDay, recipe, mealTypes[value]])
    }
    // Sets the State for the onClick event of the selected tab
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
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
                toggleButton={true}
                date={date!}
                mealType={'Breakfast'}
            />
        )
    }

    return (
        <>
            <Header title="Plan a day" onBack={handleNavigate} date={dateOfDay} />

            <Typography
                m={2}
                variant="h4"
                noWrap
                component="h2"
                align="center"
                sx={{ flexGrow: 1, color: 'primary.main' }}
            >
                {format(dateOfDay, 'EEEE')}
            </Typography>
            {/* Tab menu for swtiching between the mealtypes */}
            <Box mt={5} sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant={matchesMD ? 'standard' : 'fullWidth'}
                        centered
                    >
                        <Tab
                            icon={<FreeBreakfastIcon />}
                            iconPosition={matchesLG ? 'start' : matchesMD ? 'start' : 'top'}
                            label="Breakfast"
                            {...a11yProps(0)}
                            sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
                        />
                        <Tab
                            icon={<LunchDiningIcon />}
                            iconPosition={matchesLG ? 'start' : matchesMD ? 'start' : 'top'}
                            label="Lunch"
                            {...a11yProps(1)}
                            sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
                        />
                        <Tab
                            icon={<RestaurantIcon />}
                            iconPosition={matchesLG ? 'start' : matchesMD ? 'start' : 'top'}
                            label="Dinner"
                            {...a11yProps(2)}
                            sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
                        />
                    </Tabs>
                </Box>
                {/* Tab shows all the selected recipes for breakfast for this day */}
                <CustomTabPanel value={value} index={0}>
                    {/* Floating action button linking to the CAR view for adding recipes */}
                    <Fab
                        color="primary"
                        aria-label="add"
                        component={Link}
                        to={`/choose-a-recipe/${format(dateOfDay, 'y-MM-dd')}`}
                        state={{ mealType: 'Breakfast' }}
                    >
                        <AddIcon />
                    </Fab>
                    <TransitionGroup>
                        {recipesOfDayArray['Breakfast'].recipes.map((recipe) => (
                            <Collapse key={recipe.ID}>{renderItem({ recipe, handleRemove })}</Collapse>
                        ))}
                    </TransitionGroup>
                </CustomTabPanel>
                {/* Tab shows all the selected recipes for lunch for this day */}
                <CustomTabPanel value={value} index={1}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        component={Link}
                        to={`/choose-a-recipe/${format(dateOfDay, 'y-MM-dd')}`}
                        state={{ mealType: 'Lunch' }}
                    >
                        <AddIcon />
                    </Fab>
                    <TransitionGroup>
                        {recipesOfDayArray['Lunch'].recipes.map((recipe) => (
                            <Collapse key={recipe.ID}>{renderItem({ recipe, handleRemove })}</Collapse>
                        ))}
                    </TransitionGroup>
                </CustomTabPanel>
                {/* Tab shows all the selected recipes for dinner for this day */}
                <CustomTabPanel value={value} index={2}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        component={Link}
                        to={`/choose-a-recipe/${format(dateOfDay, 'y-MM-dd')}`}
                        state={{ mealType: 'Dinner' }}
                    >
                        <AddIcon />
                    </Fab>
                    <TransitionGroup>
                        {recipesOfDayArray['Dinner'].recipes.map((recipe) => (
                            <Collapse key={recipe.ID}>{renderItem({ recipe, handleRemove })}</Collapse>
                        ))}
                    </TransitionGroup>
                </CustomTabPanel>
            </Box>
            <ScrollTop {...props}>
                <Fab size={matchesMD ? 'large' : 'small'} aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    )
}
export default PlanADayPage
