import { OPEN_CLOSE } from "../Actions/types";

const INITIAL_STATE = {
  open_close: false,
  amountNewOrder: 0,
  onlineClients: 0,
  clientsRegistered: 0,
  update: {},
};

export default function Notificate(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_CLOSE:
      return { ...state, open_close: payload };
    default:
      return state;
  }
}
