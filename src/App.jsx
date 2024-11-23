import './App.css'
import Header from './components/custom/header.jsx';
import Footer from './components/custom/Footer.jsx';
import Landing from './components/custom/Landing.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import ViewTrip from './view-trip/index.jsx';
import UserTrip from './user-trip/index.jsx';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "/create-trip",
    element: <CreateTrip/>
  },
  {
    path: "/view-trip",
    element: <ViewTrip/>
  },
  {
    path: "/user-trip",
    element: <UserTrip/>
  },
]);

function App() {

  return (
    <>
      <Header />
        <Toaster />
        <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App