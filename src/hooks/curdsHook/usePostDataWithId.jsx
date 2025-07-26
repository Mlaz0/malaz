import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import postRequest from "../handleRequest/PostRequest";

const usePostDataWithId = (baseUrl, mutationKeys, invalidateQueryKey) => {
  const { token } = useAuth();

  const queryClient = useQueryClient();
  const [requestData, setRequestData] = useState(null);

  const mutation = useMutation({
    mutationKey: mutationKeys,

    // Accepts { id, data }
    mutationFn: async ({ id, data }) => {
      setRequestData(data);
      const url = id ? `${baseUrl}/${id}` : baseUrl;
      return postRequest(url, data, token);
    },

    onMutate: () => {
      const loadingToast = toast.loading("جاري التحميل...", {
        position: "top-right",
        autoClose: false,
      });
      return { loadingToast };
    },
    onSuccess: (data, variables, context) => {
      const successMessage = data?.data?.message || "تمت الإضافة بنجاح";
      console.log(data?.sessionUrl);
      const invalidateKeys = Array.isArray(invalidateQueryKey)
        ? invalidateQueryKey
        : [invalidateQueryKey];

      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });

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
        error.response?.data?.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى";

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

  return {
    requestData,
    ...mutation,
  };
};

export default usePostDataWithId;
