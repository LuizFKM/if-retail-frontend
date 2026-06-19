import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { CarrinhoProvider } from './context/CarrinhoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </StrictMode>
)
