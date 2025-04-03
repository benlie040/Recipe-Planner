import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputAdornment, TextField } from '@mui/material'

type SearchEntryFieldProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchEntryField = (props: SearchEntryFieldProps) => {
    const { onChange } = props

    return (
        <>
            <FormControl fullWidth>
                <TextField
                    id="filled-search"
                    type="search"
                    size="small"
                    variant="outlined"
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: <InputAdornment position="end"></InputAdornment>,
                    }}
                ></TextField>
            </FormControl>
        </>
    )
}
export default SearchEntryField
