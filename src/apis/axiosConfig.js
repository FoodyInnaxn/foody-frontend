import axios from 'axios'
import { GetToken } from "../authentication/LocalStorageManager";

// http://localhost:8080

export default () => {
    const axiosConfig = axios.create({ baseURL: '/api', withCredentials: true });

    axiosConfig.interceptors.request.use(
        config => {
            const token = GetToken()
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log(config)
                return config;
            }

        },
        (error) => { console.log(error); return Promise.reject(error); }
    );

    axiosConfig.interceptors.response.use(response => {
        console.log(response.data);
        return response;
    },
        (error) => { console.log(error); return Promise.reject(error); }
    );

    return axiosConfig;
};