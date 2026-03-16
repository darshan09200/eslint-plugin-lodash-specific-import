"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
    {
      files: ["tests/fixtures/**/*.js"],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    {
      files: ["tests/fixtures/**/*.cjs"],
      rules: {
        "node/no-missing-require": "off",
        "node/no-unpublished-require": "off",
      },
    },
  ],
};
