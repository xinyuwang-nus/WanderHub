import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/custom/header.jsx';
import Footer from './components/custom/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
     <App />
    <Footer />
  </StrictMode>,
)
