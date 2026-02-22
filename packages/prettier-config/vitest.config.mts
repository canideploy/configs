import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/prettier-config',
  resolve: {
    conditions: ['@canideploy/configs-monorepo'],
  },
  test: {
    name: '@canideploy/prettier-config',
    watch: false,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    reporters: ['default'],
    coverage: {
      include: ['src/**/*.ts'],
      reportsDirectory: '../../coverage/packages/prettier-config',
      provider: 'v8',
    },
  },
});
