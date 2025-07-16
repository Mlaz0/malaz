

import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import getRequest from "../handleRequest/GetRequest";

const useGetData = (url, queryKey, id = null, queryParams = {}) => {
  const { token } = useAuth();

  const getDataRequest = async () => {
    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const { data } = await getRequest(fullUrl, token);
    return data?.data;
  };

  const { data, isPending, error, isLoading, refetch } = useQuery({
    queryKey: [queryKey, id, queryParams],
    queryFn: getDataRequest,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 2,
  });

  return { data, isLoading, isPending, error, refetch };
};

export default useGetData;
