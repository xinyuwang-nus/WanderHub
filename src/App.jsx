import "./App.css";
import Header from "./components/custom/Header.jsx";
import Footer from "./components/custom/Footer.jsx";
import Landing from "./components/custom/Landing.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import UserTrip from "./user-trip/index.jsx";
import { Toaster } from "sonner";
import SignIn from './login/SignIn.jsx'; 
import Register from './login/Register.jsx'; 
import ForgetPassword from './login/ForgetPassword.jsx'; 
import ViewBlogs from "./blog/ViewBlogs.jsx"; 
import CreateBlog from "./blog/CreateBlog.jsx";

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
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/create-blog",
      element: <CreateBlog />,
    },
    {
      path: "/view-blogs",
      element: <ViewBlogs />,
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
