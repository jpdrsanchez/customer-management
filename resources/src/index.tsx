import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './styles/global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
)
