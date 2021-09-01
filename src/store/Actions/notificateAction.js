import {
  OPEN_CLOSE,
  SET_MESSAGE,
  // CLIENT_REGISTERED,
  NEW_ORDERS,
} from "./types";

import { typeStatusMyOrders } from "../../hooks/MyOrders";

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
          ? "Loja aberta, Boas vendas."
          : "Loja Fechada,  Bom descanço!",
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
  return getOrders(typeStatusMyOrders.GROUP).then(
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
