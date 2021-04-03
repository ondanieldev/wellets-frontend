import axios from 'axios';

const env = process.env.NEXT_PUBLIC_KOINZAAR_ENV;

export const TOKEN_ITEM_NAME = '@Koinzaar:token';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_ITEM_NAME);
};

export const setAuthToken = (token: string): void => {
  return localStorage.setItem(TOKEN_ITEM_NAME, token);
};

export const backendURL =
  env === 'production' ? 'http://localhost:3334' : 'http://localhost:3333';

const api = axios.create({
  baseURL: backendURL,
});

api.interceptors.request.use(config => {
  try {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

export default api;
