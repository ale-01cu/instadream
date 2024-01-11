import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import client from './config/apollo.js'
import { ApolloProvider } from '@apollo/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App/>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
)
