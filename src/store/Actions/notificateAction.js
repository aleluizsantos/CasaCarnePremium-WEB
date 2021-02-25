import {
  OPEN_CLOSE,
  SET_MESSAGE,
  // CLIENT_REGISTERED,
  NEW_ORDERS,
  // UPDATE,
} from "./types";

import { getOpenClose, setOpenClose, getOrders } from "../../hooks";

export const statusOpenClose = () => (dispatch) => {
  return getOpenClose().then(
    (data) => {
      dispatch({
        type: OPEN_CLOSE,
        payload: data.open_close,
      });
    },
    (error) => {
      const message =
        error.response.data.error || error.message || error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  );
};

export const upgradeOpenClose = () => (dispatch) => {
  return setOpenClose().then(
    (data) => {
      dispatch({
        type: OPEN_CLOSE,
        payload: data.open_close,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: data.open_close
          ? "Loja aberta, boa vendas."
          : "Loja Fechada,  bom descanço!",
      });
    },
    (error) => {
      const message =
        error.response.data.error || error.message || error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  );
};

export const myOrders = () => (dispatch) => {
  return getOrders("1,2,3,4,5").then(
    (data) => {
      dispatch({
        type: NEW_ORDERS,
        payload: data.length,
      });
    },
    (error) => {
      const message = error.message || error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  );
};
