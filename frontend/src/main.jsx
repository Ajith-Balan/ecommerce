import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth.jsx'
import { CartProvider } from './context/cart.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <CartProvider>

  <App />
  </CartProvider>

  </AuthProvider>
  </StrictMode>,
)
