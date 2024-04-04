import NotAuthenticatedMessage from "./NotAuthenticatedMessage";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader/Loader";

function ProtectedRoute() {
  const { status: authStatus } = useSelector((state) => state?.user) ?? {
    status: "idle",
  };

  if (authStatus === "loading") {
    return (
      <div className="center-xy absolute mt-16 flex flex-col justify-center gap-2 xl:mt-0">
        <Loader />
        <p>Logging out...</p>
      </div>
    );
  }

  return authStatus === "success" ? <Outlet /> : <NotAuthenticatedMessage />;
}

export default ProtectedRoute;
