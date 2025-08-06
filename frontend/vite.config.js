import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 이미지 프록시
      "/api/image-proxy": {
        // target: "https://nnbook-production.up.railway.app:8080", // 배포 서버 주소
        target: "http://localhost:8080", // 로컬 백엔드 주소
        changeOrigin: true,
      },

      // 백엔드 API 프록시
      "/api": {
        // target: "https://nnbook-production.up.railway.app:8080",
        target: "http://localhost:8080",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/ttb/api"),
      },

      // 알라딘 API 프록시
      "/ttb/api": {
        target: "https://www.aladin.co.kr/ttb/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ttb\/api/, ""),
      },
    },
  },
});
