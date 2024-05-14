import axiosWithoutInterceptors from "./axiosWithoutInterceptors";
import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const CommentAPI = {
  getCommentsByRecipeId: (recipeId, page, size) =>
    axiosWithoutInterceptors()
      .get(`comment/recipe/${recipeId}?page=${page}&size=${size}`)
      .then((response) => response.data),
  createComment: (id, newComment) => {
      axiosConfig().post(`comment/${id}/operations/create`, newComment, {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      });
  },
  updateComment: ( id, comment) =>
    axiosConfig().put(
      `comment/${id}/operations/update/${comment.id}`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
        },
      }
    ),
  deleteComment: (id, commentId) =>
    axiosConfig().delete(`comment/${id}/operations/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    }),
};

export default CommentAPI;
