const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "../../..");
const eslintBin = path.join(
  path.dirname(require.resolve("eslint/package.json")),
  "bin",
  "eslint.js"
);

function runEslintJson(args, { stdin = "", env = {} } = {}) {
  let output = "";

  try {
    output = execFileSync(process.execPath, [eslintBin, ...args], {
      cwd: repoRoot,
      env: { ...process.env, ...env },
      encoding: "utf8",
      input: stdin,
    });
  } catch (error) {
    output = error.stdout;
  }

  return JSON.parse(output);
}

function toRepoPath(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, "/");
}

module.exports = {
  repoRoot,
  runEslintJson,
  toRepoPath,
};
