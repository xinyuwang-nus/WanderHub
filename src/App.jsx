import "./App.css";
import Header from "./components/custom/Header.jsx";
import Footer from "./components/custom/Footer.jsx";
import Landing from "./components/custom/Landing.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import UserTrip from "./user-trip/index.jsx";
import { Toaster } from "sonner";

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
    <>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
