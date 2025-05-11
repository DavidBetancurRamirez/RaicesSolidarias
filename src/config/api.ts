import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

import { API_BASE_URL, API_ROUTES } from '@utils/routes';
import { useUIStore } from '@/stores/uiStore';

export interface ResponseData<T extends object | unknown> {
  data: T;
  error: boolean;
  message?: string;
  statusCode: number;
  timestamp: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  transformRequest: function (data, _headers) {
    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    return data;
  },
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const responseApiTokens = [
  API_ROUTES.login,
  API_ROUTES.refresh,
  API_ROUTES.register,
];

api.interceptors.response.use(
  (response) => {
    const responseData = JSON.parse(response.data);

    if (
      response?.config?.url &&
      responseApiTokens.includes(response.config.url)
    ) {
      try {
        const { setToken, setRefreshToken } = useAuthStore.getState();

        if (response?.headers?.authorization?.startsWith('Bearer ')) {
          setToken(response.headers.authorization.slice(7));
        }
        setRefreshToken(responseData?.data?.refreshToken);

        const { refreshToken: _refreshToken, ...rest } = responseData.data;

        responseData.data = rest.data;
      } catch (error) {
        console.error('Interceptor error', error);
        throw new Error('Error parsing response data');
      }
    }

    response.data = responseData;

    return response.data;
  },
  async (error) => {
    const responseError = JSON.parse(error.response.data);

    if (responseError?.message) {
      const { setAlert } = useUIStore.getState();
      setAlert(responseError.message);
    }

    return Promise.reject(responseError);

    //? With refresh token
    // const originalRequest = error.config;
    // const { refreshToken, setToken, logout } = useAuthStore.getState();

    // if (
    //   error.response?.status === 401 &&
    //   !originalRequest._retry &&
    //   refreshToken
    // ) {
    //   originalRequest._retry = true;
    //   try {
    //     const res = await axios.post(API_ROUTES.refresh, {
    //       refreshToken,
    //     });

    //     const newToken = res.data.token;
    //     setToken(newToken);

    //     originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //     return api(originalRequest);
    //   } catch (err) {
    //     logout();
    //     return Promise.reject(err);
    //   }
    // }
  },
);

export default api;
