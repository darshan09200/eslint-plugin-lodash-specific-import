const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const eslintMajor = Number(require("eslint/package.json").version.split(".")[0]);
const disableLookupFlag = eslintMajor >= 9 ? "--no-config-lookup" : "--no-eslintrc";
const supportsLegacyEslintrc = eslintMajor < 10;

function runEslint(args, stdin, env = {}) {
  const eslintBin = path.resolve(__dirname, "../../node_modules/.bin/eslint");
  let output = "";
  try {
    output = execFileSync(eslintBin, args, {
      cwd: path.resolve(__dirname, "../.."),
      env: { ...process.env, ...env },
      encoding: "utf8",
      input: stdin,
    });
  } catch (error) {
    output = error.stdout;
  }
  return JSON.parse(output);
}

describe("legacy eslintrc integration", () => {
  it("enforces no-global through .eslintrc config", function runLegacyConfigTest() {
    if (!supportsLegacyEslintrc) {
      this.skip();
    }
    const sourcePath = "tests/fixtures/legacy/invalid.js";
    const target = "tests/fixtures/legacy/invalid.js";
    const source = fs.readFileSync(path.resolve(__dirname, "../..", sourcePath), "utf8");
    const result = runEslint([
      disableLookupFlag,
      "--config",
      "tests/fixtures/legacy/.eslintrc.cjs",
      "--stdin",
      "--stdin-filename",
      target,
      "--format",
      "json",
    ], source);

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].filePath.endsWith(target), true);
    assert.strictEqual(result[0].messages.length, 1);
    assert.strictEqual(
      result[0].messages[0].ruleId,
      "lodash-specific-import/no-global"
    );
  });
});
