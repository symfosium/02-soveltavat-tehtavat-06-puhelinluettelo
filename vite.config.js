import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/02-soveltavat-tehtavat-06-puhelinluettelo",
  plugins: [react()],
})
