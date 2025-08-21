import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

const backServer = `http://localhost:3000`;
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 개발용 임시 서버
  server: {
    // Vue.js 실행 시 적용 PORT 변경
    port: 8099,
    // CORS(Cross Origin Resource Sharing) => proxy setting
    proxy: {
      "^/api": {
        target: backServer,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "../server/public",
    // 개발은 client 쪽에서 계속 하지만 build로 그 결과를 자동으로 server로 옮겨준다.
  },
});
