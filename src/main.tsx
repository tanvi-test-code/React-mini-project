import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'
import App from './App.tsx'
import { StoreProvider, MantineAppProvider } from '@/app/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineAppProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </MantineAppProvider>
  </StrictMode>,
)
