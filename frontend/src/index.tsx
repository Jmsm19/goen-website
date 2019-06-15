import * as React from 'react';
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
    primary: {
      light: '#ff4050',
      main: '#d9091a',
      dark: '#bf1a21',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f0f0f0',
      contrastText: '#434343',
    },
    error: {
      main: '#f5365c',
      contrastText: '#ffffff',
    },
  },
};

ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <ThemeProvider theme={createMuiTheme(materialThemeOverrides)}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.Suspense>,
  document.getElementById('root'),
);

serviceWorker.register();
