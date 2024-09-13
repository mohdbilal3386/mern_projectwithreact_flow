import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../UI/navbar/Navbar";
import { useAuth } from "../../context/authContext";
const AppLayout = () => {
  const { token } = useAuth();
  return (
    <>
      <Navbar />
      {!token ? <Navigate to={"/login"} /> : <Outlet />}
    </>
  );
};

export default AppLayout;
