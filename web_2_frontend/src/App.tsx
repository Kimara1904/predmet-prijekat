import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { configureAxiosRequestInterceptors } from './services/ServiceConfig'
import AppContent from './AppContent'
import { DashContextProvider } from './store/dashboard-context'
import { CartContextProvider } from './store/cart-context'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <BrowserRouter>
      <DashContextProvider>
        <CartContextProvider>
          <GoogleOAuthProvider
            clientId={
              process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ''
            }
          >
            <AppContent />
          </GoogleOAuthProvider>
        </CartContextProvider>
      </DashContextProvider>
    </BrowserRouter>
  )
}

export default App
