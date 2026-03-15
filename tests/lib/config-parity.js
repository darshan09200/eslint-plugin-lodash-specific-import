const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "../..");
const eslintBin = path.resolve(repoRoot, "node_modules/.bin/eslint");

function runEslint(args, stdin, extraEnv = {}) {
  let output = "";
  try {
    output = execFileSync(eslintBin, args, {
      cwd: repoRoot,
      env: { ...process.env, ...extraEnv },
      encoding: "utf8",
      input: stdin,
    });
  } catch (error) {
    output = error.stdout;
  }
  return JSON.parse(output);
}

function normalizeMessages(messages) {
  return messages.map((message) => ({
    ruleId: message.ruleId,
    severity: message.severity,
    message: message.message,
    line: message.line,
    column: message.column,
  }));
}

describe("legacy and flat config parity", () => {
  it("reports equivalent diagnostics for same invalid source", () => {
    const source = fs.readFileSync(
      path.resolve(repoRoot, "tests/fixtures/legacy/invalid.js"),
      "utf8"
    );

    const legacyTarget = "tests/fixtures/legacy/invalid.js";
    const flatTarget = "tests/fixtures/flat/invalid.js";

    const legacyResult = runEslint([
      "--no-eslintrc",
      "--config",
      "tests/fixtures/legacy/.eslintrc.cjs",
      "--stdin",
      "--stdin-filename",
      legacyTarget,
      "--format",
      "json",
    ], source);

    const flatResult = runEslint([
      "--config",
      "tests/fixtures/flat/eslint.config.cjs",
      "--stdin",
      "--stdin-filename",
      flatTarget,
      "--format",
      "json",
    ], source, { ESLINT_USE_FLAT_CONFIG: "true" });

    assert.strictEqual(legacyResult.length, 1);
    assert.strictEqual(flatResult.length, 1);

    const legacyMessages = normalizeMessages(legacyResult[0].messages);
    const flatMessages = normalizeMessages(flatResult[0].messages);

    assert.deepStrictEqual(flatMessages, legacyMessages);
  });
});
