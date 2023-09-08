import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../models/response/authResponse';

export async function signIn(
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  return $api.post<AuthResponse>('/login', { email, password });
}

export async function signUp(
  fio: string,
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  return $api.post<AuthResponse>('/registration', { email, password, fio });
}

export async function logout(): Promise<AxiosResponse<void>> {
  return $api.post('/logout');
}
