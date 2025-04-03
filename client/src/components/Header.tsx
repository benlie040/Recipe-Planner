import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid, IconButton, Slide } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { useState } from 'react'

type HeaderProps = {
    title: string
    onBack?: () => void
    date?: Date
}

const HideOnScroll = (props: { children: JSX.Element }) => {
    const { children } = props
    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    )
}

const Header = (props: HeaderProps) => {
    const { title, onBack, date } = props

    const options = ['Value 1', 'Value 2']
    const [value, setValue] = useState<string | null>(options[0])

    console.dir(value)

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Grid item xs={12} lg={12} container direction="row">
                            <Grid item display="flex" justifyContent="flex-start" alignItems="center" xs={4} lg={4}>
                                {onBack && (
                                    <>
                                        <IconButton
                                            edge="start"
                                            onClick={onBack}
                                            style={{ border: 'none', outline: 'none' }}
                                        >
                                            <ArrowBackIcon style={{ fill: 'white' }} />
                                        </IconButton>
                                    </>
                                )}
                            </Grid>
                            <Grid item display="flex" justifyContent="center" alignItems="center" xs={4} lg={4}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    align="center"
                                    sx={{ flexGrow: 1, display: 'inline' }}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            {onBack && (
                                <Grid
                                    item
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    xs={3}
                                    md={4}
                                    lg={4}
                                ></Grid>
                            )}
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    )
}
export default Header
