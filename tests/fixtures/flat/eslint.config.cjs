const tsParser = require("@typescript-eslint/parser");
const lodashSpecificImportPlugin = require("../../../lib/index");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "lodash-specific-import": lodashSpecificImportPlugin,
    },
    rules: {
      "lodash-specific-import/no-global": "error",
    },
  },
];
