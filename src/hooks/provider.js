import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getProvider = async (search) => {
  const { Authorization } = authHeader();

  return await api
    .get(`provider/${search}`, {
      headers: { Authorization: Authorization },
    })
    .then((response) => {
      return response.data;
    });
};
