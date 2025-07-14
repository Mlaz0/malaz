import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useGetData from "@/hooks/curdsHook/useGetData";

export const getAllDoctors = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.doctors,
    [queryKeys.doctors],
    [queryKeys.doctors]
  );

  return { data, isPending, isSuccess, refetch };
};

export const getApprovedDoctors = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.approvedDoctors,
    [queryKeys.approvedDoctors],
    [queryKeys.approvedDoctors]
  );

  return { data, isPending, isSuccess, refetch };
};

export const getPendingDoctors = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.pendingDoctors,
    [queryKeys.pendingDoctors],
    [queryKeys.pendingDoctors]
  );

  return { data, isPending, isSuccess, refetch };
};

export const useDoctorPendingAction = () => {
  const { mutate, isPending, isSuccess } = usePatchData(
    endPoints.pendingDoctors,
    [queryKeys.pendingDoctors],
    [queryKeys.pendingDoctors]
  );

  return { mutate, isPending, isSuccess };
};
