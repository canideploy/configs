import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/secretlint-config',
  resolve: {
    conditions: ['@canideploy/configs-monorepo'],
  },
  test: {
    name: '@canideploy/secretlint-config',
    watch: false,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    reporters: ['default'],
    coverage: {
      include: ['src/**/*'],
      reportsDirectory: '../../coverage/packages/secretlint-config',
      provider: 'v8',
    },
  },
});
