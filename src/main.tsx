import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './router/index.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <>
    <Root />
  </>,
)


