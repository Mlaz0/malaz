import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";

import usePostData from "@/hooks/curdsHook/usePostData";

export const usePatientAnalusis = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.Analysis,
    [queryKeys.analysis]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
