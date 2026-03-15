module.exports = {
  root: true,
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["lodash-specific-import"],
  rules: {
    "lodash-specific-import/no-global": "error",
  },
};
