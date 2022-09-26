import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} state={location} replace />
  );
};

export default RequireAuth;
