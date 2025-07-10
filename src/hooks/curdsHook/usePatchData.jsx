import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import patchRequest from "../handleRequest/PatchRequest";

const usePatchData = (url, mutationKeys, invalidateQueryKey) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: mutationKeys,
    mutationFn: async ({ data, url: overrideUrl }) => {
      const finalUrl = overrideUrl || url;
      return patchRequest(finalUrl, data, token);
    },
    onMutate: () => {
      const loadingToast = toast.loading("Processing...", {
        position: "top-right",
        autoClose: false,
      });
      return { loadingToast };
    },
    onSuccess: (data, variables, context) => {
      const successMessage = data?.data?.message || "Success!";

      const invalidateKeys = Array.isArray(invalidateQueryKey)
        ? invalidateQueryKey
        : [invalidateQueryKey];

      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });

      // queryClient.invalidateQueries({
      //   queryKey: ["getPosts", "userProfileById"],
      // });

      if (context?.loadingToast) {
        toast.update(context.loadingToast, {
          render: successMessage,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
    onError: (error, variables, context) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      if (context?.loadingToast) {
        toast.update(context.loadingToast, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          draggable: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
  });

  return { ...mutation };
};

export default usePatchData;
