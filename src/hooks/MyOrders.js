import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getOrders = async (statusReq) => {
  const { Authorization } = authHeader();
  return await api
    .get("request", {
      headers: {
        Authorization: Authorization,
        statusRequest: statusReq,
      },
    })
    .then((response) => {
      return response.data;
    });
};
