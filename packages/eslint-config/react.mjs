// @ts-check

import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from './base.mjs';

/** @type {import('typescript-eslint').ConfigArray} */
export default [
  ...baseConfig,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022
      }
    }
  }
];
