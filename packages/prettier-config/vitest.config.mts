import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: __dirname,
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
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
