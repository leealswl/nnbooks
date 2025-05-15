import axios from "axios";

const authApi = axios.create({
  baseURL: "https://nnbook-production.up.railway.app/api",
  timeout: 5000,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("로그인이 필요합니다.");
    }
    return Promise.reject(error);
  }
);

export default authApi;
