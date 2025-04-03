import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { ReactElement } from 'react'

export interface Props {
    children?: ReactElement<any>
}

//Fucntion for scrolling to the top
const ScrollTop = (props: Props) => {
    const { children } = props
    const trigger = useScrollTrigger()
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor')
        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            })
        }
    }

    return (
        <Fade in={trigger}>
            <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, left: '50%' }}>
                {children}
            </Box>
        </Fade>
    )
}
export default ScrollTop
