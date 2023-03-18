import axios from 'axios';
import { getStorageData } from '../utils/helper';

export const axiosClient = axios.create({
    baseURL:"https://nvwxj359m9.execute-api.us-east-1.amazonaws.com/"
})
// https://api.netathon.devskart.com/

axiosClient.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        const token = getStorageData('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    // Edit request config
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(response => {
    // Edit response config
    return response.data;
}, error => {
    console.log(error);
    return Promise.reject(error.response.data);
});