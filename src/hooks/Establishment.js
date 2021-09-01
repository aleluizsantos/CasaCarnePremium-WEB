import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getAddressStore = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/addressStore", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const updateAddressStore = async (address) => {
  const { Authorization } = authHeader();
  return await api
    .put(`/addressStore/edit/${address.id}`, address, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};
