import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    viteCompression({ algorithm: "brotliCompress" }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      workbox: {
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        globPatterns: [
          "**/*.{js,css,html,ico,png,jpg,svg,json,vue,txt,woff,woff2}",
        ],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Potadi App",
        short_name: "Potadi",
        description: "Potato Disease Identification",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa/ios/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa/ios/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa/windows11/Square150x150Logo.scale-200.png",
            sizes: "300x300",
            type: "image/png",
          },
        ],
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
          utils: ["lodash", "axios"],
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
    include: ["vue", "vue-router"],
  },
});
