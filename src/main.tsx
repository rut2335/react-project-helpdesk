import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { TicketsProvider } from './context/ticketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <TicketsProvider>
    <App />
    </TicketsProvider>
    </AuthProvider>
  </StrictMode>,
)
