import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useGetAllPosts = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.posts,
    queryKeys.posts,
    [queryKeys.posts]
  );

  return { data, isPending, isSuccess, refetch };
};
export const useAddPost = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.posts,
    [queryKeys.addPosts],
    [queryKeys.posts]
  );
  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useDeletePost = () => {
  const { mutate, isPending, isSuccess } = useDeleteData(
    endPoints.deletePosts,
    [queryKeys.postsDelete],
    [queryKeys.posts]
  );
  return { mutate, isPending, isSuccess };
};

export const usePatchPost = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
    endPoints.posts,
    [queryKeys.patchPost],
    [queryKeys.posts]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useTogglePostLike = () => {
  const { mutate, data, error, isPending, isSuccess, isError, refetch } =
    usePatchData(
      endPoints.posts,
      [queryKeys.togglePostLike],
      [queryKeys.posts]
    );

  return { mutate, data, error, isPending, isSuccess, isError, refetch };
};
