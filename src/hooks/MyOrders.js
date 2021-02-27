import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const typeStatusMyOrders = {
  EM_ANASILE: 1,
  EM_PREPARACAO: 2,
  ROTA_ENTREGA: 3,
  RETIRAR_LOJA: 4,
  AGENDADO: 5,
  FINALIZADO: 6,
  all: "1,2,3,4,5,6",
};

/**
 * RETORNA UMA LISTA DE PEDIDOS, CONFORME SEU STATUS.
 * @param {String} statusReq Recebe uma string contendo os id dos status dos
 * pedidos. Ex: 1: Em analise | 2: Em Preparação | 3: Rota de entrega | 4: Retira na Loja |
 * 5: Agendado  | 6: Finalizado
 */
export const getOrders = async (statusReq) => {
  const { Authorization } = authHeader();
  return await api
    .get("request", {
      headers: {
        Authorization: Authorization,
        statusRequest: statusReq,
      },
    })
    .then((response) => {
      return response.data;
    });
};
