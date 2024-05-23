import axios from 'axios';

export const axiosWithoutInterceptors= ()=> axios.create({baseURL: 'http://foody-api-gateway.default.svc.cluster.local'})


export default axiosWithoutInterceptors