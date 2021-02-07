import api from "../services/api";

export const login = async (email, password) => {
  return await api
    .post("//auth/authenticate", { email, password })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("_accessAuthenticatedTokenPremium", token);
      localStorage.setItem("_activeUserPremium", JSON.stringify(user));

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("_accessAuthenticatedTokenPremium");
  localStorage.removeItem("_activeUserPremium");
};

export const register = () => {
  return;
};
