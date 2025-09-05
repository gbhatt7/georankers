import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "./api";

/* =====================
   TYPES
   ===================== */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user?: { id: string; email: string; first_name: string; last_name: string };
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  app_name: string;
}

/* =====================
   AXIOS CONFIG
   ===================== */
const API = axios.create({
  baseURL: "http://localhost:8080/api/v1", // adjust if needed
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

/* =====================
   AUTH HELPERS
   ===================== */
export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const res: AxiosResponse<LoginResponse> = await API.post(
    API_ENDPOINTS.login,
    payload
  );
  if (res.data.access_token) {
    localStorage.setItem("access_token", res.data.access_token);
  }
  return res.data;
};

export const register = async (payload: RegisterRequest): Promise<any> => {
  const res = await API.post(API_ENDPOINTS.register, payload);
  return res.data;
};
