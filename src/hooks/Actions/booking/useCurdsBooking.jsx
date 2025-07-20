import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useCreateBooking = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.booking,
    [queryKeys.addBooking],
    [
      queryKeys.booking,
      queryKeys.doctors,
      queryKeys.availability,
      queryKeys.userProfile,
    ]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useGetUserbooking = (page, limit) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: endPoints.userBooking,
    params: { page, limit },
    queryKeys: [
      queryKeys.booking,
      queryKeys.userProfile,
      queryKeys.userBooking,
      page,
      limit,
    ],
    enabled: true,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useCancelBooking = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
    endPoints.booking,
    [queryKeys.cancelBooking],
    [
      queryKeys.booking,
      queryKeys.doctors,
      queryKeys.availability,
      queryKeys.userProfile,
    ]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
