import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// production HTML is prerendered (scripts/prerender.mjs); dev serves an empty root
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
