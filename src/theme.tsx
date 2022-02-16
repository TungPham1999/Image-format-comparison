import createMuiTheme from '@mui/material/styles/createTheme';

export const createTheme = (mode: 'dark' | 'light') => createMuiTheme({
  palette: {
    mode,
    primary: {
      main: '#006FE6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
  },
});
