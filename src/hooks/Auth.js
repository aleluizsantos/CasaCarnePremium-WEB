import decode from "jwt-decode";
import api from "../services/api";

export const login = async (email, password) => {
  return await api
    .post("/auth/authenticate", { email, password })
    .then((response) => {
      const { user, token } = response.data;

      if (user.typeUser === "user") {
        throw new Error("Usuário não tem permissão");
      }

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

export const isAuthenticated = () => {
  const token = localStorage.getItem("_accessAuthenticatedTokenPremium");

  if (token !== null) {
    // desestruturando pegando apenas a data de expiração do token
    const { exp } = decode(token);

    // Verificar se o token esta válido
    if (exp >= new Date().getTime() / 1000) {
      return true;
    }
  }
  return false;
};
