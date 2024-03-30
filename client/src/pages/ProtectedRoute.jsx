import NotAuthenticatedMessage from "./NotAuthenticatedMessage";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../features/authentication/useLogout";
import Loader from "../components/UI/Loader/Loader";

function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state?.user?.userInfo) ?? {
    isAuthenticated: false,
  };

  const { isLoading: isLoggingOut } = useLogout();

  if (isLoggingOut)
    return (
      <div className="center-xy absolute flex flex-col gap-2 justify-center mt-16 xl:mt-0">
        <Loader />
        <p>Logging out...</p>
      </div>
    );

  return isAuthenticated ? <Outlet /> : <NotAuthenticatedMessage />;
}

export default ProtectedRoute;
