import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const getSaleDay = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("report/saleday", {
      headers: {
        Authorization: Authorization,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getSaleWeek = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("report/saleweek", {
      headers: {
        Authorization: Authorization,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getSaleYear = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("report/saleyear", {
      headers: {
        Authorization: Authorization,
      },
    })
    .then((response) => {
      return response.data;
    });
};
