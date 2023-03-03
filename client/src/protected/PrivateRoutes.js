import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

const PrivateRoutes = () => {
  const cookies = new Cookies();

  return cookies.get('_user_')? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;