import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/package.json'],
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.mjs', '{projectRoot}/vitest.config.mts'],
          ignoredDependencies: ['prettier-plugin-packagejson'],
        },
      ],
    },
  },
  {
    ignores: ['**/out-tsc'],
  },
];
