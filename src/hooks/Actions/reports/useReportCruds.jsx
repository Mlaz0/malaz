import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useGetAllReports = (page, limit) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: endPoints.reports,
    params: { page, limit },
    queryKeys: [queryKeys.reports, page, limit],
    enabled: true,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useUpdateReportStatus = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
    endPoints.reports,
    [queryKeys.reports],
    [queryKeys.reports]
  );
  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useSendReport = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.reports,
    [queryKeys.reports],
    [queryKeys.reports]
  );
  return { mutate, data, error, isPending, isSuccess, isError };
};
