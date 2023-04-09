import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import store from './store';

import './styles/index.scss';

import App from './components/app/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
