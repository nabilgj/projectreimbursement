import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

import { Provider } from 'react-redux';
import { store } from './store';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
