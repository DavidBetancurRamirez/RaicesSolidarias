export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ROUTES = {
  delivery: `${API_BASE_URL}/delivery`,
  deliveryByYear: (year: string) => `${API_BASE_URL}/delivery/year/${year}`,
  login: `${API_BASE_URL}/auth/login`,
  refresh: `${API_BASE_URL}/auth/refresh-token`,
  register: `${API_BASE_URL}/auth/register`,
  user: `${API_BASE_URL}/auth/user`,
  userById: (id: string) => `${API_BASE_URL}/auth/user/${id}`,
};

export const WEB_ROUTES = {
  about: '/nosotros',
  contact: '/contacto',
  deliveries: '/entregas',
  delivery: '/entregas/:id',
  home: '/',
  session: '/session',
};
