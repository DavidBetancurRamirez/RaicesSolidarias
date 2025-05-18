import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

import { API_BASE_URL } from '@utils/routes';

const fileApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

fileApi.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default fileApi;
