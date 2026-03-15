const assert = require("assert");
const fs = require("fs");
const path = require("path");
const eslintMajor = Number(require("eslint/package.json").version.split(".")[0]);
const disableLookupFlag = "--no-eslintrc";
const supportsLegacyEslintrc = eslintMajor < 10;
const { repoRoot, runEslintJson, toRepoPath } = require("./helpers/eslint-runner");

describe("legacy eslintrc integration", () => {
  it("enforces no-global through .eslintrc config", function runLegacyConfigTest() {
    if (!supportsLegacyEslintrc) {
      this.skip();
    }
    const sourcePath = "tests/fixtures/legacy/invalid.js";
    const target = "tests/fixtures/legacy/invalid.js";
    const source = fs.readFileSync(path.resolve(repoRoot, sourcePath), "utf8");
    const result = runEslintJson([
      disableLookupFlag,
      "--config",
      "tests/fixtures/legacy/.eslintrc.cjs",
      "--stdin",
      "--stdin-filename",
      target,
      "--format",
      "json",
    ], { stdin: source, env: { ESLINT_USE_FLAT_CONFIG: "false" } });

    assert.strictEqual(result.length, 1);
    const reportedPath = toRepoPath(result[0].filePath);
    assert.strictEqual(reportedPath, target);
    assert.strictEqual(result[0].messages.length, 1);
    assert.strictEqual(
      result[0].messages[0].ruleId,
      "lodash-specific-import/no-global"
    );
  });
});
