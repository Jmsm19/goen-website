import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import Loading from './components/Loading';
import { SettingsProvider } from './store/context/SettingsContext';
import { AuthProvider } from './store/context/AuthContext';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

import './lib/normalize.css';
import './styles.css';

const materialThemeOverrides = {
  palette: {
    primary: { main: '#d9091a' },
    secondary: { main: '#f0f0f0' },
    error: { main: '#f5365c' },
  },
};

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <ThemeProvider theme={createMuiTheme(materialThemeOverrides)}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root'),
);

serviceWorker.register();
