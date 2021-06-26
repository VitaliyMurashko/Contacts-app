import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Contacts } from './pages/Contacts/index';
import { ToggleThemeColorMode } from './pages/Contacts/ToggleThemeColorMode/index';

export function App() {
  const [themeColor, setThemeColor] = useState('dark');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeColor,
        },
      }),
    [themeColor],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="App">
        <ToggleThemeColorMode themeColor={themeColor} setThemeColor={setThemeColor}/>
        <Contacts />
      </div>
    </ThemeProvider>
  );
}


