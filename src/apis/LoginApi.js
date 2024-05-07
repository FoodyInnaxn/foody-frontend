import axiosWithoutInterceptors from './axiosWithoutInterceptors';

const LoginAPI = {
  login: (email, password) =>
    axiosWithoutInterceptors().post('/auth/foody/login',  email, password )
      .then((response) => response.data)
};
      
export default LoginAPI;