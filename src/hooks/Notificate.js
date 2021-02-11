import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getOpenClose = async () => {
  return await api.get("operation").then((response) => {
    return response.data;
  });
};
