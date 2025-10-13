import api from '@/config/api';

import { API_ROUTES } from './routes';

export const apiDelete = async (
  path: keyof typeof API_ROUTES,
  id: string,
): Promise<boolean> => {
  try {
    const response = await api.delete(`${API_ROUTES[path]}/${id}`);
    return response?.data?.deleted || false;
  } catch (error) {
    console.error('Error deleting:', error);
    return false;
  }
};
