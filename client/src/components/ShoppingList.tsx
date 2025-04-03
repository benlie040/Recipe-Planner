import { Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Ingredient } from '../models/types'

type ShoppingListProps = {
    ingredients: Ingredient[]
    onChange: (ID: string) => void
}

const ShoppingList = (props: ShoppingListProps) => {
    const { ingredients, onChange } = props
    return (
        <>
            {ingredients.length > 0 ? (
                <TableBody>
                    {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.ID}>
                            <TableCell component="th" scope="row" style={{ width: '10%' }}>
                                <Checkbox checked={!ingredient.checked} onChange={() => onChange(ingredient.ID)} />
                            </TableCell>
                            <TableCell align="left" style={{ width: '40%' }}>
                                <Typography color="text.secondary" variant="body2" fontWeight="fontWeightRegular">
                                    {ingredient.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ width: '35%' }}>
                                <Typography color="text.secondary" variant="body2" fontWeight="fontWeightRegular">
                                    {ingredient.amount}
                                </Typography>
                            </TableCell>
                            <TableCell align="left" style={{ width: '20%' }}>
                                <Typography color="text.secondary" variant="body2" fontWeight="fontWeightRegular">
                                    {ingredient.unit}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            ) : (
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography color="info.main" variant="h6" fontWeight="fontWeightRegular" align="left">
                                No ingridients found
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                    </TableRow>
                </TableBody>
            )}
        </>
    )
}
export default ShoppingList
