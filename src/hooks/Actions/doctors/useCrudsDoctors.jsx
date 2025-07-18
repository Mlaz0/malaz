import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";

export const useGetAllDoctors = (
  page = 1,
  limit = 10,
  specialization = null
) => {
  const params = {
    page,
    limit,
    ...(specialization && { specialization }),
  };

  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.doctors,
    params: params,
    queryKeys: [queryKeys.doctors, page, limit, specialization],
  });

  return {
    data,
    isPending,
    doctorsError: rest.error,

    refetch,
    page,
    limit,
  };
};

export const useGetApprovedDoctors = (page, limit) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: endPoints.approvedDoctors,
    params: { page, limit },
    queryKeys: [queryKeys.approvedDoctors, page, limit],
    enabled: true,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useGetPendingDoctors = (page, limit) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: endPoints.pendingDoctors,
    params: { page, limit },
    queryKeys: [queryKeys.pendingDoctors, page, limit],
    enabled: true,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useDoctorPendingAction = () => {
  const { mutate, isPending, isSuccess } = usePatchData(
    endPoints.doctors,
    [queryKeys.doctors],
    [queryKeys.pendingDoctors, queryKeys.approvedDoctors, queryKeys.doctors]
  );

  return { mutate, isPending, isSuccess };
};

export const useUpdateDoctor = () => {
  const { mutate, isPending, isSuccess } = usePatchData(
    endPoints.doctors,
    [queryKeys.doctors],
    [queryKeys.doctors, queryKeys.userProfile]
  );

  return { mutate, isPending, isSuccess };
};

// export const useDeleteDoctor = () => {
//   const { mutate, isPending, data } = useDeleteData(
//     endPoints.deleteDoctor,
//     [queryKeys.deleteDoctor],
//     [queryKeys.doctors, queryKeys.approvedDoctors, queryKeys.pendingDoctors]
//   );

//   return { mutate, isPending, data };
// };
