# @canideploy/secretlint-config

This package provides shared secretlint configuration.

## Installation

Install the package as a development dependency at the root of your workspace

```bash
pnpm add @canideploy/secretlint-config secretlint -D
```

## Usage

Create a `.secretlintrc.cjs` file at the root of your workspace with the following content:

```js
const config = require('@canideploy/secretlint-config');

module.exports = {
  ...config.default,
};
```

Add a script to your `package.json` to run secretlint

```json
{
  "scripts": {
    "secretlint": "secretlint . --maskSecrets"
  }
}
```

Update your `lint-staged.config.mjs` file to run secretlint

```js
export default {
  '*': (files) => [`secretlint ${files.join(' ')}`],
};
```
