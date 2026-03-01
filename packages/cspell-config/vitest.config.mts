import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/cspell-config',
  resolve: {
    conditions: ['@canideploy/configs-monorepo'],
  },
  test: {
    name: '@canideploy/cspell-config',
    watch: false,
    environment: 'node',
    include: ['test/*.test.ts'],
    reporters: ['default'],
    coverage: {
      include: ['config.json'],
      reportsDirectory: '../../coverage/packages/cspell-config',
      provider: 'v8',
    },
  },
});
