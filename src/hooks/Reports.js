import api from "../services/api";
import { authHeader } from "../services/authHeader";
import { format } from "date-fns";

export const getSaleDay = async () => {
  const { Authorization } = authHeader();
  const dateCurrent = format(new Date(), "yyyy-M-d");

  return await api
    .get("report/saleday", {
      headers: {
        Authorization: Authorization,
      },
      params: {
        dateCurrent: dateCurrent,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getSaleWeek = async (
  dateCurrent = format(new Date(), "yyyy-M-d")
) => {
  const { Authorization } = authHeader();

  return await api
    .get("report/saleweek", {
      headers: {
        Authorization: Authorization,
      },
      params: {
        dateCurrent: dateCurrent,
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

export const getTop10 = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("report/top10", {
      headers: { Authorization: Authorization },
    })
    .then((response) => {
      return response.data;
    });
};
