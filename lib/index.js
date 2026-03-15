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

module.exports = plugin;


