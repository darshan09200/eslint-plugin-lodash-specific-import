const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { repoRoot, runEslintJson, toRepoPath } = require("./helpers/eslint-runner");

describe("flat config integration", () => {
  it("enforces no-global through eslint.config", () => {
    const sourcePath = "tests/fixtures/flat/invalid.js";
    const target = "tests/fixtures/flat/invalid.js";
    const source = fs.readFileSync(path.resolve(repoRoot, sourcePath), "utf8");
    const result = runEslintJson([
      "--config",
      "tests/fixtures/flat/eslint.config.cjs",
      "--stdin",
      "--stdin-filename",
      target,
      "--format",
      "json",
    ], { stdin: source, env: { ESLINT_USE_FLAT_CONFIG: "true" } });

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
