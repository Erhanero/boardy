/**
 * External dependencies.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/**
 * Internal dependencies.
 */
import '@/styles/style.scss';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
