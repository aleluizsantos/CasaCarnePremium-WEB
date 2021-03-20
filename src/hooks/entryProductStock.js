import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getEntryProducts = async (pageCurrent = 1) => {
  const { Authorization } = authHeader();

  return await api
    .get("/entryStock", {
      headers: { Authorization: Authorization },
      params: { page: pageCurrent },
    })
    .then((response) => {
      return response.data;
    });
};
