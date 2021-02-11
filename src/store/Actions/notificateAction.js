import {
  OPEN_CLOSE,
  CLIENT_REGISTERED,
  NEW_ORDERS,
  UPDATE,
  SET_MESSAGE,
} from "./types";

import { getOpenClose } from "../../hooks";

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
