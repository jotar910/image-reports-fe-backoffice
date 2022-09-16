import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IApiDataConfig } from '@/configs/apidata.config';
import { UserModel } from '@/models/user.model';

const AUTHENTICATION_STORAGE_KEY = 'user';

export default Symbol('Authentication provider identifier');

export class AuthenticationService {

  private data: { user: UserModel; token: string } | null = null;

  constructor() {
    this.init();
    axios.interceptors.request.use((request: AxiosRequestConfig) => {
      if (this.isLoggedIn()) {
        if (request.headers) {
          request.headers.Authorization = `Bearer ${this.data!.token}`;
        }
      }

      return request;
    });
  }

  async login(email: string, password: string, configs: IApiDataConfig) {
    try {
      const response: AxiosResponse<{ user: UserModel; token: string }> = await axios.post(
        `${configs.apiPath}/${configs.apiVersion}/auth/login`,
        { email, password }
      );
      localStorage.setItem(AUTHENTICATION_STORAGE_KEY, JSON.stringify(response.data));
      this.data = response.data;
    } catch (error) {
      this.data = null;
    }
  }

  logout() {
    localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
    this.data = null;
  }

  isLoggedIn(): boolean {
    return !!this.data?.token;
  }

  email(): string | null {
    return this.data?.user.email ?? null;
  }

  private init(): void {
    const dataSavedStr = localStorage.getItem(AUTHENTICATION_STORAGE_KEY);
    if (dataSavedStr) {
      this.data = JSON.parse(dataSavedStr);
    }
  }
}
