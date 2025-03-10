
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    
    cors: true,
    hmr: {
      host: '0.0.0.0',
    },
    watch: {
      usePolling: true,
    },
    allowedHosts: ['9bc08cd7-8f75-4fb8-9e57-fb5b8e632151-00-2uj2sdx1yhilj.sisko.replit.dev', 'all'],
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
})
