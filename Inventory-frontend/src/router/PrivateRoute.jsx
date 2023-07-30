import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../router/auth";

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
