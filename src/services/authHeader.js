export function authHeader() {
  let token = localStorage.getItem("_accessAuthenticatedTokenPremium");
  if (!!token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
