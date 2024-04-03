import NotAuthenticatedMessage from "./NotAuthenticatedMessage";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../features/authentication/useLogout";
import Loader from "../ui/Loader/Loader";
import { useQueryClient } from "react-query";

function ProtectedRoute() {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useSelector((state) => state?.user?.userInfo) ?? {
    isAuthenticated: false,
  };

  // if (invoiceCreationStatus?.isLoading)
  //   return (
  //     <div className="center-xy absolute mt-16 flex flex-col justify-center gap-2 xl:mt-0">
  //       <Loader />
  //       <p>Logging out...</p>
  //     </div>
  //   );

  return isAuthenticated ? <Outlet /> : <NotAuthenticatedMessage />;
}

export default ProtectedRoute;
