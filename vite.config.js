import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    laravel({
      valetTls: 'customer-management.test',
      input: ['resources/src/index.tsx']
    }),
    react(),
    tsconfigPaths()
  ]
})
