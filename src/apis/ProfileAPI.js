import axiosWithoutInterceptors from "./axiosWithoutInterceptors";
import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const ProfileAPI = {
  getProfile: (id) =>
    axiosWithoutInterceptors()
      .get(`/auth/foody/profile/${id}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      }),
  updateProfile: (id, user) =>
    axiosConfig().put(`/user/${id}`, user, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    }),
  updateEmailAndUsername: (id, user) => {
    axiosConfig().put(`/auth/update/${id}`, user, {
      headers: {
        Authorization: `Bearer ${GetToken()}`,
      },
    });
  },
};

export default ProfileAPI;
