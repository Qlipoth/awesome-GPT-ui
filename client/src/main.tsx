import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';
import StoreProvider from './components/StoreProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
