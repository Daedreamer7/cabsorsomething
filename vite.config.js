import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: '/index.html',
        admin: '/admin-dashboard.html',
        designer: '/designer-dashboard.html',
        sales: '/sales-dashboard.html',
        messages: '/messages.html',
        calendar: '/calendar.html',
        trendy: '/trendy.html'
      }
    }
  }
})
