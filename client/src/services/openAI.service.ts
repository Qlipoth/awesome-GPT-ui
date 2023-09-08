import { AxiosResponse } from 'axios';
import $api from '../http';

export async function getAnswer(text: string): Promise<AxiosResponse<unknown>> {
  return $api.post<unknown>('/completion', { text });
}
