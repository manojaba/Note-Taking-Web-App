import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/Note-Taking-Web-App/',
  server:{
    port:5174,
  },
})
