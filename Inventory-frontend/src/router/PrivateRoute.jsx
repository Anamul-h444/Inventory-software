import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../router/sessionHelper";

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
