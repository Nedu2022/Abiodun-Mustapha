import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Splitting the animation library out of the app bundle means a copy edit
    // does not invalidate 200kB of vendor code in every returning visitor's
    // cache. Repeat visits are part of what Core Web Vitals measures in the
    // field, which is the data Google actually ranks on.
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) only takes the function form here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion'
          }
          if (id.includes('react-router') || id.includes('/react-dom/') || id.includes('/react/')) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
})
