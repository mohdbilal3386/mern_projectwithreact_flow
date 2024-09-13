import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/authPages/Login";
import Signup from "./pages/authPages/Signup";
import Workflow from "./pages/reactflow/Workflow";
import CallWorkflow from "./pages/callworkflow/CallWorkFlow";
import AuthLayout from "./components/layout/AuthLayout";

const router = createBrowserRouter([
  // Protected routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Workflow />,
          </>
        ),
      },
      {
        path: "/callWorkflow",
        element: (
          <>
            <CallWorkflow />,
          </>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
