const assert = require("assert");
const plugin = require("../../lib/index");

describe("plugin export shape", () => {
  it("exposes stable rule key", () => {
    assert(plugin.rules);
    assert.strictEqual(typeof plugin.rules["no-global"], "object");
  });

  it("includes plugin metadata", () => {
    assert(plugin.meta);
    assert.strictEqual(plugin.meta.name, "eslint-plugin-lodash-specific-import");
    assert.strictEqual(typeof plugin.meta.version, "string");
  });

  it("includes recommended configs for legacy and flat", () => {
    assert(plugin.configs);
    assert(plugin.configs.recommended);
    assert.deepStrictEqual(plugin.configs.recommended.rules, {
      "lodash-specific-import/no-global": "error",
    });

    assert(Array.isArray(plugin.configs["flat/recommended"]));
    assert.strictEqual(plugin.configs["flat/recommended"][0].plugins["lodash-specific-import"], plugin);
    assert.deepStrictEqual(plugin.configs["flat/recommended"][0].rules, {
      "lodash-specific-import/no-global": "error",
    });
  });
});
