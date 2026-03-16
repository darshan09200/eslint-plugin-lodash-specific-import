# Migrate to v2 (from v1)

This guide helps you migrate from `eslint-plugin-lodash-specific-import` v1 to v2.

## What changed

1. Node.js minimum version is now `>=22`.
2. ESLint support target is `^8 || ^9 || ^10`.
3. Flat config support is now first-class.
4. Plugin export shape is standardized to include:
   - `meta`
   - `rules`
   - `configs`
5. `lodash-specific-import/no-global` remains the rule key (no rename).

## Compatibility summary

1. ESLint 8/9:
   - Legacy `.eslintrc*` is supported.
   - Flat config is supported.
2. ESLint 10:
   - Use flat config only (`eslint.config.js` / `eslint.config.cjs`).

## Migration checklist

1. Upgrade runtime/tooling:
   - Node.js `>=22`
   - ESLint to 8, 9, or 10
2. Keep the same rule key:
   - `lodash-specific-import/no-global`
3. Choose one config style:
   - Legacy `.eslintrc*` for ESLint 8/9
   - Flat config for ESLint 8/9/10 (recommended)

## Config examples

### Legacy config (ESLint 8/9)

```json
{
  "extends": ["plugin:lodash-specific-import/recommended"]
}
```

### Flat config (recommended, ESLint 8/9/10)

```js
const lodashSpecificImport = require("eslint-plugin-lodash-specific-import");

module.exports = [
  ...lodashSpecificImport.configs["flat/recommended"],
];
```

### Manual flat config

```js
const lodashSpecificImport = require("eslint-plugin-lodash-specific-import");

module.exports = [
  {
    plugins: {
      "lodash-specific-import": lodashSpecificImport,
    },
    rules: {
      "lodash-specific-import/no-global": "error",
    },
  },
];
```

## Notes for alpha adopters

1. Prefer flat config for new setups.
2. Legacy `.eslintrc*` is kept for ESLint 8/9 only.
3. Rule-fixer hardening for alias/mixed-import edge cases is deferred to a follow-up PR.
