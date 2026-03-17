
# eslint-plugin-lodash-specific-import

[![npm version](https://img.shields.io/npm/v/eslint-plugin-lodash-specific-import.svg)](https://www.npmjs.com/package/eslint-plugin-lodash-specific-import)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-lodash-specific-import.svg)](https://www.npmjs.com/package/eslint-plugin-lodash-specific-import)
[![License: MIT](https://img.shields.io/github/license/darshan09200/eslint-plugin-lodash-specific-import?color=green)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/darshan09200/eslint-plugin-lodash-specific-import/pulls)
[![Docs](https://img.shields.io/badge/docs-auto--generated-blue)](#rules)

A lightweight ESLint plugin to enforce specific lodash imports.
**Keep your bundles smaller and your imports cleaner!**

---

## ✨ Features

* Prevents full lodash imports (`import _ from 'lodash'` or `import _ from 'lodash-es'`)
* Enforces specific function imports (`import debounce from 'lodash/debounce'` or `import debounce from 'lodash-es/debounce'`)
* Simple drop-in ESLint rule
* **Auto-generated documentation** using [eslint-doc-generator](https://github.com/eslint/eslint-doc-generator)

---

## 📦 Installation

```bash
npm install --save-dev eslint-plugin-lodash-specific-import
# or
yarn add --dev eslint-plugin-lodash-specific-import
```

---

## 🚀 Usage

### Legacy Config (`.eslintrc*`, ESLint 8/9 only)

```json
{
  "extends": ["plugin:lodash-specific-import/recommended"]
}
```

### Flat Config (`eslint.config.*`, ESLint 8/9/10)

#### Recommended

```js
const lodashSpecificImport = require("eslint-plugin-lodash-specific-import");

module.exports = [
  ...lodashSpecificImport.configs["flat/recommended"],
];
```

#### Manual

```js
const lodashSpecificImportPlugin = require("eslint-plugin-lodash-specific-import");

module.exports = [
  {
    plugins: {
      "lodash-specific-import": lodashSpecificImportPlugin,
    },
    rules: {
      "lodash-specific-import/no-global": "error",
    },
  },
];
```

### Compatibility

* Node.js: `>=22`
* ESLint: `^8 || ^9 || ^10`
* Config styles:
  * ESLint 8/9: legacy `.eslintrc*` and flat `eslint.config.*`
  * ESLint 10: flat `eslint.config.*` only
* Module support: CommonJS + ESM entrypoints

---

## 🔍 Rule Example

**✅ Good:**

```js
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash-es/debounce';
import isEmpty from 'lodash-es/isEmpty';
```

**❌ Bad:**

```js
import _ from 'lodash';
import _ from 'lodash-es';
const lodash = require('lodash');
const lodashEs = require('lodash-es');
```

---

## 📚 Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                 | Description                            | 💼 | 🔧 |
| :----------------------------------- | :------------------------------------- | :- | :- |
| [no-global](docs/rules/no-global.md) | enforce method-specific lodash imports | ✅  | 🔧 |

<!-- end auto-generated rules list -->

---

## 📝 Motivation

Importing all of lodash can significantly bloat your JS bundle.
This plugin ensures you only import the functions you need, improving performance and clarity.

---

## 🔄 Migration

Moving from v1 to v2?

* Prefer flat config for new projects.
* Legacy `.eslintrc*` remains available for ESLint 8/9.
* ESLint 10 requires flat config.
* Rule-fixer hardening for alias/mixed-import edge cases is deferred to a follow-up PR.
* Full guide: [Migrate to v2](docs/migration/migrate-to-v2.md)

---

## 🙌 Contributing

Contributions, issues, and PRs are welcome!
Feel free to [open an issue](https://github.com/darshan09200/eslint-plugin-lodash-specific-import/issues) or [submit a PR](https://github.com/darshan09200/eslint-plugin-lodash-specific-import/pulls).

---

## 📄 License

MIT

---

## 💡 Author

[Darshan Jain](https://github.com/darshan09200)

---
