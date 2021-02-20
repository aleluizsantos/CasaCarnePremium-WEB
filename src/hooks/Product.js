import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getProduct = async (pageCurrent = 1) => {
  const { Authorization } = authHeader();
  return await api
    .get("product/all", {
      headers: { Authorization: Authorization },
      params: { page: pageCurrent },
    })
    .then((response) => {
      return response.data;
    });
};

export const createProduct = async (dataForm) => {
  const { Authorization } = authHeader();
  return await api
    .post("/product/create", dataForm, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const deleteProduto = async (index) => {
  const { Authorization } = authHeader();
  return await api
    .delete(`product/${index}`, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const getMeasureUnit = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/measureunid", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const getCategory = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/category", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};
