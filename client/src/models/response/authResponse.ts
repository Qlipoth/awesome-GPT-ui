import { IUser } from '../../types/models/models.types';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
