import api from "../services/api";
import { authHeader } from "../services/authHeader";

const { Authorization } = authHeader();

/**
 * Listar todos os produtos
 * @param {number} pageCurrent passar a pagina current
 */
export const getProduct = async (pageCurrent = 1) => {
  return await api
    .get("product/all", {
      headers: { Authorization: Authorization },
      params: { page: pageCurrent },
    })
    .then((response) => {
      return response.data;
    });
};
/**
 * Criar um produto novo
 * @param {FormData} dataForm envio do formData com os dados e imagem
 */
export const createProduct = async (dataForm) => {
  return await api
    .post("/product/create", dataForm, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};
/**
 * Atualizar o produto
 * @param {number} id informar o id do produto para atualizar
 * @param {FormData} dataForm envio do formData com os dados e imagem
 */
export const updateProduct = async (id, dataForm) => {
  return await api
    .put(`product/${id}`, dataForm, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Excluir um produto
 * @param {number} index passar o id do produto que irá Deletar
 */
export const deleteProduto = async (index) => {
  return await api
    .delete(`product/${index}`, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Buscar todas as unidade de medidas
 */
export const getMeasureUnit = async () => {
  return await api
    .get("/measureunid", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Buscar todas as Categorias
 */
export const getCategory = async () => {
  return await api
    .get("/category", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};
