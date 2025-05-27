export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ROUTES = {
  delivery: `${API_BASE_URL}/delivery`,
  deliveryByYear: (year: string) => `${API_BASE_URL}/delivery/year/${year}`,
  deliveryMedia: (id: string) => `${API_BASE_URL}/delivery/${id}/media`,
  login: `${API_BASE_URL}/auth/login`,
  place: `${API_BASE_URL}/place`,
  placeById: (id: string) => `${API_BASE_URL}/place/${id}`,
  placeMedia: (id: string) => `${API_BASE_URL}/place/${id}/media`,
  placeTestimonial: (id: string) => `${API_BASE_URL}/place/${id}/testimonials`,
  refresh: `${API_BASE_URL}/auth/refresh-token`,
  register: `${API_BASE_URL}/auth/register`,
  user: `${API_BASE_URL}/auth/user`,
  userById: (id: string) => `${API_BASE_URL}/auth/user/${id}`,
};

export const WEB_ROUTES = {
  about: '/nosotros',
  admin: '/admin',
  contact: '/contacto',
  deliveries: '/entregas',
  delivery: '/entregas/:id',
  deliveryByYear: (year: string) => `/entregas/${year}`,
  home: '/',
  place: '/lugar/:id',
  placeById: (id: string) => `/lugar/${id}`,
  session: '/session',
};
