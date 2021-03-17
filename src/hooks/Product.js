import api from "../services/api";
import { authHeader } from "../services/authHeader";

/**
 * Criar um produto novo
 * @param {FormData} dataForm envio do formData com os dados e imagem
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
 * @param {number} id informar o id do produto para atualizar
 * @param {FormData} dataForm envio do formData com os dados e imagem
 */
export const updateProduct = async (id, dataForm) => {
  const { Authorization } = authHeader();
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
  const { Authorization } = authHeader();
  return await api
    .delete(`product/${index}`, {
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
 */
export const getProduct = async (pageCurrent = 1) => {
  const { Authorization } = authHeader();
  const { currentPage } = pageCurrent;
  return await api
    .get("product/all", {
      headers: { Authorization: Authorization },
      params: { page: currentPage },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Retorna um lista de produto basenado no parametro
 * @param {String} search Recebe um nome do produto a ser localizado
 */
export const getProductSearch = async (search) => {
  const { Authorization } = authHeader();
  return await api
    .get(`product/all/${search}`, {
      headers: {
        Authorization: Authorization,
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
