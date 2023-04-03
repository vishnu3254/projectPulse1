import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import UserRegistration from "./components/userRegistration/UserRegistration";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import RootLayout from "./components/rootLayout/RootLayout";
import SuperAdmin from "./components/superAdmin/SuperAdmin";
import GetUsers from "./components/superAdmin/GetUsers";
import AdminRootLayout from "./components/admin/AdminRootLayout";
import GetProjects from "./components/getProjects/GetProjects";
import Admin from "./components/admin/Admin";
import GdoRootLayout from "./components/gdo/GdoRootLayout";
import Gdo from "./components/gdo/Gdo";
import GetSpecificProjectDetails from "./components/getSpecificProjectDetails/GetSpecificProjectDetails";
import ProjectDetailedViewAdmin from "./components/admin/ProjectDetailedViewAdmin";
import ProjectManagerRootLayout from "./components/projectManager/ProjectManagerRootLayout";
import ProjectManager from "./components/projectManager/ProjectManager";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  // configuration of routes
  let browserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
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
    },
    {
      path: "/admin",
      element: <AdminRootLayout />,
      children: [
        {
          path: "",
          element: <Admin />,
        },
        {
          path: "project/:projectId",
          element: <ProjectDetailedViewAdmin />,
        },
      ],
    },
    {
      path: "/gdo",
      element: <GdoRootLayout />,
      children: [
        {
          path: "",
          element: <Gdo />,
        },
        {
          path: "project/:projectId",
          element: <ProjectDetailedViewAdmin />,
        },
      ],
    },
    {
      path: "/project-manager",
      element: <ProjectManagerRootLayout />,
      children: [
        {
          path: "",
          element: <ProjectManager />,
        },
        {
          path: "project/:projectId",
          element: <ProjectDetailedViewAdmin />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={browserRoutes} />
    </div>
  );
}

export default App;
