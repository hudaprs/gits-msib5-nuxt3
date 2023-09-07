// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ["@/assets/css/global.css"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },
  imports: {
    dirs: [
      // Composables
      "composables",
      "composables/*/index.{ts,js,mjs,mts}",
      "composables/**",

      // Utils
      "utils",
      "utils/*/index.{ts,js,mjs,mts}",
      "utils/**",
    ],
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
