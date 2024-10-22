import './App.css'
import Landing from './components/custom/Landing.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import ViewTrip from './view-trip/index.jsx';
import UserTrip from './user-trip/index.jsx';

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
      <RouterProvider router={router} />
    </>
  )
}

export default App