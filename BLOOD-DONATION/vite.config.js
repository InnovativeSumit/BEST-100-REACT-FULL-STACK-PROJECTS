import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: {
      clientPort: 443
    },
    watch: {
      usePolling: true
    },
    allowedHosts: ['3000-ijbz782ts5o8e6s0hbewg-e48966b6.manusvm.computer']
  }
})


