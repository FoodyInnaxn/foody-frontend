import axiosWithoutInterceptors from './axiosWithoutInterceptors';

const RegisterAPI = {
  registerNewUser: (newUser) =>
    axiosWithoutInterceptors().post("/auth/foody/register", newUser),
};
      
export default RegisterAPI;