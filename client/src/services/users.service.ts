import { AxiosResponse } from 'axios';
import $api from '../http';
import { IUser } from '../types/models/models.types';

export async function getUsers(): Promise<AxiosResponse<IUser[]>> {
  return $api.get<IUser[]>('/users');
}
