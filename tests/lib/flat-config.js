const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function runFlatEslint(args, stdin) {
  const eslintBin = path.resolve(__dirname, "../../node_modules/.bin/eslint");
  let output = "";
  try {
    output = execFileSync(eslintBin, args, {
      cwd: path.resolve(__dirname, "../.."),
      env: { ...process.env, ESLINT_USE_FLAT_CONFIG: "true" },
      encoding: "utf8",
      input: stdin,
    });
  } catch (error) {
    output = error.stdout;
  }
  return JSON.parse(output);
}

describe("flat config integration", () => {
  it("enforces no-global through eslint.config", () => {
    const sourcePath = "tests/fixtures/flat/invalid.js";
    const target = "tests/fixtures/flat/invalid.js";
    const source = fs.readFileSync(path.resolve(__dirname, "../..", sourcePath), "utf8");
    const result = runFlatEslint([
      "--config",
      "tests/fixtures/flat/eslint.config.cjs",
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
