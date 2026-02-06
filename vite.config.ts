import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { componentTagger } from 'lovable-tagger'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages friendly: use '/' for custom domains to avoid white screen issues.
  base: 'Aposente-O-Esfor-o-Manual',
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    tailwindcss(),
    ...(mode === 'development' ? [componentTagger()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
