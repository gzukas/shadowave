// @ts-check

import globals from 'globals';
import baseConfig from './base.mjs';

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
