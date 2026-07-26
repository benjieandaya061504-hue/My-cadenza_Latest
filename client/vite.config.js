import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Allow environment variables prefixed with VITE_ to be accessible
  define: {
    // No custom defines needed - Vite automatically exposes VITE_* vars
  },
  // Ensure env dir is correct
  envDir: '.',
})
