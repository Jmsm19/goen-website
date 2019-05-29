import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import Loading from './components/Loading';
import { SettingsProvider } from './store/context/SettingsContext';
import { AuthProvider } from './store/context/AuthContext';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

import './lib/normalize.css';
import './styles.css';

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <AuthProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </AuthProvider>
  </Suspense>,
  document.getElementById('root'),
);

serviceWorker.register();
