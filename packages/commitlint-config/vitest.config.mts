import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/commitlint-config',
  resolve: {
    conditions: ['@canideploy/configs-monorepo'],
  },
  test: {
    name: '@canideploy/commitlint-config',
    watch: false,
    environment: 'node',
    include: ['src/*.test.ts'],
    reporters: ['default'],
    coverage: {
      include: ['src/**/*.ts'],
      reportsDirectory: '../../coverage/packages/commitlint-config',
      provider: 'v8',
    },
  },
});
