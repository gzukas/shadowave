/// <reference types="vitest/config" />
import path from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    react({
      plugins: [['@lingui/swc-plugin', {}]]
    }),
    lingui({
      // Specify the config path as the Vitest VS Code extension uses a different CWD and may miss it otherwise.
      configPath: path.join(__dirname, 'lingui.config.ts')
    })
  ],
  test: {
    environment: 'happy-dom',
    globals: true
  },
  server: {
    port: 3000
  }
});
