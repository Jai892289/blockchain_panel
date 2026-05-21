import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      typeof window !== "undefined" &&
      err.response?.status === 401
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;