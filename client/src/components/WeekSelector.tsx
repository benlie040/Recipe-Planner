import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'

type WeekSelectorProps = {
    calendarWeek: Date
    onWeekUp: () => void
    onWeekDown: () => void
}

const WeekSelector = (props: WeekSelectorProps) => {
    const { calendarWeek, onWeekUp, onWeekDown } = props
    return (
        <>
            <Stack
                spacing={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                p={1}
                m={1}
            >
                <Box p={1} bgcolor="inherit">
                    <Button
                        aria-label="contained"
                        variant="contained"
                        disableRipple
                        onClick={onWeekDown}
                        style={{ border: 'none', outline: 'none' }}
                    >
                        <ArrowLeftIcon />
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" p={1} bgcolor="inherit">
                    <Typography variant="h5" component="h2" color={'grey'}>
                        {`Week ${format(calendarWeek, 'II')} / ${format(calendarWeek, 'y')}`}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" p={1} bgcolor="inherit">
                    <Button
                        aria-label="contained"
                        variant="contained"
                        disableRipple
                        onClick={onWeekUp}
                        style={{ border: 'none', outline: 'none' }}
                    >
                        <ArrowRightIcon />
                    </Button>
                </Box>
            </Stack>
        </>
    )
}
export default WeekSelector
