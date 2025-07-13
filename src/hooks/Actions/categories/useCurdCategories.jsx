import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useGetAllCategories = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.categories,
    queryKeys.categories,
    []
  );

  return { data, isPending, isSuccess, refetch };
};

export const useAddCategory = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.addBlog,
    [queryKeys.categories]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
