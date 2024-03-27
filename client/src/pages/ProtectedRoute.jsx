import NotAuthenticatedMessage from "./NotAuthenticatedMessage";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state?.user?.userInfo) ?? {
    isAuthenticated: false,
  };

  return isAuthenticated ? <Outlet /> : <NotAuthenticatedMessage />;
}

export default ProtectedRoute;
