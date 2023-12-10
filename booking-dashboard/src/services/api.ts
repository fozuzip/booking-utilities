import axios from "axios";

export type User = {
  id: number;
  username: string;
  password: string;
};

export type Booking = {
  id: number;
  from: string;
  to: string;
  persons: number;
};

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const login = (username: string, password: string) => {
  return api.post("/login", { username, password }).then((res) => res.data);
};

export const logout = () => {
  return api.post("/logout").then((res) => res.data);
};

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
