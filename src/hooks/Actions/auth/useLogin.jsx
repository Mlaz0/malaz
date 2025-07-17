import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import { useAuth } from "@/context/AuthContext";
import usePostData from "@/hooks/curdsHook/usePostData";
import { setAuthCookie } from "@/services/cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { setToken } = useAuth();
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.login,
    [queryKeys.login],
    [queryKeys.userProfile, queryKeys.userProfileById]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      setAuthCookie(data?.data?.token);
      setToken(data?.data?.token);
      switch (data?.data?.user?.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "patient":
          navigate("/");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [data, isSuccess, isError, error, navigate, setToken]);

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useLogin;
