import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
// import LoadingSpinner from "../shared/LoadingSpinner";
import { useEffect, useState } from "react";

const ProtectedAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [authKey, setAuthKey] = useState(0);

  useEffect(() => {
    setAuthKey((k) => k + 1);
  }, [isLoggedIn]);

  if (isLoggedIn === true) {
    return <Navigate to="/" replace />;
  }

  // Force rerender on auth state change
  return <div key={authKey}>{children}</div>;
};

export default ProtectedAuth;
