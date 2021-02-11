import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getProduct = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("product", {
      headers: {
        Authorization: Authorization,
      },
    })
    .then((response) => {
      return response.data;
    });
};
