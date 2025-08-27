
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
   app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'
        }
      ]
    }
  },
    modules: [
    '@pinia/nuxt',
  ],
   plugins: ['~/plugins/axios.js','@/plugins/message.js'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
