import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";

export const useGetAllPatients = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.patients,
    [queryKeys.patients],
    [queryKeys.patients]
  );

  return { data, isPending, isSuccess, refetch };
};

export const useGetPatientById = (id) => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.patients,
    [queryKeys.patients],
    [queryKeys.patients]
  );

  return { data, isPending, isSuccess, refetch };
};

export const useUpdatePatient = () => {
  const { mutate, isPending, isSuccess } = usePatchData(
    endPoints.patients,
    [queryKeys.patients],
    [queryKeys.patients, queryKeys.userProfile]
  );

  return { mutate, isPending, isSuccess };
};
