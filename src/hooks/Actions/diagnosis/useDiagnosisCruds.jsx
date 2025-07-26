import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostDataWithId from "@/hooks/curdsHook/usePostDataWithId";

export const useCreateDiagnosis = (bookingId) => {
  const { mutate, data, error, isPending, isSuccess, isError } =
    usePostDataWithId(
      endPoints.diagnosis,
      [queryKeys.diagnosis],
      [queryKeys.diagnosis, queryKeys.booking]
    );
  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useGetDoctorDiagnosis = (id) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: `${endPoints.getDoctorDiagnosis}${id}`,
    // params: { page, limit },
    queryKeys: [queryKeys.posts, queryKeys.userProfile],
    enabled: true,
  });
  return { data, isPending, isSuccess, refetch };
};
