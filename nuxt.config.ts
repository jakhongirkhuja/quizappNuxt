// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  router: {
    middleware: ['subdomain.global.ts'], // Add middleware
  },
  css: [
    '~/assets/css/main.css'
  ]
  
})
