import { add, addWeeks, format, isBefore, subWeeks } from 'date-fns'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BottomNavigation from '../components/BottomNavigation'
import DayCard from '../components/DayCard'
import Header from '../components/Header'
import { Props } from '../components/ScrollTop'
import WeekSelector from '../components/WeekSelector'
import { useStoreState } from '../hooks/storeHooks'
import { Day, Recipe, RecipesPerDay } from '../models/types'

const PlanAWeekPage = (props: Props) => {
    /*
    Accessing the date data passed with help of the 
    location.state from the Plan A Day view with the
    useLocation Hook.
     */
    let location = useLocation()
    const currentDate: Date = location.state ? location.state.date : new Date()
    /*
    After storing the location.state into a variable, the state 
    needs to be deleted, so in case the App gets reloaded the 
    current date/week will be displayed by this view
     */
    window.history.replaceState({}, '')
    /*
    State for the date of the week, 
    which is selected by the weekSelector component
    */
    const [calendarWeek, setCalendarWeek] = useState(currentDate)
    // Store access
    const plannedDaysStore = useStoreState((state) => state.days)
    /* 
    Adding 1 week to the calendarWeek state, when a click event 
    is triggered from the weekSelector child component. 
    */
    const handleWeekUp = () => {
        setCalendarWeek(addWeeks(calendarWeek, 1))
    }
    /* 
    Sutrabcting 1 week from the calendarWeek state, 
    when a click event is triggered from the 
    weekSelector child component. 
    */
    const handleWeekDown = () => {
        setCalendarWeek(subWeeks(calendarWeek, 1))
    }

    const dataOfWeek: Day[] = new Array()
    const datesOfWeekArray = new Array()

    for (let i = 0; i < 7; i++) {
        const plannedWeekDays = {
            date: new Date(),
            recipesPerDay: {
                ['Breakfast']: { recipes: new Array() },
                ['Lunch']: { recipes: new Array() },
                ['Dinner']: { recipes: new Array() },
            },
        }
        const recipesOfDayArray: RecipesPerDay = {
            ['Breakfast']: { recipes: new Array() },
            ['Lunch']: { recipes: new Array() },
            ['Dinner']: { recipes: new Array() },
        }
        const dayOfWeek: number = Number(format(calendarWeek, 'i'))
        const distanceInDays = i - dayOfWeek + 1
        const computedDate = add(calendarWeek, { days: distanceInDays })
        datesOfWeekArray.push(computedDate)

        plannedDaysStore.forEach((day: Day) => {
            if (day.date.toDateString() === computedDate.toDateString()) {
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

                plannedWeekDays.recipesPerDay.Breakfast.recipes = [...recipesOfDayArray['Breakfast'].recipes]
                plannedWeekDays.recipesPerDay.Lunch.recipes = [...recipesOfDayArray['Lunch'].recipes]
                plannedWeekDays.recipesPerDay.Dinner.recipes = [...recipesOfDayArray['Dinner'].recipes]
            }
        })
        plannedWeekDays.date = computedDate
        dataOfWeek.push({ ...plannedWeekDays })
    }

    return (
        <>
            <Header title="Plan a week" />

            <WeekSelector calendarWeek={calendarWeek} onWeekUp={handleWeekUp} onWeekDown={handleWeekDown} />

            {dataOfWeek.map((dayData, index) => (
                <div key={index}>
                    {isBefore(dayData.date.toDateString(), new Date().toDateString()) ? (
                        <DayCard cardContent={dayData} isDayBefore={true} />
                    ) : (
                        <DayCard cardContent={dayData} />
                    )}
                </div>
            ))}
            {/* <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop> */}
            <BottomNavigation />
        </>
    )
}
export default PlanAWeekPage
