import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/image-proxy": {
        target: "https://nnbook-production.up.railway.app:8080",
        changeOrigin: true,
      },
      // 추가 백엔드 api
      "/api": {
        //target: "https://www.aladin.co.kr",
        target: "https://nnbook-production.up.railway.app:8080",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/ttb/api"),
      },
      //추가 알라딘 api 요거 살려야함
      "/ttb/api": {
        target: "https://www.aladin.co.kr/ttb/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ttb\/api/, ""),
      },
    },
  },
});
