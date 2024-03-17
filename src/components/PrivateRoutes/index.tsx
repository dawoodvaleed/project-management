import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const authToken = Cookies.get("authToken");
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
