/// <reference types="vitest/config" />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {}]]
    }),
    lingui({
      // Specify the config path as the Vitest VS Code extension uses a different CWD and may miss it otherwise.
      configPath: path.join(__dirname, 'lingui.config.ts')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true
  },
  server: {
    port: 3000
  }
});
