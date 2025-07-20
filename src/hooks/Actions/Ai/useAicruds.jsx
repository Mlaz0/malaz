

import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import { useAuth } from "@/context/AuthContext";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const usePatientAnalusis = () => {
  
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.Analysis,
    [queryKeys.analysis],
  );
  
  
  

  return { mutate, data, error, isPending, isSuccess, isError };
};









   