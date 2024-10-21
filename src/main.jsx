import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/custom/header.jsx';
import Footer from './components/custom/Footer.jsx';
import CreateTrip from './create-trip/index.jsx';
import ViewTrip from './view-trip/index.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/create-trip",
    element: <CreateTrip/>
  },
  {
    path: "/view-trip",
    element: <ViewTrip/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>,
)
