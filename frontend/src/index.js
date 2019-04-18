import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import * as serviceWorker from './serviceWorker';

import './lib/normalize.css';
import './styles.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
