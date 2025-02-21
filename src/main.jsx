import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './AuthProvider.jsx'
import  axios  from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// axios.defaults.baseURL = 'https://to-do-app-server-two.vercel.app';
axios.defaults.baseURL = 'http://localhost:5000';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
