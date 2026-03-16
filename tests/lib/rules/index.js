const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/no-global");
const eslintMajor = Number(require("eslint/package.json").version.split(".")[0]);
let typescriptParser;
let typescriptParserPath;

try {
  typescriptParser = require("@typescript-eslint/parser");
  typescriptParserPath = require.resolve("@typescript-eslint/parser");
} catch {
  typescriptParser = null;
  typescriptParserPath = null;
}
const canRunImportKindCases = Boolean(typescriptParser) && eslintMajor < 10;

const ruleTester = new RuleTester(
  eslintMajor >= 9
    ? { languageOptions: { ecmaVersion: 2022, sourceType: "module" } }
    : { parserOptions: { ecmaVersion: 2022, sourceType: "module" } }
);

const parserSpecificValidCases = canRunImportKindCases
  ? [
      eslintMajor >= 9
        ? {
            code: "import type { debounce } from 'lodash';",
            languageOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
              parser: typescriptParser,
            },
          }
        : {
            code: "import type { debounce } from 'lodash';",
            parser: typescriptParserPath,
            parserOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
            },
          },
      eslintMajor >= 9
        ? {
            code: "import { type debounce } from 'lodash';",
            languageOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
              parser: typescriptParser,
            },
          }
        : {
            code: "import { type debounce } from 'lodash';",
            parser: typescriptParserPath,
            parserOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
            },
          },
    ]
  : [];

const parserSpecificInvalidCases = canRunImportKindCases
  ? [
      eslintMajor >= 9
        ? {
            code: "import type _ from 'lodash';",
            languageOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
              parser: typescriptParser,
            },
            errors: [{ messageId: "invalidDefaultImport" }],
            output: null,
          }
        : {
            code: "import type _ from 'lodash';",
            parser: typescriptParserPath,
            parserOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
            },
            errors: [{ messageId: "invalidDefaultImport" }],
            output: null,
          },
      eslintMajor >= 9
        ? {
            code: "import { debounce, type isEqual } from 'lodash';",
            languageOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
              parser: typescriptParser,
            },
            errors: [{ messageId: "invalidImport" }],
            output: "import debounce from 'lodash/debounce';",
          }
        : {
            code: "import { debounce, type isEqual } from 'lodash';",
            parser: typescriptParserPath,
            parserOptions: {
              ecmaVersion: 2022,
              sourceType: "module",
            },
            errors: [{ messageId: "invalidImport" }],
            output: "import debounce from 'lodash/debounce';",
          },
    ]
  : [];

ruleTester.run("lodash-specific-import/no-global", rule, {
  valid: [
    "import map from 'lodash/map';",
    "import map from 'lodash-es/map';",
    ...parserSpecificValidCases,
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
    ...parserSpecificInvalidCases,
  ],
});
