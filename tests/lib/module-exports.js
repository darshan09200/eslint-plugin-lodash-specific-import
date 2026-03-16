const assert = require("assert");

const cjsPlugin = require("../../lib/index.js");
const importEsm = new Function("path", "return import(path);");

describe("module export parity", () => {
  it("loads plugin via cjs require", () => {
    assert(cjsPlugin);
    assert(cjsPlugin.rules);
    assert.strictEqual(typeof cjsPlugin.rules["no-global"], "object");
  });

  it("loads plugin via esm import", async () => {
    const esmModule = await importEsm("../../lib/index.mjs");
    assert(esmModule.default);
    assert(esmModule.default.rules);
    assert.strictEqual(typeof esmModule.default.rules["no-global"], "object");
  });

  it("exposes equivalent top-level keys in cjs and esm", async () => {
    const esmModule = await importEsm("../../lib/index.mjs");
    const cjsKeys = Object.keys(cjsPlugin).sort();
    const esmKeys = Object.keys(esmModule.default).sort();

    assert.deepStrictEqual(esmKeys, cjsKeys);
  });

  it("exposes named esm exports and preserves default parity", async () => {
    const esmModule = await importEsm("../../lib/index.mjs");

    assert.notStrictEqual(esmModule.meta, undefined);
    assert.notStrictEqual(esmModule.meta, null);
    assert.notStrictEqual(esmModule.rules, undefined);
    assert.notStrictEqual(esmModule.rules, null);
    assert.notStrictEqual(esmModule.configs, undefined);
    assert.notStrictEqual(esmModule.configs, null);
    assert.strictEqual(esmModule.default, cjsPlugin);
  });
});
