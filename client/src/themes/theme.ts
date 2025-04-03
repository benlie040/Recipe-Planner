import { createTheme } from '@mui/material'

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontWeightLight: 200,
        fontWeightRegular: 500,
        fontWeightMedium: 500,
        fontWeightBold: 800,
        
    },
    components: {
        MuiSelect: {
            styleOverrides: {
              select: {
                '&:focus': {
                    backgroundColor: 'inherit',
                    borderBottom: "2px solid '#1976d2'", 
                    color: '#1976d2' ,
                '& .MuiListItemIcon-root' :{
                    color: '#1976d2'
                    },
                },
              }
            }
          },
        MuiButtonBase: {
          defaultProps: {
          },
          styleOverrides: {
            root: {
                fontSize: '1rem',
                border: 'none',
                outline: 'none',
                color: 'primary.main',
            },
          },
        },
        MuiFab: {
            defaultProps: {
            },
            styleOverrides: {
                root: {
                    outline: 'none',
                    color: '#fff',
                    
                    '&:hover': {
                        backgroundColor: '#3f51b5',
                        
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:active': {
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                    },
                },
            },
        },
    },
      
})

theme.typography.h1 = {
    fontSize: '2.0rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '2.2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.4rem',
    },
}
theme.typography.h3 = {
    fontSize: '2.0rem',
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
        fontSize: '2.1rem',
        fontWeight: 'bold'
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.4rem',
        fontWeight: 'bold'
    },
}
theme.typography.h4 = {
    fontSize: '2.0rem',
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
        fontSize: '2.1rem',
        fontWeight: 'bold'
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.4rem',
        fontWeight: 'bold'
    },
}
theme.typography.h5 = {
    fontSize: '1.1rem',
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.3rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.7rem',
    },
}
theme.typography.h6 = {
    fontSize: '1.5rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.7rem',
    },
}
theme.typography.body2 = {
    fontSize: '1.0rem',
    [theme.breakpoints.up('sm')]: {
        fontSize: '0.9rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.1rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.2rem',
        //margin: 10
    },
}
theme.typography.body1 = {
    fontSize: '1.0rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.4rem',
    },
}
