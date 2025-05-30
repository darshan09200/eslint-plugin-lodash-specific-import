
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

* Prevents full lodash imports (`import _ from 'lodash'`)
* Enforces specific function imports (`import debounce from 'lodash/debounce'`)
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

Add to your ESLint config (e.g., `.eslintrc.json`):

```json
{
  "plugins": ["lodash-specific-import"],
  "rules": {
    "lodash-specific-import/no-global": "error"
  }
}
```

---

## 🔍 Rule Example

**✅ Good:**

```js
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
```

**❌ Bad:**

```js
import _ from 'lodash';
const lodash = require('lodash');
```

---

## 📚 Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                 | Description                            | 🔧 |
| :----------------------------------- | :------------------------------------- | :- |
| [no-global](docs/rules/no-global.md) | enforce method-specific lodash imports | 🔧 |

<!-- end auto-generated rules list -->

---

## 📝 Motivation

Importing all of lodash can significantly bloat your JS bundle.
This plugin ensures you only import the functions you need, improving performance and clarity.

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
