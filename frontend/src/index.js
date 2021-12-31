import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { ContextProvider } from './contextAPI/AuthContext';
import './index.scss';
ReactDOM.render(

  <React.StrictMode>
    <ContextProvider>
        <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
