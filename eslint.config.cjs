const eslintPluginPlugin = require("eslint-plugin-eslint-plugin");

module.exports = [
  {
    ignores: ["node_modules/**", "tests/fixtures/**", ".npm-cache/**"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
    },
    plugins: {
      "eslint-plugin": eslintPluginPlugin,
    },
    rules: {
      ...eslintPluginPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
      },
    },
  },
  {
    files: ["tests/fixtures/**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
