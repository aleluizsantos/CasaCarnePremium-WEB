export const userAction = {
  auth,
};

function auth(email, password) {
  return (dispatch) => {
    console.log(dispatch);
  };

  function login(user) {
    console.log("chegou");
    return { type: "SIGN_IN", action: user };
  }
}
