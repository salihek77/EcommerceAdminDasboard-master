import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'https://ecommercebackend-7kbm.onrender.com/api',
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      // Use the `set` method to update headers
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
