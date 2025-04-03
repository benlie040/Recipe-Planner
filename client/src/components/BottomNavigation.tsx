import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ChecklistIcon from '@mui/icons-material/Checklist'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Navigation = () => {
    const [value, setValue] = useState(0)

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction
                    component={Link}
                    to="shopping-details"
                    label="Shopping List"
                    icon={<ChecklistIcon />}
                />

                <BottomNavigationAction label="PDF" icon={<ArrowDownwardIcon />} />
            </BottomNavigation>
        </Box>
    )
}
export default Navigation
