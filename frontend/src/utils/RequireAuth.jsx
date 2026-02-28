import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default RequireAuth;
