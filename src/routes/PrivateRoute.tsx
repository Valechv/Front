import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../store/auth";

const PrivateRoute = () => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
