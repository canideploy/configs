import type { UserConfig } from '@commitlint/types';

const config = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-cspell'],
  rules: {
    'cspell/type': [2, 'always'],
    'cspell/scope': [2, 'always'],
    'cspell/subject': [2, 'always'],
    'cspell/body': [2, 'always'],
    'cspell/footer': [2, 'always'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 250],
    'scope-case': [2, 'always', ['lower-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
        'ci', // Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],
  },
} as const satisfies UserConfig;

export default config;
