import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import usePostData from "@/hooks/curdsHook/usePostData";

// export const useGetAllPosts = () => {
//   const { data, isPending, isSuccess, refetch } = useGetData(
//     endPoints.posts,
//     queryKeys.posts,
//     [queryKeys.posts, queryKeys.userProfileById]
//   );

//   return { data, isPending, isSuccess, refetch };
// };
export const useAddPost = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.posts,
    [queryKeys.addPosts],
    [queryKeys.posts]
  );
  return { mutate, data, error, isPending, isSuccess, isError };
};

// export const useDeletePost = () => {
//   const { mutate, isPending, isSuccess } = useDeleteData(
//     endPoints.deletePosts,
//     [queryKeys.postsDelete],
//     [queryKeys.posts, queryKeys.userProfileById]
//   );
//   return { mutate, isPending, isSuccess };
// };

// export const usePatchPost = (url) => {
//   const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
//     url,
//     [queryKeys.postsPatch],
//     [queryKeys.posts, queryKeys.userProfileById]
//   );

//   return { mutate, data, error, isPending, isSuccess, isError };
// };

// export const usePatchLikePost = (url) => {
//   const { mutate, data, error, isPending, isSuccess, isError, refetch } =
//     usePatchData(
//       url,
//       [queryKeys.postLike],
//       [queryKeys.posts, queryKeys.userProfileById]
//     );

//   return { mutate, data, error, isPending, isSuccess, isError, refetch };
// };
