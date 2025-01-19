import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import configPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020
      }
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,
  {
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { caughtErrorsIgnorePattern: '^_' }
      ]
    }
  },
  {
    ignores: ['dist', 'eslint.config.js']
  }
);
