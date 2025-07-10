import { request } from "@/services/clientService";

const getRequest = (url, token) => {
  return request(
    {
      method: "GET",
      url: url,
    },
    token
  );
};

export default getRequest;
