import React from 'react';
import ReactDOM from 'react-dom';

import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

import './lib/normalize.css';
import './styles.css';

ReactDOM.render(
  <AuthProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </AuthProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
