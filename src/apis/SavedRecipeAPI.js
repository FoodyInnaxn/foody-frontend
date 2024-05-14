import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const SavedRecipeAPI = {
  addSaved: (id, recipe) =>
    axiosConfig().post(`/favorites/${id}`, recipe, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    }),
  removeSaved: (id, userId) =>
    axiosConfig().delete(`/favorites/${userId}/${id}`, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    }),
  getSaved: (id, page, size) =>
    axiosConfig()
      .get(`/favorites/${id}?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      })
      .then((response) => response.data),
  isRecipeSaved: (userId, recipeId) =>
    axiosConfig()
      .get(`/favorites/${userId}/recipes/${recipeId}/saved`, {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      })
      .then((response) => response.data),
};

export default SavedRecipeAPI;
