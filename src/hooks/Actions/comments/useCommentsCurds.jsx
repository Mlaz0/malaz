import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useAddComments = (endPoints) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints,
    [queryKeys.comments],
    [queryKeys.posts]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const usePatchComments = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
    endPoints.updateComment,
    [queryKeys.updateComment],
    [queryKeys.posts]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useDeleteComments = () => {
  const { mutate, isPending, isSuccess } = useDeleteData(
    endPoints.deleteComment,
    [queryKeys.deleteComment],
    [queryKeys.posts]
  );
  return { mutate, isPending, isSuccess };
};
