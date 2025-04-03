import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, CardActionArea, CardMedia, Fab, Rating, Stack, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Recipe } from '../models/types'
import { theme } from '../themes/theme'

type RecipeCardProps = {
    recipe: Recipe
    callback: (recipe: Recipe) => void
    toggleButton?: boolean
    servingsReset?: boolean
    date: string
    mealType: string
}

const RecipeCard = (props: RecipeCardProps) => {
    const { recipe, callback, toggleButton, servingsReset, date, mealType } = props

    // Media queries
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

    // Setting the Servings for RecipeDetails page depending on the referrer
    const recipeResetServings = { ...recipe }
    recipeResetServings.servings = servingsReset ? 1 : recipeResetServings.servings

    // Storing the text for the card content in an array
    const recipeCardArray = [
        recipe.category,
        `Servings: ${recipe.servings}`,
        `Time: Preparation ${recipe.timePreparation}m, Cooking ${recipe.timeCooking}m`,
    ]

    // Parent component's function is called to delete or add the recipe
    const handleClick = () => {
        const recipeCopy = { ...recipe }
        callback(recipeCopy)
    }

    return (
        <Box key={recipe.ID} display="div" m={1} bgcolor="inherit">
            <Stack spacing={1} p={1} direction="row">
                <Grid container spacing={1}>
                    <Grid item xs={11} lg={11} container>
                        <CardActionArea>
                            <Link
                                to={`/recipe-details/${recipe.ID}`}
                                state={{
                                    recipe: recipeResetServings,
                                    date: date,
                                    mealType: mealType,
                                    servings: 1,
                                    backLink: toggleButton ? '/plan-a-day/' + date : '/choose-a-recipe/' + date,
                                }}
                            >
                                <Card sx={{ width: '100%', boxShadow: 5, borderRadius: 4 }}>
                                    <Grid item xs={12} lg={12} container direction="row">
                                        <Grid
                                            item
                                            xs={6.2}
                                            sm={5}
                                            md={4}
                                            lg={3.5}
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="flex-start"
                                            spacing={2}
                                        >
                                            <Grid item xs={2} md={2} lg={2}>
                                                <CardMedia
                                                    component="img"
                                                    image={recipe.imageUrl}
                                                    title={recipe.name}
                                                    alt={recipe.name}
                                                    sx={{ objectFit: 'contain' }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={5.8}
                                            sm={7}
                                            md={8}
                                            lg={8.5}
                                            container
                                            direction="column"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                            zeroMinWidth
                                        >
                                            <Stack spacing={1} direction="column" justifyContent="flex-start">
                                                <CardContent>
                                                    <Typography
                                                        variant="h5"
                                                        component="h3"
                                                        fontWeight="fontWeightBold"
                                                        align="left"
                                                        sx={{
                                                            py: { xs: 0, md: 0.5, lg: 0.7 },
                                                        }}
                                                    >
                                                        {recipe.name}
                                                    </Typography>

                                                    {recipeCardArray.map((item, index) => (
                                                        <Typography
                                                            style={{ overflowWrap: 'break-word' }}
                                                            key={index}
                                                            variant="body2"
                                                            fontWeight="fontWeightRegular"
                                                            align="left"
                                                            sx={{
                                                                py: { xs: 0, md: 0.5, lg: 0.7 },
                                                            }}
                                                        >
                                                            {item}
                                                        </Typography>
                                                    ))}
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ mr: 2 }}>
                                                            <Typography
                                                                variant="body2"
                                                                fontWeight="fontWeightRegular"
                                                                align="left"
                                                                sx={{
                                                                    py: { xs: 0, md: 0.5, lg: 0.7 },
                                                                }}
                                                            >
                                                                Difficulty:
                                                            </Typography>
                                                        </Box>
                                                        <Rating
                                                            name="difficulty"
                                                            value={recipe.difficulty}
                                                            readOnly
                                                            size={matchesLG ? 'large' : matchesMD ? 'medium' : 'small'}
                                                        />
                                                    </Box>
                                                </CardContent>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Link>
                        </CardActionArea>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            {toggleButton ? (
                                <Fab
                                    disableRipple
                                    color="error"
                                    onClick={handleClick}
                                    size={matchesLG ? 'large' : matchesMD ? 'medium' : 'small'}
                                    sx={{
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                >
                                    <CloseOutlinedIcon sx={{ fontSize: { xs: '75', lg: '66' } }} />
                                </Fab>
                            ) : (
                                <Fab
                                    disableRipple
                                    color="primary"
                                    onClick={handleClick}
                                    size={matchesLG ? 'large' : matchesMD ? 'medium' : 'small'}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                >
                                    <AddOutlinedIcon sx={{ fontSize: { xs: '75', lg: '66' } }} />
                                </Fab>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}
export default RecipeCard
