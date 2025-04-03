import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined'
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import {
    Box,
    ButtonBase,
    CardActionArea,
    CardMedia,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Stack,
    useMediaQuery,
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Day, Recipe } from '../models/types'
import { theme } from '../themes/theme'

type DayCardProps = {
    cardContent: Day
    isDayBefore?: boolean
}

const DayCard = (props: DayCardProps) => {
    const { cardContent, isDayBefore } = props

    let cardColor = 'inherit'
    let cardFontColor = 'inherit'
    let typoErrorColor = 'text.disabled'
    let disabled = false

    // Query past or future days for the color layout
    if (isDayBefore) {
        cardColor = 'text.disabled'
        cardFontColor = 'text.disabled'
        disabled = true
    } else if (cardContent.recipesPerDay.Breakfast.recipes.length === 0) {
        typoErrorColor = 'text.disabled'
    }

    // Media queries
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

    // Function for returning the JSX for a single item of the ImageList component.
    const returnImage = (item: Recipe, mealType: string, index: number) => {
        return (
            // Image linking to the Recipe Detail view
            <Link
                to={`/recipe-details/${format(cardContent.date, 'y-MM-dd')}`}
                state={{ recipe: item, date: cardContent.date, mealType: mealType, servings: 1, backLink: '/' }}
            >
                <ImageListItem key={item.ID}>
                    <Box component={'div'} key={index}>
                        <CardMedia component="img" image={item.imageUrl} title={item.name} alt={item.name} />
                    </Box>
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
                        }}
                        title={
                            matchesMD ? (
                                <Typography variant="subtitle1" align="left">
                                    {`${item.servings}\u00D7 ${item.name}`}
                                </Typography>
                            ) : (
                                <Typography variant="subtitle1" align="left">
                                    {`${item.servings}\u00D7`}
                                </Typography>
                            )
                        }
                        position="top"
                        actionIcon={
                            <IconButton sx={{ color: 'white' }} aria-label={`star ${item}`}>
                                {mealType === 'Breakfast' ? (
                                    <FreeBreakfastOutlinedIcon />
                                ) : mealType === 'Lunch' ? (
                                    <LunchDiningOutlinedIcon sx={{ fontSize: { xs: 15, sm: 25 } }} />
                                ) : (
                                    <RestaurantOutlinedIcon />
                                )}
                            </IconButton>
                        }
                        actionPosition="left"
                    />
                </ImageListItem>
            </Link>
        )
    }

    return (
        <Stack spacing={1} display="flex" justifyContent="center" alignItems="center" direction="row" p={1} m={1}>
            <CardActionArea
                disabled={isDayBefore}
                style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                }}
            >
                {/* Card Linking to the CAR view */}
                <ButtonBase
                    disabled={disabled}
                    disableRipple={true}
                    component={Link}
                    sx={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                    }}
                    to={`/plan-a-day/${format(cardContent.date, 'y-MM-dd')}`}
                >
                    <Card sx={{ bgcolor: cardColor, width: '100%', boxShadow: 4, borderRadius: 2 }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography
                                color={cardFontColor}
                                variant="body1"
                                fontWeight="fontWeightBold"
                                component="div"
                                align="left"
                            >
                                {format(cardContent.date, 'EEEE')}
                            </Typography>
                            <Typography
                                color={cardFontColor}
                                variant="body2"
                                fontWeight="fontWeightLight"
                                component="div"
                                align="left"
                            >
                                {format(cardContent.date, 'dd MMMM')}
                            </Typography>
                            {/* Query to check if a day contains any recipes */}
                            {cardContent.recipesPerDay.Breakfast.recipes.length === 0 &&
                            cardContent.recipesPerDay.Lunch.recipes.length === 0 &&
                            cardContent.recipesPerDay.Dinner.recipes.length === 0 ? (
                                <Typography
                                    color={cardFontColor}
                                    variant="body2"
                                    fontWeight="fontWeightLight"
                                    component="div"
                                    align="left"
                                    sx={{ color: typoErrorColor }}
                                >
                                    No recipes selected
                                </Typography>
                            ) : (
                                <Box
                                    sx={{
                                        listStyle: 'none',
                                        display: 'flex',
                                        flexFlow: 'wrap row',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <ImageList cols={matchesLG ? 7 : matchesMD ? 6 : 5} rowHeight={'auto'} gap={2}>
                                        {cardContent.recipesPerDay.Breakfast.recipes.map((item, index) =>
                                            returnImage(item, 'Breakfast', index)
                                        )}
                                        {cardContent.recipesPerDay.Lunch.recipes.map((item, index) =>
                                            returnImage(item, 'Lunch', index)
                                        )}
                                        {cardContent.recipesPerDay.Dinner.recipes.map((item, index) =>
                                            returnImage(item, 'Dinner', index)
                                        )}
                                    </ImageList>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </ButtonBase>
            </CardActionArea>
        </Stack>
    )
}
export default DayCard
