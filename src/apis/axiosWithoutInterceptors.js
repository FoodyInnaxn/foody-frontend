import axios from 'axios';

export const axiosWithoutInterceptors= ()=> axios.create({baseURL: '/api'})


export default axiosWithoutInterceptors