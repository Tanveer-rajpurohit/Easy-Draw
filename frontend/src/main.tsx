import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./router/Login.tsx";
import Dashboard from "./router/Dashboard.tsx";
import Workspace from "./router/Workspace.tsx";
import CreateTeam from "./router/CreateTeam.tsx";
import { DataProvider } from "./context/DataContext.tsx";
import { FileProvider } from "./context/FileContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: `/workspace/:id`,
    element: <Workspace />,
  },
  {
    path: "/team/create",
    element: <CreateTeam />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <FileProvider>
      <RouterProvider router={router} />
    </FileProvider>
  </DataProvider>
);
