import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { EngineProvider } from './context/EngineContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EngineProvider>
      <App />
    </EngineProvider>
  </StrictMode>,
)
