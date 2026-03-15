"use strict";

const requireIndex = require("requireindex");
const packageJson = require("../package.json");

const plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: requireIndex(__dirname + "/rules"),
  configs: {},
};

Object.assign(plugin.configs, {
  recommended: {
    plugins: ["lodash-specific-import"],
    rules: {
      "lodash-specific-import/no-global": "error",
    },
  },
  "flat/recommended": [
    {
      plugins: {
        "lodash-specific-import": plugin,
      },
      rules: {
        "lodash-specific-import/no-global": "error",
      },
    },
  ],
});

module.exports = plugin;

