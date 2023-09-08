import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { IUser } from '../types/models/models.types';
import { logout, signIn, signUp } from '../services/auth.service';
import { AuthResponse } from '../models/response/authResponse';
import { BASE_URL } from '../http';

class SessionStore {
  user: IUser | null = null;
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(data: IUser | null): void {
    this.user = data;
  }

  setLoggedIn(value) {
    this.isLoggedIn = value;
  }

  async signIn(email: string, password: string) {
    try {
      const { data } = await signIn(email, password);
      localStorage.setItem('token', data.accessToken);
      this.setUser(data.user);
      this.setLoggedIn(true);
    } catch (err) {
      throw err.response?.data?.message;
    }
  }

  async signUp(fio: string, email: string, password: string) {
    try {
      const { data } = await signUp(fio, email, password);
      localStorage.setItem('token', data.accessToken);
      this.setUser(data.user);
      this.setLoggedIn(true);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem('token');
      this.setUser(null);
      this.setLoggedIn(false);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const { data } = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', data.accessToken);
      this.setUser(data.user);
      this.setLoggedIn(true);
    } catch (err) {
      console.error(err.response?.data?.message);
      throw err;
    }
  }
}

export default SessionStore;
