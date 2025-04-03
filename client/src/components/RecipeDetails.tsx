import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Fab,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Recipe } from '../models/types'
import { theme } from '../themes/theme'

type RecipeDetailsProps = {
    recipe: Recipe
    callback: () => void
}

const RecipeDetails = (props: RecipeDetailsProps) => {
    const { recipe, callback } = props

    // Array for Iterating the recipe props
    const recipeCardArray = [
        recipe.name,
        recipe.category,
        `Servings: ${recipe.servings}`,
        `Time: Preparation ${recipe.timePreparation}m, Cooking ${recipe.timeCooking}m`,
        <Rating name="read-only" value={3} readOnly />,
    ]

    const matchesSM = useMediaQuery(theme.breakpoints.up('xs'))

    return (
        <>
            {/* Image */}
            <Grid container spacing={1} p={2} direction="column">
                <Grid item spacing={2} p={2} container direction="row">
                    <Grid item xs={12} md={5} lg={5}>
                        <Box
                            component="img"
                            sx={{
                                minHeight: { xs: 300, md: 250, lg: 400 },
                                minWidth: { xs: 300, md: 250, lg: 400 },
                                maxHeight: { xs: '100%', md: '100%', lg: '100%' },
                                maxWidth: { xs: '100%', md: '100%', lg: '100%' },
                            }}
                            alt={recipe.name}
                            src={recipe.imageUrl}
                        />
                    </Grid>
                    {/* Segment for recipe overview */}
                    <Grid item xs={8} md={5} lg={5}>
                        <Stack spacing={2} p={2} direction="column">
                            {recipeCardArray.map((item, index) => (
                                <Typography
                                    variant={index === 0 ? 'h1' : 'body2'}
                                    component={index === 0 ? 'h3' : 'div'}
                                    paragraph
                                    key={index}
                                    fontWeight={index === 0 ? 'fontWeightBold' : 'fontWeightRegular'}
                                    align="left"
                                >
                                    {index === 4 ? 'Difficulty: ' : ''}
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>
                    {/* Segment for add recipe button */}
                    <Grid item xs={4} md={1} lg={1.2}>
                        <Box display="flex" justifyContent="flex-end">
                            <Fab color="primary" aria-label="add-recipe" onClick={callback}>
                                <AddOutlinedIcon
                                    sx={{
                                        fontSize: 40,
                                    }}
                                />
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
                {/* Segment for recipe description */}
                <Grid item xs={8} md={3} lg={2}>
                    <Typography m={2} mt={2} variant="h6" fontWeight="fontWeightBold" component="div" align="left">
                        Description
                    </Typography>
                    <Box component="div" sx={{ maxWidth: { md: '90%' } }}>
                        <Typography m={2} variant="body1" fontWeight="fontWeightregular" component="div" align="left">
                            {recipe.description}
                        </Typography>
                    </Box>

                    {!matchesSM ? (
                        <>
                            {/* Segment for recipe Ingredients */}
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    <Typography
                                        m={2}
                                        mt={3}
                                        variant="h6"
                                        fontWeight="fontWeightBold"
                                        component="div"
                                        align="left"
                                    >
                                        Ingredients
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer sx={{ boxShadow: 'none' }}>
                                        <Table sx={{ minWidth: 300, maxWidth: 500 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <Typography variant="body1">Name</Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="body1">Amount</Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="body1">Unit</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {recipe.ingredients.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell component="th" scope="row">
                                                            <Typography variant="body1">{row.name}</Typography>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Typography variant="body1">
                                                                {row.amount * recipe.servings}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Typography variant="body1">{row.unit}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                            {/* Segment for recipe instructions */}
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    <Typography
                                        m={2}
                                        mt={3}
                                        variant="h6"
                                        fontWeight="fontWeightBold"
                                        component="div"
                                        align="left"
                                    >
                                        Instructions
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer sx={{ boxShadow: 'none' }}>
                                        <Table sx={{ maxWidth: { md: '50%' } }} aria-label="simple table">
                                            <TableBody>
                                                {recipe.instructions.map((instruction, index) => (
                                                    <TableRow key={instruction}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            sx={{ borderBottom: 'none', verticalAlign: 'top' }}
                                                        >
                                                            {index + 1}.
                                                        </TableCell>
                                                        <TableCell align="left" sx={{ borderBottom: 'none' }}>
                                                            <Typography variant="body1" gutterBottom>
                                                                {instruction}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ) : (
                        <>
                            {/* Segment for recipe Ingredients */}
                            <Typography
                                m={2}
                                mt={3}
                                variant="h6"
                                fontWeight="fontWeightBold"
                                component="div"
                                align="left"
                            >
                                Ingredients
                            </Typography>
                            <TableContainer sx={{ boxShadow: 'none' }}>
                                <Table sx={{ minWidth: 300, maxWidth: 500 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant="body1">Name</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography variant="body1">Amount</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography variant="body1">Unit</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recipe.ingredients.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    <Typography variant="body1">{row.name}</Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography variant="body1">
                                                        {row.amount * recipe.servings}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography variant="body1">{row.unit}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Segment for recipe instructions */}
                            <Typography
                                m={2}
                                mt={3}
                                variant="h6"
                                fontWeight="fontWeightBold"
                                component="div"
                                align="left"
                            >
                                Instructions
                            </Typography>
                            <TableContainer sx={{ boxShadow: 'none' }}>
                                <Table sx={{ maxWidth: { md: '50%' } }} aria-label="simple table">
                                    <TableBody>
                                        {recipe.instructions.map((instruction, index) => (
                                            <TableRow key={instruction}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{ borderBottom: 'none', verticalAlign: 'top' }}
                                                >
                                                    {index + 1}.
                                                </TableCell>
                                                <TableCell align="left" sx={{ borderBottom: 'none' }}>
                                                    <Typography variant="body1" gutterBottom>
                                                        {instruction}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    )
}
export default RecipeDetails
