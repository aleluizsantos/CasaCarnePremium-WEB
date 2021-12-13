import api from "../services/api";
import { authHeader } from "../services/authHeader";

/**
 * Criar um produto novo
 * @param {FormData} dataForm Envio do formData com os dados e imagem
 */
export const createProduct = async (dataForm) => {
  const { Authorization } = authHeader();
  return await api
    .post("/product/create", dataForm, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Atualizar o produto
 * @param {number} id Identificação do produto para ser atualizado
 * @param {FormData} dataForm Conjunto de dados do produto
 * @param {boolean} changeImage True: imagem alterada | false: Sem alteração
 * @returns {object} Será retornar { sucess: boolean, message: string }
 */
export const updateProduct = async (id, dataForm, changeImage) => {
  const { Authorization } = authHeader();
  return await api
    .put(`product/${id}`, dataForm, {
      headers: {
        Authorization: Authorization,
        changeImage: changeImage || "false",
      },
    })
    .then((response) => response.data);
};

/**
 * Excluir um produto
 * @param {number} id Passar o id do produto que irá Deletar
 */
export const deleteProduto = async (id) => {
  const { Authorization } = authHeader();
  return await api
    .delete(`product/${id}`, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Retorna uma lista todas as unidade de medidas
 */
export const getMeasureUnit = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/measureunid", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

/**
 * Listar todos os produtos
 * @param {number} pageCurrent passar a pagina current
 * @param {string} categoryId Passar categoria separada por "," Ex: 1,2,3
 */
export const getProduct = async (pageCurrent = 1, categoryId = "") => {
  const { Authorization } = authHeader();
  return await api
    .get("product/all", {
      headers: { Authorization: Authorization },
      params: {
        page: pageCurrent,
        category_id: categoryId,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Retorna um lista de produto basenado no parametro
 * @param {String} search Recebe um nome do produto a ser localizado
 * @param {number} pageCurrent passar a pagina current
 */
export const getProductSearch = async (search, pageCurrent = 1) => {
  const { Authorization } = authHeader();
  return await api
    .get(`product/all/${search}`, {
      headers: { Authorization: Authorization },
      params: {
        page: pageCurrent,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Retorna uma lista de produtos pela categorias selecionadas
 * @param {string} categorysId Recebe uma string de id das categorys separadas por
 * virgula por exemplo: 1,5,6
 */
export const getCategoryProduct = async (categorysId) => {
  const { Authorization } = authHeader();
  return await api
    .get("product", {
      headers: { Authorization: Authorization },
      params: {
        category_id: categorysId,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Retorna a lista de produtos em promoção
 */
export const getPromotionProduct = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("product/promotion", {
      headers: { Authorization: Authorization },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Retorna um listagem agrupado por categorias, informando a quantidade
 * de cada produto por categoria
 */
export const getProductGroupCategory = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("product/group", {
      headers: { Authorization: Authorization },
    })
    .then((response) => {
      return response.data;
    });
};
