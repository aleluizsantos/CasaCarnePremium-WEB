import api from "../services/api";
import { authHeader } from "../services/authHeader";

/**
 * Retorna o Endereço do Estabelecimento
 * @returns {object} Retorna um objeto com o endereço do estabelecimento
 */
export const getAddressStore = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/addressStore", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Atualizar o endereço do Estabelecimento
 * @param {object} address Objeto contendo o endereço completo do estabelecimento.
 * @returns {object} {...address}
 */
export const updateAddressStore = async (address) => {
  const { Authorization } = authHeader();
  return await api
    .put(`/addressStore/edit/${address.id}`, address, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Retorna os horários de funcionamento do estabelecimento
 * @returns {Array<object>} Retorna um array de objetos { id, week, week_id, start, end, open }
 */
export const getOpeningHours = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/openingHours", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Alterar o(s) horários de funcionamento do estabelecimento
 * @param {Array<object>} openingHours Recebe um array contendo objeto de horario de funcionamento para alterar
 * @returns {object} {success, message}
 */
export const updateOpenigHours = async (openingHours) => {
  const { Authorization } = authHeader();
  return await api
    .put("/openingHours/update", openingHours, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};
