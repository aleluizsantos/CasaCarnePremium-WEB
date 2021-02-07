const INITIAL_STATE = {
  signed: false,
  user: null,
  token: null,
};
export default function Authenticate(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, signed: true, user: action.user, token: action.token };
    case "SIGN_OUT":
      return { signed: false, user: null, token: null };
    default:
      return state;
  }
}
