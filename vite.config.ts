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
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
          {
            urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
          },
          {
            urlPattern: /^https:\/\/potadi\.ai/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24, // 1 Day
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: process.env.NODE_ENV === "development",
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
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    watch: {
      usePolling: process.env.NODE_ENV === "development",
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "vue-i18n", "axios"],
  },
});
