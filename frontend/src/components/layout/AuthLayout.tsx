import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const AuthLayout = () => {
  const { token } = useAuth();
  console.log({ token });
  return token ? <Navigate to={"/"} /> : <Outlet />;
};

export default AuthLayout;
