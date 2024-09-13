import "@xyflow/react/dist/style.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ReactFlowProvider } from "@xyflow/react";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <ReactFlowProvider>
            <RouterProvider router={router} />
          </ReactFlowProvider>
        </AuthProvider>
      </AppProvider>
    </>
  );
}
