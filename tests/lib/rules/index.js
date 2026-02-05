const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/no-global");

const ruleTester = new RuleTester({
  // eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

ruleTester.run("lodash-specific-import/no-global", rule, {
  valid: [
    "import map from 'lodash/map';",
    "import type { Map } from 'lodash';",
    "import map from 'lodash-es/map';",
    "import type { Map } from 'lodash-es';",
  ],

  invalid: [
    {
      code: "import { map } from 'lodash';",
      errors: [{ messageId: "invalidImport" }],
      output: "import map from 'lodash/map';",
    },
    {
      code: "import {isEmpty, map} from 'lodash';",
      errors: [{ messageId: "invalidImport" }],
      output:
        "import isEmpty from 'lodash/isEmpty';\nimport map from 'lodash/map';",
    },
    {
      code: "import _ from 'lodash';",
      errors: [{ messageId: "invalidDefaultImport" }],
      output: null,
    },
    {
      code: "const _ = require('lodash');",
      errors: [{ messageId: "invalidDefaultImport" }],
      output: null,
    },
    {
      code: "const { map } = require('lodash');",
      errors: [{ messageId: "invalidImport" }],
      output: null,
    },
    {
      code: "import { map } from 'lodash-es';",
      errors: [{ messageId: "invalidImport" }],
      output: "import map from 'lodash-es/map';",
    },
    {
      code: "import {isEmpty, map} from 'lodash-es';",
      errors: [{ messageId: "invalidImport" }],
      output:
        "import isEmpty from 'lodash-es/isEmpty';\nimport map from 'lodash-es/map';",
    },
    {
      code: "import _ from 'lodash-es';",
      errors: [{ messageId: "invalidDefaultImport" }],
      output: null,
    },
    {
      code: "const _ = require('lodash-es');",
      errors: [{ messageId: "invalidDefaultImport" }],
      output: null,
    },
    {
      code: "const { map } = require('lodash-es');",
      errors: [{ messageId: "invalidImport" }],
      output: null,
    },
  ],
});
