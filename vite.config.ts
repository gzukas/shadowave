/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {}]]
    }),
    lingui()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true
  }
});
