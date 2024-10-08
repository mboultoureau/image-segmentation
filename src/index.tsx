import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './lib/i18n';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
