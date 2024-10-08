/// <reference types="vitest" />
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { crx } from '@crxjs/vite-plugin'
import manifestConfig from './manifest.config'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    crx({ manifest: manifestConfig({ MODE: mode }) })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  },
  server: {
    port: 3000
  }
}))
