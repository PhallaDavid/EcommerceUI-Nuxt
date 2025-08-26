
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
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
