import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css', 'quasar/dist/quasar.css'],
  plugins: ['~/plugins/quasar.js'],
  build: {
    transpile: ['quasar']
  },
  vite: {
    plugins: [tsconfigPaths()]
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  }
})
