import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKeys";
import { useAuth } from "@/context/AuthContext";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useGetAllBlogs = (page = 1, limit = 10) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.blogs,
    params: { page, limit },
    queryKeys: [queryKeys.blogs, page, limit],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
    limit,
  };
};

export const useGetBlogById = (id) => {
  const { data, isPending, isSuccess, refetch } = useGetData({
    url: `${endPoints.blogs}/${id}`,
    queryKeys: [queryKeys.blogs],
    enabled: true,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useGetDoctorBlogs = () => {
  const { user } = useAuth();
  const doctorId = user?.id;

  const { data, isPending, isSuccess, refetch } = useGetData({
    url: endPoints.blogs,
    queryKeys: [queryKeys.blogs],
    params: { author: doctorId },
    enabled: !!doctorId,
  });

  return { data, isPending, isSuccess, refetch };
};

export const useAddBlog = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.addBlog,
    [queryKeys.addBlog],
    [queryKeys.blogs]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useUpdateBlog = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePatchData(
    endPoints.addBlog,
    [queryKeys.blogs],
    [queryKeys.blogs]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useDeleteBlog = () => {
  const { mutate, isPending, isSuccess } = useDeleteData(
    endPoints.blogs,
    [queryKeys.blogs],
    [queryKeys.blogs]
  );
  return { mutate, isPending, isSuccess };
};
