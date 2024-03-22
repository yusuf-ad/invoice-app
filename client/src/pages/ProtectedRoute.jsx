import { useSelector } from "react-redux";
import { NotAuthenticatedMessage } from "./NotAuthenticatedMessage";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.user.token);

  return isAuthenticated ? children : <NotAuthenticatedMessage />;
}

export default ProtectedRoute;
