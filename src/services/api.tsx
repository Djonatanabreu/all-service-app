import { API_URL } from '@env';
import axios from 'axios';
import { getToken } from 'store/auth';
import { logout } from 'utils/functions';

console.log(API_URL);
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const token = getToken();

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
