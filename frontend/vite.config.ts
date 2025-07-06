import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* tailwind https://tailwindcss.com/docs/installation/using-vite, shadcn https://ui.shadcn.com/docs/installation/vite */
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
