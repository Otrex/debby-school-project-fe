import axios, { Axios, Method, AxiosError } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserTypeUpdateRequest,
  UserTypeUpdateResponse,
} from '../types';

class Api {
  private instance: Axios;
  private token?: string;
  private baseUrl?: string;

  constructor() {
    this.instance = axios.create();
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
    this.instance.defaults.baseURL = this.baseUrl;
  }

  public setToken(token: string) {
    this.token = token;
    this.instance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.token}`;
  }

  private async request<T extends Record<string, any>>(
    method: Method,
    url: string,
    data?: Record<string, any>
  ) {
    try {
      let _url = url;
      if (method.toLowerCase() === 'get' && data) {
        const params = new URLSearchParams(data);
        _url += `?${params.toString()}`;
      }

      const res = await this.instance.request<T>({
        url: _url,
        method,
        data,
      });

      if (res.data.status === 'success') {
        return res.data;
      }

      return Promise.reject(res.data);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          navigateTo('/');
        }
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  /*
   * Authentication
   * */
  register(data: RegisterRequest) {
    return this.request<RegisterResponse>('post', '/auth/register', {
      ...data,
    });
  }

  login(data: LoginRequest) {
    return this.request<LoginResponse>('post', '/auth/login', { ...data });
  }

  setUserType(data: UserTypeUpdateRequest) {
    return this.request<UserTypeUpdateResponse>('patch', '/user/type', data);
  }
}

export default new Api();
