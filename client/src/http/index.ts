import axios from 'axios';
import { AuthResponse } from '../models/response/authResponse';

// export const BASE_URL = 'http://45.12.18.158:5000/api';
export const BASE_URL = 'http://localhost:5001/api';

const $api = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', data.accessToken);
        return await $api.request(originalRequest);
      } catch (err) {
        console.error(err);
        window.location.replace('/login');
      }
    }

    throw error;
  }
);

export default $api;
