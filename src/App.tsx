import React, { FunctionComponent, useMemo } from 'react';
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';
import { ThemeProvider } from 'styled-components';
import { createTheme } from './theme';
import ImageFormatComparison from './pages/image-formats-comparison';
import withFetch from './hocs/withFetch';

const url = "https://scaleflex.cloudimg.io/v7/01_test/sara_sample.json?vh=631222&func=proxy"

const App: FunctionComponent = () => {
  const theme = useMemo(
    () => createTheme('light'),
    [],
  )
  const ImageFormatComparisonWithFetch = withFetch(
    ImageFormatComparison,
    url
  );

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ImageFormatComparisonWithFetch />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

App.displayName = 'App'

export default App;
