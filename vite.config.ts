import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        ['@swc-jotai/debug-label', {}],
        ['@swc-jotai/react-refresh', {}],
        ['@lingui/swc-plugin', {}]
      ]
    }),
    lingui()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
