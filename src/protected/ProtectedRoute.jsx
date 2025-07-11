import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isLoggedIn === false) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
