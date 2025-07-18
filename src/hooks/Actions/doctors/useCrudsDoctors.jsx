import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
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

export const useGetApprovedDoctors = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.approvedDoctors,
    [queryKeys.approvedDoctors],
    [queryKeys.approvedDoctors]
  );

  return { data, isPending, isSuccess, refetch };
};

export const useGetPendingDoctors = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.pendingDoctors,
    [queryKeys.pendingDoctors],
    [queryKeys.pendingDoctors]
  );

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

export const useDeleteDoctor = () => {
  const { mutate, isPending, data } = useDeleteData(
    endPoints.deleteDoctor,
    [queryKeys.deleteDoctor],
    [queryKeys.doctors, queryKeys.approvedDoctors, queryKeys.pendingDoctors]
  );

  return { mutate, isPending, data };
};
