import {
  NEW_ORDERS,
  OPEN_CLOSE,
  CLIENT_ONLINE,
  CLIENT_REGISTERED,
  UPDATE,
} from "../Actions/types";

const INITIAL_STATE = {
  open_close: false,
  newOrders: 0,
  clientsOnline: 0,
  clientsRegistered: 0,
  update: {},
};

// const INITIAL_STATE = openClose
//   ? {
//       open_close: openClose,
//       newOrders: totalOrderProcess,
//       clientsOnline: 0,
//       clientsRegistered: totalUsers,
//       update: {},
//     }
//   : {
//       open_close: false,
//       newOrders: 0,
//       clientsOnline: 0,
//       clientsRegistered: 0,
//       update: {},
//     };

export default function Notificate(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_CLOSE:
      return { ...state, open_close: payload };
    case NEW_ORDERS:
      return { ...state, newOrders: payload };
    case CLIENT_ONLINE:
      return { ...state, clientsOnline: payload };
    case CLIENT_REGISTERED:
      return { ...state, clientsRegistered: payload };
    case UPDATE:
      return { ...state, update: payload };
    default:
      return state;
  }
}
