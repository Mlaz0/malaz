import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useGetAllCategories = ({ page, limit }) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: endPoints.categories,
    params: { page, limit },
    queryKeys: [queryKeys.categories],
    enabled: true,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useAddCategory = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.categories,
    [queryKeys.categories],
    [queryKeys.categories]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useEditCategory = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
    endPoints.categories,
    [queryKeys.categories],
    [queryKeys.categories]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useDeleteCategory = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = useDeleteData(
    endPoints.deleteCategory,
    [queryKeys.categories],
    [queryKeys.categories]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
