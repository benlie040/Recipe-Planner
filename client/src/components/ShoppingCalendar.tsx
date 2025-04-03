import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'

const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
})

//Style
const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#e3f2fd',
    border: '4px solid #fff',
    borderRadius: 3,
    boxShadow: 24,
    p: 1,
}

type ShoppingCalendarProps = {
    handleTime: (time: DateObject[]) => void
    handleShowList: (show: boolean) => void
    timePicked: DateObject[]
}

const ShoppingCalendar = (props: ShoppingCalendarProps) => {
    const { handleTime, handleShowList, timePicked } = props
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        handleShowList(false)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleClick = () => {
        if (timePicked.length === 2) handleShowList(true)
        handleClose()
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box display="flex" justifyContent="center">
                            <>
                                <Stack spacing={3} direction="column">
                                    <Calendar value={timePicked} onChange={handleTime} range />
                                    <Button
                                        aria-label="contained"
                                        variant="contained"
                                        disableRipple
                                        onClick={handleClick}
                                    >
                                        Show shopping list
                                    </Button>
                                </Stack>
                            </>
                        </Box>
                    </Box>
                </Modal>

                <Stack spacing={1} p={2} direction="column">
                    <Stack spacing={1} p={2} direction="row" justifyContent="center">
                        <Stack spacing={1} p={2} direction="column">
                            <TextField
                                id="date-start"
                                variant="filled"
                                //size="small"
                                label="From"
                                value={timePicked ? timePicked[0].format() : ''}
                                onClick={handleOpen}
                                inputProps={{ sx: { fontSize: 22 } }}
                                sx={{
                                    minWidth: 80,
                                    maxWidth: 140,
                                    input: { color: 'primary.main' },
                                    '& .MuiFilledInput-root': {
                                        color: '#000',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                        backgroundColor: 'inherit',
                                    },
                                }}
                            ></TextField>
                        </Stack>

                        <Stack spacing={1} p={2} direction="column">
                            <TextField
                                id="date-end"
                                variant="filled"
                                //size="small"
                                label="To"
                                value={timePicked[1] ? timePicked[1].format() : ''}
                                onClick={handleOpen}
                                inputProps={{ sx: { fontSize: 22 } }}
                                sx={{
                                    minWidth: 80,
                                    maxWidth: 140,
                                    input: { color: 'primary.main' },
                                    '& .MuiFilledInput-root': {
                                        color: '#000',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                        backgroundColor: 'inherit',
                                    },
                                }}
                            ></TextField>
                        </Stack>
                    </Stack>
                </Stack>
            </ThemeProvider>
        </>
    )
}
export default ShoppingCalendar
