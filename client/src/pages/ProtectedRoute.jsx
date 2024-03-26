import NotAuthenticatedMessage from "./NotAuthenticatedMessage";
import Cookies from "universal-cookie";
import { Outlet } from "react-router-dom";

const cookies = new Cookies();

function ProtectedRoute() {
  return cookies.get("jwt") ? <Outlet /> : <NotAuthenticatedMessage />;
}

export default ProtectedRoute;
