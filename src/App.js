import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import UserRegistration from "./components/userRegistration/UserRegistration";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import RootLayout from "./components/rootLayout/RootLayout";
import SuperAdmin from "./components/superAdmin/SuperAdmin";
import GetUsers from "./components/superAdmin/GetUsers";
import Admin from "./components/admin/Admin";
import GetProjects from "./components/getProjects/GetProjects";

function App() {
  // configuration of routes
  let browserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <UserRegistration />,
        },
      ],
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/super-admin",
      element: <SuperAdmin />,
      // children: [
      //   {
      //     path: "",
      //     element: <GetUsers />,
      //   },
      // ],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "",
          element: <GetProjects />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={browserRoutes} />
      {/* <UserRegistration /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
