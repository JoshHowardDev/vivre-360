import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'client',
  build: { outDir: '../dist' },
  server: {
    port: 1209,
    proxy: {
      '/api': 'http://localhost:3000/',
      '/auth': 'http://localhost:3000/',
      '/static': 'http://localhost:3000/',
    },
  },
});
