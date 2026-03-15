const lodashSpecificImportPlugin = require("../../../lib/index");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
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
