import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { OrdersProvider } from './context/OrdersContext'
import { UIProvider } from './context/UIContext'
import { ProductsProvider } from './context/ProductsContext'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <UIProvider>
            <ProductsProvider>
              <OrdersProvider>
                <CartProvider>
                  <FavoritesProvider>
                    <App />
                  </FavoritesProvider>
                </CartProvider>
              </OrdersProvider>
            </ProductsProvider>
          </UIProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)


