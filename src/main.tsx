import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { TanStackProvider } from './providers/TanStackProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <RouterProvider router={router} />
    </TanStackProvider>
  </StrictMode>,
)

