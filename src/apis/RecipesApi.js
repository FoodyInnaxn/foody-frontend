import axiosWithoutInterceptors from "./axiosWithoutInterceptors";
import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const RecipesAPI = {
  getRecipes: (page, size) =>
    axiosWithoutInterceptors()
      .get(`/recipe/view?page=${page}&size=${size}`)
      .then((response) => response.data),
  getRecipeById: (id) =>
    axiosWithoutInterceptors()
      .get(`/recipe/view/${id}`)
      .then((response) => response.data),
  getCreatedRecipes: (id, page, size) =>
    axiosConfig()
      .get(`/recipe/${id}/operations?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      })
      .then((response) => response.data),
  createRecipe: (newRecipe, id) => {
    axiosConfig().post(`/recipe/${id}/operations/create`, newRecipe, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${GetToken()}`,
      },
    });
  },
  updateRecipe: (id, recipeId, recipe) =>
    axiosConfig().put(
      `recipe/${id}/operations/update/${recipeId}`,
      recipe,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${GetToken()}`,
        },
      }
    ),
  deleteRecipe: (id, recipeId) =>
    axiosConfig().delete(`recipe/${id}/operations/delete/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    }),
};

export default RecipesAPI;
