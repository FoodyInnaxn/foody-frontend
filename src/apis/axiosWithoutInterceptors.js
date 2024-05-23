import axios from 'axios';

export const axiosWithoutInterceptors= ()=> axios.create({baseURL: process.env.HOST_URL})


export default axiosWithoutInterceptors