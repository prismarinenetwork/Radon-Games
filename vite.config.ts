import million from "million/compiler";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [million.vite({ mode: "preact" })],
  server: {
    proxy: {
      "/cdn": {
        target: "https://cdn.radon.games/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
        headers: {
          referer: "https://cdn.radon.games"
        }
      },
      "/api": {
        target: "http://localhost:2000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          referer: "https://api.radon.games"
        }
      }
    }
  }
});
