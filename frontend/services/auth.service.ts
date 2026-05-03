import api from "@/lib/axios";

export const loginUser = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};