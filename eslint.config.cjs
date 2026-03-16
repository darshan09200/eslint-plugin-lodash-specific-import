const js = require("@eslint/js");
const eslintPluginPlugin = require("eslint-plugin-eslint-plugin");

module.exports = [
  js.configs.recommended,
  {
    ignores: ["node_modules/**", "tests/fixtures/**", ".npm-cache/**"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
      },
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
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
