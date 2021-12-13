export function authHeader() {
  let token = localStorage.getItem("_accessAuthenticatedTokenCasaCarnePremium");
  if (!!token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
