import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext.jsx';
import FavContextProvider from './context/FavContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <AuthContextProvider>
              <FavContextProvider>
                  <App />
              </FavContextProvider>
          </AuthContextProvider>
      </Router>
  </React.StrictMode>,
)
