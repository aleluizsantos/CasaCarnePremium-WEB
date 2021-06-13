import api from "../services/api";
import { authHeader } from "../services/authHeader";

/**
 * Retorna uma lista com todas as Categorias
 */
export const getCategorys = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/category", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};
/**
 * Atualizar uma categoria
 * @param {Object} category Recebe um objeto Category com os valores:
 * { isChange:false, nameOld:"", values:{}, image:[] }
 */
export const updateCategory = async (category) => {
  const { Authorization } = authHeader();
  // Caso não teve nenhuma alteração retorna nada
  if (!category.isChange) return;

  // Pegar o id da categoria para atualizar
  const cat = await getCategorys();
  const idCat = cat.find((item) => item.name === category.nameOld);

  const data = new FormData();
  data.append("name", category.values.name);
  data.append("nameImageCurrent", category.values.image);

  category.image.forEach((img) => {
    data.append("image", img);
  });

  return await api
    .put(`category/${idCat.id}`, data, {
      headers: { Authorization: Authorization },
    })
    .then((respponse) => respponse.data);
};
/**
 * Deletar uma categoria
 * @param {Object} category Recebe um objeto Category com os valores:
 * { isChange:false, nameOld:"", values:{}, image:[] }
 */
export const deleteCategory = async (category) => {
  const { Authorization } = authHeader();
  // Pegar o id da categoria para atualizar
  const cat = await getCategorys();
  const idCat = cat.find((item) => item.name === category.nameOld);

  return await api
    .delete(`category/${idCat.id}`, {
      headers: { Authorization: Authorization },
    })
    .then((respponse) => respponse.data);
};
/**
 * Ativa e desativa categoria visible no app
 * @param {Object} category
 * @returns Object { success: true or false }
 */
export const visibleAppCategory = async (category) => {
  const { Authorization } = authHeader();

  return await api
    .put(
      `category/visible/${category.name}`,
      {},
      {
        headers: { Authorization: Authorization },
      }
    )
    .then((response) => response.data);
};
