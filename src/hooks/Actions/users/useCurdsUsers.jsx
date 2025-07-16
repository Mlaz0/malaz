import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";

export const useGetUserProfile = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.userProfile,
    queryKeys.userProfile,
    []
  );

  return { data, isPending, isSuccess, refetch };
};

export const useUpdateUser = () => {
  const { mutate, isPending, isSuccess } = usePatchData(
    endPoints.updateUser,
    [queryKeys.userProfile],
    [queryKeys.userProfile]
  );

  return { mutate, isPending, isSuccess };
};
