module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["lodash-specific-import"],
  rules: {
    "lodash-specific-import/no-global": "error",
  },
};
