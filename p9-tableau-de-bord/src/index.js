import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import Navt from './components/Navt';
import Navl from './components/Navl';
import Dashboard from './pages/Dashboard';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navl />
    <Navt />
    <Dashboard />
  </React.StrictMode>
);

reportWebVitals();
