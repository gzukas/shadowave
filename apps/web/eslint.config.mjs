// @ts-check

import reactConfig from '@workspace/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  ...reactConfig,
  {
    ignores: ['src/locales']
  }
];
