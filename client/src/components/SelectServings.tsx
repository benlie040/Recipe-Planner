import { ListItem, ListItemText, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type SelectServingsProps = {
    servings: string
    onChange: (event: SelectChangeEvent) => void
}

const SelectServings = (props: SelectServingsProps) => {
    const { servings, onChange } = props

    const servingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <FormControl sx={{ minWidth: 90, maxwidth: 200 }} /* size={size} */>
                <InputLabel id="select-label" size="small">
                    <Typography
                        variant="subtitle1"
                        fontWeight="fontWeightBold"
                        sx={{
                            fontSize: { xs: '16px', md: '20px' },
                        }}
                    >
                        Servings
                    </Typography>
                </InputLabel>
                <Select
                    variant="standard"
                    labelId="select-servings-label"
                    id="select-servings"
                    value={servings}
                    label="Servings"
                    onChange={onChange}
                >
                    {servingsArray.map((item) => (
                        <MenuItem key={item} value={item}>
                            <ListItem>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant="body2" fontWeight="fontWeightRegular">
                                            {item}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
export default SelectServings
