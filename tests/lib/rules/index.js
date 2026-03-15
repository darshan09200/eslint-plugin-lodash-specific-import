const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/no-global");
const eslintMajor = Number(require("eslint/package.json").version.split(".")[0]);

const ruleTester = new RuleTester(
  eslintMajor >= 9
    ? { languageOptions: { ecmaVersion: 2020, sourceType: "module" } }
    : { parserOptions: { ecmaVersion: 2020, sourceType: "module" } }
);

ruleTester.run("lodash-specific-import/no-global", rule, {
  valid: [
    "import map from 'lodash/map';",
    "import map from 'lodash-es/map';",
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
