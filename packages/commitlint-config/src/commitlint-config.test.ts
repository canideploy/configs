/* Cspell:disable */
import load from '@commitlint/load';
import lint from '@commitlint/lint';
import { describe, expect, it } from 'vitest';

import commitlintConfig from './commitlint-config.js';

import type { ParserOptions } from 'conventional-commits-parser';

const opts = await load(commitlintConfig);

function lintCommitMessage(commitMessage: string) {
  return lint(commitMessage, opts.rules, {
    defaultIgnores: opts.defaultIgnores,
    ignores: opts.ignores,
    parserOpts: opts.parserPreset?.parserOpts as ParserOptions | undefined,
    plugins: opts.plugins,
    helpUrl: opts.helpUrl,
  });
}

describe('commitlint-config', () => {
  describe('export', () => {
    it('should export a sharable commitlint configuration', () => {
      expect(commitlintConfig).toEqual(
        expect.objectContaining({
          extends: ['@commitlint/config-conventional'],
          plugins: expect.arrayContaining(['commitlint-plugin-cspell']),
          rules: expect.any(Object),
        }),
      );
    });
  });

  describe('rules', () => {
    describe('cspell/type', () => {
      it('should spellcheck commit message type', async () => {
        const commitMessage = 'faet(commitlint-config): correct spelling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'cspell/type',
                message: expect.stringContaining('faet'),
              }),
            ]),
          }),
        );
      });
    });

    describe('cspell/scope', () => {
      it('should spellcheck commit message scope', async () => {
        const commitMessage = 'feat(commmitlint-config): correct spelling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'cspell/scope',
                message: expect.stringContaining('commmitlint'),
              }),
            ]),
          }),
        );
      });
    });

    describe('cspell/subject', () => {
      it('should spellcheck commit message subject', async () => {
        const commitMessage = 'feat(commitlint-config): speling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'cspell/subject',
                message: expect.stringContaining('speling'),
              }),
            ]),
          }),
        );
      });
    });

    describe('cspell/body', () => {
      it('should spellcheck commit message body', async () => {
        const commitMessage = 'feat(commitlint-config): correct spelling\n\ntypo in body speling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'cspell/body',
                message: expect.stringContaining('speling'),
              }),
            ]),
          }),
        );
      });
    });

    describe('cspell/footer', () => {
      it('should spellcheck commit message footer', async () => {
        const commitMessage = 'feat(commitlint-config): correct spelling\n\n\nBREAKING CHANGE: typo in footer speling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'cspell/footer',
                message: expect.stringContaining('speling'),
              }),
            ]),
          }),
        );
      });
    });

    describe('header-max-length', () => {
      it('should limit header length to 100 characters', async () => {
        const commitMessage =
          'feat(commitlint-config): commit message that exceeds maximum header length' + 'a'.repeat(100);

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'header-max-length',
              }),
            ]),
          }),
        );
      });
    });

    describe('body-max-line-length', () => {
      it('should limit body lines to 250 characters', async () => {
        const commitMessage = 'feat(commitlint-config): correct spelling\n\n' + 'a'.repeat(251);

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'body-max-line-length',
              }),
            ]),
          }),
        );
      });
    });

    describe('scope-case', () => {
      it('should limit scope to lowercase', async () => {
        const commitMessage = 'feat(Commitlint-Config): correct spelling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'scope-case',
              }),
            ]),
          }),
        );
      });
    });

    describe('subject-case', () => {
      it('should not allow subject to be sentence-case', async () => {
        const commitMessage = 'feat(commitlint-config): Sentence case';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'subject-case',
              }),
            ]),
          }),
        );
      });

      it('should not allow subject to be start-case', async () => {
        const commitMessage = 'feat(commitlint-config): Start Case';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'subject-case',
              }),
            ]),
          }),
        );
      });

      it('should not allow subject to be pascal-case', async () => {
        const commitMessage = 'feat(commitlint-config): PascalCase';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'subject-case',
              }),
            ]),
          }),
        );
      });

      it('should not allow subject to be upper-case', async () => {
        const commitMessage = 'feat(commitlint-config): UPPER CASE';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'subject-case',
              }),
            ]),
          }),
        );
      });
    });

    describe('type-case', () => {
      it('should require the type to be lower-case', async () => {
        const commitMessage = 'Feat(commitlint-config): correct spelling';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'type-case',
              }),
            ]),
          }),
        );
      });
    });

    describe('type-empty', () => {
      it('should require a type', async () => {
        const commitMessage = '(commitlint-config): no type';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'type-empty',
              }),
            ]),
          }),
        );
      });
    });

    describe('type-enum', () => {
      it('should require a type from a predefined list', async () => {
        const commitMessage = 'bugfix(commitlint-config): invalid type';

        await expect(lintCommitMessage(commitMessage)).resolves.toEqual(
          expect.objectContaining({
            valid: false,
            errors: expect.arrayContaining([
              expect.objectContaining({
                name: 'type-enum',
              }),
            ]),
          }),
        );
      });
    });
  });
});
