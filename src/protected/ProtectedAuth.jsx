import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAuth = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedAuth;
