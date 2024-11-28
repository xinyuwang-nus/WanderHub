import "./App.css";
import Header from "./components/custom/Header.jsx";
import Footer from "./components/custom/Footer.jsx";
import Landing from "./components/custom/Landing.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import UserTrip from "./user-trip/index.jsx";
import { Toaster } from "sonner";
import SignIn from './components/login/SignIn.jsx'; // Import SignIn
import Register from './components/login/Register.jsx'; // Import Register
import ForgetPassword from './components/login/ForgetPassword.jsx'; // Import ForgetPassword

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/create-trip",
      element: <CreateTrip />,
    },
    {
      path: "/view-trip/:tripId",
      element: <ViewTrip />,
    },
    {
      path: "/user-trip",
      element: <UserTrip />,
    },
    {
      path: "/sign-in", // Route for SignIn
      element: <SignIn />,
    },
    {
      path: "/register", // Route for Register
      element: <Register />,
    },
    {
      path: "/forget-password", // Route for ForgetPassword
      element: <ForgetPassword />,
    },
    
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <Toaster />
        <RouterProvider router={router} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
