import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useGetData from "@/hooks/curdsHook/useGetData";

export const useGetUserProfile = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.userProfile,
    queryKeys.userProfile,
    []
  );

  return { data, isPending, isSuccess, refetch };
};
