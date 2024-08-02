import React from 'react'
import ReactDOM from 'react-dom/client'

import './main.css'

import App from './App'

// Init Store
import './lib/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
