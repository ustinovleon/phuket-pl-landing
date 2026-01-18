import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment - change 'phuket-dach-landing' to your repo name
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
