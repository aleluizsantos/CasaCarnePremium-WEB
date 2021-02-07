import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "../Actions/types";

const token = localStorage.getItem("_accessAuthenticatedTokenPremium");
const user = JSON.parse(localStorage.getItem("_activeUserPremium"));

const INITIAL_STATE = user
  ? {
      signed: true,
      user: user,
      token: token,
    }
  : {
      signed: false,
      user: null,
      token: null,
    };
export default function Authenticate(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        signed: true,
        user: payload.user,
        token: payload.token,
      };
    case LOGIN_FAIL:
      return { signed: false, user: null, token: null };
    case REGISTER_SUCCESS:
      return { signed: false, user: null, token: null };
    case REGISTER_FAIL:
      return { signed: false, user: null, token: null };
    case LOGOUT:
      return { signed: false, user: null, token: null };
    default:
      return state;
  }
}
