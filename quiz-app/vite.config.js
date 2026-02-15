import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'src/projects-main.jsx'),
      },
      output: {
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === 'projects' ? 'projects.js' : 'quiz.js',
        assetFileNames: 'quiz.[ext]',
        chunkFileNames: 'quiz.[name]-[hash].js',
      },
    },
  },
})
