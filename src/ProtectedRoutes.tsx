import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const cookie = Cookies.get("accessToken");
  if (!cookie) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
