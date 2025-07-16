import endPoints from "@/config/endPoints";
import queryKeys from "@/config/queryKes";
import { useAuth } from "@/context/AuthContext";
import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePatchData from "@/hooks/curdsHook/usePatchData";
import usePostData from "@/hooks/curdsHook/usePostData";

export const useGetAllBlogs = () => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.blogs,
    queryKeys.blogs,
    []
  );

  return { data, isPending, isSuccess, refetch };
};

export const useGetBlogById = (id) => {
  const { data, isPending, isSuccess, refetch } = useGetData(
    `${endPoints.blogs}/${id}`,
    queryKeys.blogs,
    id,
    {}
  );

  return { data, isPending, isSuccess, refetch };
};

export const useGetDoctorBlogs = () => {
  const { user } = useAuth();
  const doctorId = user?.id;

  const params = { author_id: doctorId };
  const { data, isPending, isSuccess, refetch } = useGetData(
    endPoints.blogs,
    queryKeys.blogs,
    null,
    params
  );

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
