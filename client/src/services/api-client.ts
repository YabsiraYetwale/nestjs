import axios from "axios";
import { getCookie } from "cookies-next";

const apiClient = axios.create({
  baseURL: "https://invoicesystm-api.onrender.com/api",
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default apiClient;
