import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
    viteCompression({ algorithm: "gzip", ext: ".gz" }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "/pwa/potadi512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "/pwa/potadi512_rounded.png",
            type: "image/png",
          },
        ],
        orientation: "any",
        display: "standalone",
        dir: "ltr",
        lang: "en-US",
        name: "Potadi App",
        short_name: "Potadi",
        description: "Potato Disease Identification",
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  build: {
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "vue-i18n", "vue-router"],
          axios: ["axios"],
          lodash: ["lodash"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "vue-i18n", "lodash", "axios"],
  },
});
